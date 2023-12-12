import Buttons from "@/components/Buttons";
import Carousel from "@/components/Carousel";
import { getProductById } from "@/contexts/cart/application/helpers/productsInventoryQueries";

interface PageProps {
  params: {
    product_id: string;
  };
}

export default async function CollectionProductIdPage(
  props: PageProps
) {
  const {
    params: { product_id },
  } = props;
  const product = await getProductById(
    product_id
  );
  console.log(product);

  return (
    <section className="my-6 md:flex">
      <section className="md:max-w-[40vw]">
        <Carousel
          images={product.attributes.photos.data}
        />
      </section>
      <section className="md:m-2">
        <div className="m-4">
          <p className="font-medium text-xl">
            {product.attributes.name}
          </p>
        </div>
        <div className="m-4">
          <p>{product.attributes.description}</p>
        </div>
        <div className="m-4">
          <p className="font-medium text-xl">
            $
            {product.attributes.price.toLocaleString(
              "en-US"
            )}
          </p>
        </div>
        <Buttons.Link
          href=""
          className=" text-center border-2 border-emerald-800 active:bg-emerald-800 active:text-white hover:bg-emerald-800 hover:text-white rounded-md px-2 block md:inline-block"
        >
          Add to cart
        </Buttons.Link>
      </section>
    </section>
  );
}
