import { PhotoVisualize } from "@/components/PhotoVisualize";
import { getCollectionsAction } from "@/contexts/collection/application/actions/getCollections"

export default async function CollectionsPage() {
    const collections = await getCollectionsAction();

    if (!Array.isArray(collections) || collections.length < 1) {
        return <section className="flex justify-center">
            Por favor, agrega coleccciones a inventario en el administrador 🙊
        </section>
    }


    return (
      <section className="grid grid-cols-2 md:grid-cols-3 grid-rows-1">
        {collections.map((collection, index) => (
          <a
            href={`/collections/${collection.id}`}
            key={`collection-${index}`}
            className="col-span-1 cursor-pointer p-2"
          >
            <section className="md:min-h-[250px] lg:md:min-h-[350px] flex flex-col justify-center">
              <div className="rounded-lg overflow-hidden">
                <PhotoVisualize
                  data={
                    collection.attributes
                      .collection_photo.data[0]
                  }
                  size="small"
                />
              </div>
            </section>
            <p className="text-center">
              {collection.attributes.name}
            </p>
          </a>
        ))}
      </section>
    );
}