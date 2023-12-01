import CONFIG from "@/config";
import { StrapiMediaEntity } from "@/contexts/shared/domain/StrapiMediaEntity";
import Image from "next/image";

interface PhotoVisualizeProps {
  data: StrapiMediaEntity;
  size: "small" | "medium" | "large" | "thumbnail";
}

export function PhotoVisualize(props: PhotoVisualizeProps) {
  const { data, size } = props;
  return (
    <Image
      src={`${CONFIG.STRAPI_URL_PAGE}${data.attributes.formats[size].url}`}
      alt={data.attributes.caption}
      width={data.attributes.formats[size].width}
      height={data.attributes.formats[size].height}
    />
  );
}
