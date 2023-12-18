import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { CollectionEntity } from "../domain/CollectionEntity";

class CollectionRepositoryClass extends StrapiRepository<CollectionEntity> {
    constructor() {
        super("collection");
    }

    public async getCollections() {
        return (await this.get('?populate=*')).data;
    }

    public async getByCollectionId(id: string) {
        return (await this.getSingleItem(`/${id}?populate=collection_photo&populate=products.photos`)).data;
    }
}

const CollectionRepository = new CollectionRepositoryClass();

export default CollectionRepository;