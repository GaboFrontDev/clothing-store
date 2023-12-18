import AddToCartButton from "@/components/AddToCartButton";
import Carousel from "@/components/Carousel";
import GoToPayButton from "@/components/GoToPay";
import CONFIG from "@/config";
import { getProductById } from "@/contexts/cart/application/helpers/productsInventoryQueries";

interface PageProps {
  params: {
    product_id: string;
  };
}

export default async function ProductIdPage(props: PageProps) {
  const showCartButtonFeature = CONFIG.SHOW_CART_BUTTON;
  
  const showGoToFeature = CONFIG.SHOW_GOTO_BUTTON;
  const {
    params: { product_id },
  } = props;
  const product = await getProductById(product_id);

  return (
    <section className="my-6 md:flex">
      <section className="md:max-w-[40vw]">
        <Carousel images={product.attributes.photos.data} />
      </section>
      <section className="md:m-2">
        <div className="m-4">
          <p className="font-medium text-xl">{product.attributes.name}</p>
        </div>
        <div className="m-4">
          <p>{product.attributes.description}</p>
        </div>
        <div className="m-4">
          <p className="font-medium text-xl">
            ${product.attributes.price.toLocaleString("en-US")}
          </p>
        </div>
        <div className="w-full">
          {showGoToFeature && (
            <GoToPayButton url={product.attributes.pay_url} />
          )}
          {showCartButtonFeature && <AddToCartButton productId={product_id} />}
        </div>
      </section>
    </section>
  );
}
