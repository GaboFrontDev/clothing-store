import { getProductsAction } from "@/contexts/product/application/actions/getProducts";
import { PhotoVisualize } from "./PhotoVisualize";

export async function HomeGallery() {
  const products = await getProductsAction();
  console.log(products);
  
  if (!Array.isArray(products) || products.length < 1) {
    return <>
      Por favor, agrega productos a inventario
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
              <div className="group absolute h-full w-full hover:bg-gray-800 hover:bg-opacity-60 transition-colors flex flex-row justify-center items-center">
                <a
                  className="hidden group-hover:flex transition-all  items-center bg-store-bg-100 px-2 py-1 mx-2"
                  href=""
                >
                  <span className="text-[6pt] md:text-base">
                    ${products[0].attributes.price}
                  </span>
                </a>
              </div>
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
