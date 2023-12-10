import { PhotoVisualize } from "@/components/PhotoVisualize";
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
          <div
            key={`product-${index}`}
            className="col-span-1 rounded-lg overflow-hidden md:m-3 m-1"
          >
            <a href={`${collection_id}/${product.id}`}>
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
        ))}
      </section>
    </section>
  );
}
