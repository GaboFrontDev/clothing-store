import CONFIG from "@/config";
import { StrapiMediaEntity } from "@/contexts/shared/domain/StrapiMediaEntity";
import Image from "next/image";

interface PhotoVisualizeProps {
  data: StrapiMediaEntity;
  size: "small" | "medium" | "large" | "thumbnail";
}

export function PhotoVisualize(props: PhotoVisualizeProps) {
  const { data, size } = props;
  const imageData = data.attributes.formats[size] || data.attributes.formats['small'];
  return (
    <Image
      src={`${CONFIG.STRAPI_URL_PAGE}${imageData.url}`}
      alt={data.attributes.caption}
      width={imageData.width}
      height={imageData.height}
    />
  );
}
