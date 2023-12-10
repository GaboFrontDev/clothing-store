import ProductCard from "@/components/ProductCard";
import { getCollectionByIdAction } from "@/contexts/collection/application/actions/getCollectionById";

interface PageProps {
  params: {
    collection_id: string;
  };
}

export default async function CollectionIdPage(props: PageProps) {
  const {
    params: { collection_id },
  } = props;
  const collection = await getCollectionByIdAction(collection_id);
  if ("error" in collection) {
    return <>No se ha encontrado la colección</>;
  }

  if (!("products" in collection) || !collection.products.data.length) {
    return (
      <>
        <p>La colección no tiene productos.</p>
        <p>Por favor agrega productos o asígnalos a alguna colección 😳</p>
      </>
    );
  }

  return (
    <section className="min-h-[650px]">
      <h1 className="text-6xl pb-2">{collection.name}</h1>
      <h1 className="text-xl pb-6">{collection.description}</h1>
      <section className="grid grid-cols-2 md:grid-cols-3">
        {collection.products.data.map((product, index) => (
          <ProductCard
            key={`product-${index}`}
            href={`${collection_id}/${product.id}`}
            product={product}
          />
        ))}
      </section>
    </section>
  );
}
