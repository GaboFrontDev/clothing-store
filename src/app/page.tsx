import { PhotoVisualize } from "@/components/PhotoVisualize";
import { getProductsAction } from "@/contexts/product/application/actions/getProducts";

export default async function Home() {
  const response = await getProductsAction();
  if (Array.isArray(response)) {
    response.forEach((product) => {
      console.log(product);
    });
  }
  return (
    <main className="flex flex-col items-center justify-between md:px-10 lg:px-16 px-10">
      {!("json" in response) && (
        <div className="grid grid-cols-6 grid-rows-2">
          {response[0].attributes.photos.data.map((photo, index) => {
            return (
              <div
                className="first-of-type:col-span-6 col-span-3 first-of-type:row-span-2 row-span-1 flex justify-center items-center p-1"
                key={`photo-${index}`}
              >
                <div className="h-fit w-fit relative">
                  <div className="group absolute h-full w-full hover:bg-gray-800 hover:bg-opacity-60 transition-colors flex flex-row justify-center items-center">
                    <a
                      className="hidden group-hover:flex transition-all  items-center bg-store-bg-100 px-2 py-1 mx-2"
                      href=""
                    >
                      <span className="text-[6pt] md:text-base">${response[0].attributes.price}</span>
                    </a>
                  </div>
                  <div className="h-full w-full z-2">
                    <PhotoVisualize data={photo} size="small" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
