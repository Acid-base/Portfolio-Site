import { Image, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ImageWithFallback = ({ src, alt, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };
  }, [src]);

  if (isLoading) {
    return <Skeleton height={props.height || "200px"} width="100%" />;
  }

  if (error) {
    return (
      <Image
        src="https://via.placeholder.com/400x250?text=Image+Not+Found"
        alt={alt}
        fallbackSrc="https://via.placeholder.com/400x250?text=Image+Not+Found"
        {...props}
      />
    );
  }

  return <Image src={src} alt={alt} loading="lazy" {...props} />;
};

export default ImageWithFallback;
