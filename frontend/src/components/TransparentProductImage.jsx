import { getBackendBaseUrl } from '../utils/config';

const TransparentProductImage = ({ src, alt, className, style, ...props }) => {
  // Prepend backend base URL if it's a relative media URL from Django
  const getAbsoluteUrl = (url) => {
    if (url && url.startsWith('/media/')) {
      return `${getBackendBaseUrl()}${url}`;
    }
    return url;
  };

  const absoluteSrc = getAbsoluteUrl(src);

  return (
    <img 
      src={absoluteSrc} 
      alt={alt} 
      className={className} 
      style={style}
      {...props} 
    />
  );
};

export default TransparentProductImage;
