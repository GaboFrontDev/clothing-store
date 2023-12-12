import ProductCard from "@/components/ProductCard";
import { getCollectionByIdAction } from "@/contexts/collection/application/actions/getCollectionById";

interface PageProps {
  params: {
    collection_id: string;
  };
}

export default async function CollectionIdPage(
  props: PageProps
) {
  const {
    params: { collection_id },
  } = props;
  const collection =
    await getCollectionByIdAction(collection_id);
  if ("error" in collection) {
    return <>No se ha encontrado la colección</>;
  }

  const collectionName =
    "name" in collection && collection.name;
  const collectionDescription =
    "description" in collection &&
    collection.description;

  const isInvalid =
    !("products" in collection) ||
    !collection.products.data.length;

  if (isInvalid) {
    return (
      <section className="min-h-[650px]">
        <h1 className="text-6xl pb-2">
          {collectionName}
        </h1>
        <h1 className="text-xl pb-6">
          {collectionDescription}
        </h1>
        <>
          <p>
            La colección no tiene productos
            publicados.
          </p>
          <p>
            Por favor agrega productos y asígnalos
            a alguna colección {collectionName} 😳
          </p>
        </>
      </section>
    );
  }

  return (
    <section className="min-h-[650px]">
      <h1 className="text-6xl pb-2">
        {collectionName}
      </h1>
      <h1 className="text-xl pb-6">
        {collectionDescription}
      </h1>
      <section className="grid grid-cols-2 md:grid-cols-3">
        {collection.products.data.map(
          (product, index) => (
            <ProductCard
              key={`product-${index}`}
              href={`${collection_id}/${product.id}`}
              product={product}
            />
          )
        )}
      </section>
    </section>
  );
}
