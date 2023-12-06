import { getProductsAction } from "@/contexts/product/application/actions/getProducts";
import { PhotoVisualize } from "./PhotoVisualize";
import { Overlay } from "./Overlay";

export async function HomeGallery() {
  const products = await getProductsAction();

  if (!Array.isArray(products) || products.length < 1) {
    return <>
      Por favor, agrega productos a inventario en el administrador 🙊
    </>
  }

  return (
    <div className="grid grid-cols-6 grid-rows-2">
      {products[0].attributes.photos.data.map((photo, index) => {
        return (
          <div
            className="md:col-span-2 md:first-of-type:col-span-2 first-of-type:col-span-6 col-span-3 row-span-1 flex justify-center items-center p-1"
            key={`photo-${index}`}
          >
            <div className="h-fit w-fit relative">
              <Overlay>
                <span className="text-[6pt] md:text-base">
                  ${products[0].attributes.price}
                </span>

              </Overlay>
              <div className="h-full w-full z-2">
                <PhotoVisualize data={photo} size="small" />
              </div>
            </div>
          </div>
        )
      })
      }
    </div>
  );
}
