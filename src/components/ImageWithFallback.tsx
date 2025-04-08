import { useState } from 'react';
import { Image, ImageProps } from '@chakra-ui/react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'fallbackSrc'> {
  src: string;
  fallbackSrc: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default ImageWithFallback;
