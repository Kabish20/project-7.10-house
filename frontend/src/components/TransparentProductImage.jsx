import { useState, useEffect } from 'react';
import { getBackendBaseUrl } from '../utils/config';

// Elegant SVG jersey outline placeholder
const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M20.38 3.46 16 1.7a2 2 0 0 0-1.42 0l-4.58 1.76a2 2 0 0 1-1.42 0L4 1.7a2 2 0 0 0-1.42 0l-1.2 1.76a1.5 1.5 0 0 0 .1 1.94L4 7.2v11.8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7.2l2.52-1.8a1.5 1.5 0 0 0 .1-1.94z'/></svg>";

const TransparentProductImage = ({ src, alt, className, style, ...props }) => {
  // Prepend backend base URL if it's a relative media URL from Django
  const getAbsoluteUrl = (url) => {
    if (!url) return PLACEHOLDER_IMAGE;
    if (url.startsWith('/media/')) {
      return `${getBackendBaseUrl()}${url}`;
    }
    return url;
  };

  const absoluteSrc = getAbsoluteUrl(src);
  const [imgSrc, setImgSrc] = useState(absoluteSrc);

  // Keep state in sync when src prop updates dynamically (e.g. carousel slide change)
  useEffect(() => {
    setImgSrc(absoluteSrc);
  }, [absoluteSrc]);

  const handleError = () => {
    if (imgSrc !== PLACEHOLDER_IMAGE) {
      setImgSrc(PLACEHOLDER_IMAGE);
    }
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className} 
      style={style}
      onError={handleError}
      {...props} 
    />
  );
};

export default TransparentProductImage;
