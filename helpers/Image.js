// helpers/Image.js
import NextImage from 'next/image';

const FALLBACK_SRC = '/image-coming-soon.png'; // make sure this exists in /public
const CLOUDINARY_HOST = 'res.cloudinary.com';

// Add Cloudinary transformations: f_auto,q_auto and optional width
function optimiseCloudinary(url, width) {
  if (!url || typeof url !== 'string') return url;

  // Only touch Cloudinary URLs that have the /upload/ segment
  if (!url.includes(CLOUDINARY_HOST) || !url.includes('/upload/')) {
    return url;
  }

  // If there's already a transformation segment with f_auto or q_auto, leave it
  const uploadIndex = url.indexOf('/upload/');
  const afterUpload = url.slice(uploadIndex + '/upload/'.length);
  const hasTransformSegment = afterUpload[0] !== '/'; // something between upload/ and next /

  if (hasTransformSegment && (url.includes('f_auto') || url.includes('q_auto'))) {
    return url;
  }

  const [before, after] = url.split('/upload/');

  const transforms = ['f_auto', 'q_auto'];

  if (typeof width === 'number' && width > 0) {
    transforms.push(`w_${Math.round(width)}`);
  }

  return `${before}/upload/${transforms.join(',')}/${after}`;
}

export default function ImageWithFallback(props) {
  const { src, alt, ...rest } = props;

  const rawSrc =
    typeof src === 'string' && src.trim().length > 0
      ? src
      : FALLBACK_SRC;

  const safeAlt = alt || 'Image';

  // Use the width passed into the component (if any) to hint Cloudinary resize
  const widthFromProps =
    typeof rest.width === 'number' ? rest.width : undefined;

  const optimisedSrc = optimiseCloudinary(rawSrc, widthFromProps);

  return <NextImage src={optimisedSrc} alt={safeAlt} {...rest} />;
}