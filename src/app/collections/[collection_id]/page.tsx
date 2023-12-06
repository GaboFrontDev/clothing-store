import { getCollectionByIdAction } from "@/contexts/collection/application/actions/getCollectionById";
import { GetServerSideProps } from "next";
import { useSearchParams } from "next/navigation";

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

  if (
    !("products" in collection) ||
    !collection.products.data.length
  ) {
    return (
      <>
        <p>La colección no tiene productos.</p>
        <p>
          Por favor agrega productos o asígnalos a
          alguna colección 😳
        </p>
      </>
    );
  }

  return (
    <section>
      {collection.products.data.map(
        (product, index) => (
          <span key={`product-${index}`}>
            {product.attributes.name}
          </span>
        )
      )}
    </section>
  );
}
