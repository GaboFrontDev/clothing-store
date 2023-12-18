import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";
import { PhotoVisualize } from "./PhotoVisualize";
import AddToCartButton from "./AddToCartButton";
import GoToPayButton from "./GoToPay";
import CONFIG from "@/config";

interface ProductCardProps {
  product: StrapiEntryEntity<ProductEntity>;
  href: string;
  showAddToCart?: boolean;
  showPayUrl?: boolean;
}

export default function ProductCard(props: ProductCardProps) {
  const { product, href, showAddToCart = true, showPayUrl = false } = props;

  const showCartButtonFeature = CONFIG.SHOW_CART_BUTTON;
  const showGoToFeature = CONFIG.SHOW_GOTO_BUTTON;

  return (
    <div className="col-span-1  md:m-3 m-1">
      <a
        href={href}
        title="card"
        className="md:min-h-[250px] lg:md:min-h-[350px] flex flex-col justify-center"
      >
        <div className="rounded-lg overflow-hidden">
          <PhotoVisualize
            data={product.attributes.photos.data[0]}
            size="medium"
          />
        </div>
      </a>
      <section className="p-4 flex items-center flex-col rounded-b-lg justify-center">
        <p>{product.attributes.name}</p>
        <p>${product.attributes.price} MXN</p>
        {showCartButtonFeature && showAddToCart && (
          <AddToCartButton productId={product.id} />
        )}
        {showGoToFeature && showPayUrl && (
          <GoToPayButton url={product.attributes.pay_url} />
        )}
      </section>
    </div>
  );
}
