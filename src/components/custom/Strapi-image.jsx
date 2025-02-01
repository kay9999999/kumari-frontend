import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
  priority = false,
  fill = false,
  layout,
}) {
  if (!src) return null;
  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/${width}x${height}`;

  return (
    <Image
      src={imageUrl ?? imageFallback}
      alt={alt}
      height={height}
      width={width}
      className={className}
      priority={priority}
      fill={fill}
      layout={layout}
    />
  );
}
