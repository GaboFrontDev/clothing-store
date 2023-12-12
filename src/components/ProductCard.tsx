import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";
import { PhotoVisualize } from "./PhotoVisualize";
import Buttons from "./Buttons";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: StrapiEntryEntity<ProductEntity>;
  href: string;
  showAddToCart?: boolean
}

export default function ProductCard(props: ProductCardProps) {
  const { product, href, showAddToCart = true } = props;

  return (
    <div className="col-span-1  md:m-3 m-1">
      <a
        href={href}
        className="min-h-[250px] flex flex-col justify-center"
      >
        <div className="rounded-lg overflow-hidden">
          <PhotoVisualize
            data={
              product.attributes.photos.data[0]
            }
            size="medium"
          />
        </div>
      </a>
      <section className="p-4 flex items-center flex-col rounded-b-lg justify-center">
        <p>{product.attributes.name}</p>
        <p>${product.attributes.price} MXN</p>
        {showAddToCart && (
          <AddToCartButton
            productId={product.id}
          />
        )}
      </section>
    </div>
  );
}
