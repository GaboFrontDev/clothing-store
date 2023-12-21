import { PhotoVisualize } from "./PhotoVisualize";
import { Overlay } from "./Overlay";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";
import { ProductEntity } from "@/contexts/product/domain/ProductEntity";

interface HomeGalleryProps {
  products: StrapiEntryEntity<ProductEntity>[]
}

export async function HomeGallery(props: HomeGalleryProps) {

  const { products } = props;
  return (
    <div className="grid grid-cols-6 grid-rows-2">
      {products[0].attributes.photos.data.map(
        (photo, index) => {
          return (
            <div
              className="first-of-type:col-span-6 col-span-3 row-span-1 flex justify-center items-center p-1"
              key={`photo-${index}`}
            >
              <div className="h-fit w-fit relative">
                <Overlay
                  href={`/products/${products[0].id}`}
                >
                  <span className="text-[6pt] md:text-base">
                    $
                    {products[0].attributes.price}
                  </span>
                </Overlay>
                <div className="h-full w-full z-2">
                  <a
                    href={`/products/${products[0].id}`}
                  >
                    <PhotoVisualize
                      data={photo}
                      size="small"
                    />
                  </a>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
