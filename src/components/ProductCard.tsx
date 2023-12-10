import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";
import { PhotoVisualize } from "./PhotoVisualize";

interface ProductCardProps {
  product: StrapiEntryEntity<ProductEntity>;
  href: string;
}

export default function ProductCard(props: ProductCardProps) {
  const { product, href } = props;

  return (
    <div className="col-span-1 rounded-lg overflow-hidden md:m-3 m-1">
      <a href={href}>
        <PhotoVisualize
          data={product.attributes.photos.data[0]}
          size="medium"
        />
      </a>
      <section className="p-4 flex items-center flex-col border border-slate-500 border-t-0 rounded-b-lg">
        <p>{product.attributes.name}</p>
        <p>${product.attributes.price} MXN</p>
        <a
          href=""
          className="border-2 border-emerald-800 active:bg-emerald-800 active:text-white hover:bg-emerald-800 hover:text-white rounded-md px-2"
        >
          Agregar al carrito
        </a>
      </section>
    </div>
  );
}
