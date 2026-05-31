import { useState, useEffect } from 'react';
import { getBackendBaseUrl } from '../utils/config';

const isUploadedImage = (url) => {
  if (!url) return false;
  return url.includes('/media/') || url.startsWith('data:') || url.startsWith('blob:') || url.includes(':8000') || url.includes('onrender.com');
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
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
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

        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Target saturated grass green while protecting jersey colors
          const maxRB = Math.max(r, b);
          const diff = g - maxRB;
          
          if (g > 35 && diff > 5 && g > r * 1.10 && g > b * 1.10) {
            // Saturated grass region -> make transparent with edge feathering
            if (diff > 12 && g > r * 1.20) {
              data[i + 3] = 0; // solid background -> transparent
            } else {
              // Edge pixels -> feather transparency to create soft margins
              const factor = (diff - 5) / 7;
              data[i + 3] = Math.max(0, Math.floor(data[i + 3] * (1 - Math.min(1, factor))));
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const processedDataUrl = canvas.toDataURL('image/png');
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
