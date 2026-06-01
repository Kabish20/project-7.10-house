import { useState, useEffect } from 'react';
import { getBackendBaseUrl } from '../utils/config';

const isUploadedImage = (url) => {
  if (!url) return false;
  return (
    url.includes('/media/') || 
    url.startsWith('data:') || 
    url.startsWith('blob:') || 
    url.includes(':8000') || 
    url.includes('onrender.com') ||
    url.startsWith('http')
  );
};

// Global memory cache to prevent redundant heavy pixel-loop chroma key processing
const chromaKeyCache = new Map();

const TransparentProductImage = ({ src, alt, className, style, ...props }) => {
  // Prepend backend base URL if it's a relative media URL from Django
  const getAbsoluteUrl = (url) => {
    if (url && url.startsWith('/media/')) {
      return `${getBackendBaseUrl()}${url}`;
    }
    return url;
  };

  const absoluteSrc = getAbsoluteUrl(src);

  const [prevSrc, setPrevSrc] = useState(absoluteSrc);
  const [processedSrc, setProcessedSrc] = useState(() => {
    return chromaKeyCache.get(absoluteSrc) || absoluteSrc;
  });

  // Sync state during render to avoid synchronous useEffect setState calls
  if (absoluteSrc !== prevSrc) {
    setPrevSrc(absoluteSrc);
    setProcessedSrc(chromaKeyCache.get(absoluteSrc) || absoluteSrc);
  }

  useEffect(() => {
    if (!absoluteSrc || !isUploadedImage(absoluteSrc)) {
      return;
    }

    // Skip canvas processing entirely if we have a cache hit
    if (chromaKeyCache.has(absoluteSrc)) {
      setProcessedSrc(chromaKeyCache.get(absoluteSrc));
      return;
    }

    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = absoluteSrc;
    
    img.onload = () => {
      if (!active) return;
      try {
        // Downscale slightly if the image is extremely large to optimize performance
        const maxDim = 800;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }

        // 1. Create temporary canvas for transparent cutout
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = w;
        tempCanvas.height = h;
        tempCtx.drawImage(img, 0, 0, w, h);

        const imgData = tempCtx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // BFS background removal & edge feathering
        const visited = new Uint8Array(w * h);
        const queue = [];

        // Sample corner and border colors to dynamically detect the background color
        const cornerCoords = [
          [0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1],
          [Math.floor(w / 2), 0], [Math.floor(w / 2), h - 1],
          [0, Math.floor(h / 2)], [w - 1, Math.floor(h / 2)]
        ];
        const corners = [];
        for (const [cx, cy] of cornerCoords) {
          if (cx >= 0 && cx < w && cy >= 0 && cy < h) {
            const idx = (cy * w + cx) * 4;
            if (data[idx + 3] > 50) { // Only sample non-transparent pixels
              corners.push([data[idx], data[idx + 1], data[idx + 2]]);
            }
          }
        }

        // Helper to evaluate if a border-connected pixel matches a background pattern
        const getBackgroundMatch = (r, g, b) => {
          // 1. Match against sampled corners/borders (Euclidean distance in RGB space)
          let bestCornerDist = Infinity;
          for (const [cr, cg, cb] of corners) {
            const dist = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2);
            if (dist < bestCornerDist) {
              bestCornerDist = dist;
            }
          }

          if (bestCornerDist < 30) {
            return { match: true, strength: 1.0 };
          } else if (bestCornerDist < 55) {
            // Feathering boundary
            const strength = 1.0 - (bestCornerDist - 30) / 25;
            return { match: true, strength };
          }

          // 2. Generic high-luminance white/light background detection
          if (r > 225 && g > 225 && b > 225) {
            return { match: true, strength: 1.0 };
          } else if (r > 195 && g > 195 && b > 195) {
            const mean = (r + g + b) / 3;
            const dev = Math.sqrt(((r - mean)**2 + (g - mean)**2 + (b - mean)**2) / 3);
            if (dev < 15) { // Close to neutral gray/white
              const strength = 1.0 - (225 - mean) / 30;
              return { match: true, strength: Math.max(0.2, strength) };
            }
          }

          // 3. Saturated field green grass keyer
          const maxRB = Math.max(r, b);
          const diff = g - maxRB;
          if (g > 35 && diff > 5 && g > r * 1.10 && g > b * 1.10) {
            if (diff > 12 && g > r * 1.20) {
              return { match: true, strength: 1.0 };
            } else {
              const strength = (diff - 5) / 7;
              return { match: true, strength: Math.min(1.0, strength) };
            }
          }

          return { match: false, strength: 0.0 };
        };

        // Queue all border pixels for BFS flood-fill
        for (let x = 0; x < w; x++) {
          queue.push([x, 0]);
          queue.push([x, h - 1]);
          visited[0 * w + x] = 1;
          visited[(h - 1) * w + x] = 1;
        }
        for (let y = 1; y < h - 1; y++) {
          queue.push([0, y]);
          queue.push([w - 1, y]);
          visited[y * w + 0] = 1;
          visited[y * w + (w - 1)] = 1;
        }

        let head = 0;
        while (head < queue.length) {
          const [cx, cy] = queue[head++];
          const idx = (cy * w + cx) * 4;

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          if (a === 0) continue;

          const { match, strength } = getBackgroundMatch(r, g, b);

          if (match) {
            data[idx + 3] = Math.max(0, Math.floor(a * (1 - strength)));

            // Expand flood fill to 4-way neighbors only for strong background matches
            if (strength > 0.6) {
              const neighbors = [
                [cx + 1, cy],
                [cx - 1, cy],
                [cx, cy + 1],
                [cx, cy - 1]
              ];

              for (const [nx, ny] of neighbors) {
                if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                  const nIdx = ny * w + nx;
                  if (!visited[nIdx]) {
                    visited[nIdx] = 1;
                    queue.push([nx, ny]);
                  }
                }
              }
            }
          }
        }

        tempCtx.putImageData(imgData, 0, 0);

        // 2. Create main canvas for final image with premium stylized green background
        const mainCanvas = document.createElement('canvas');
        const mainCtx = mainCanvas.getContext('2d');
        mainCanvas.width = w;
        mainCanvas.height = h;

        // Draw a premium radial gradient representing stadium spotlights
        const gradient = mainCtx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.1, w / 2, h / 2, Math.max(w, h) * 0.8);
        gradient.addColorStop(0, '#0a4d25'); // Spotlight center: Vibrant emerald green
        gradient.addColorStop(0.5, '#042813'); // Mid range: Deep forest green
        gradient.addColorStop(1, '#021208'); // Outer edge: Ultra-dark black-green
        mainCtx.fillStyle = gradient;
        mainCtx.fillRect(0, 0, w, h);

        // Draw the transparent cutout jersey on top of our premium green background
        mainCtx.drawImage(tempCanvas, 0, 0);

        const processedDataUrl = mainCanvas.toDataURL('image/jpeg', 0.92);
        chromaKeyCache.set(absoluteSrc, processedDataUrl);
        setProcessedSrc(processedDataUrl);
      } catch (err) {
        console.error("Chroma key processing failed:", err);
        setProcessedSrc(absoluteSrc); // fallback to original absolute URL
      }
    };

    img.onerror = () => {
      if (!active) return;
      setProcessedSrc(absoluteSrc); // fallback to original absolute URL
    };

    return () => {
      active = false;
    };
  }, [absoluteSrc]);

  return (
    <img 
      src={processedSrc} 
      alt={alt} 
      className={className} 
      style={style}
      {...props} 
    />
  );
};

export default TransparentProductImage;
