import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { CollectionEntity } from "../domain/CollectionEntity";

class CollectionRepositoryClass extends StrapiRepository<CollectionEntity> {
    constructor() {
        super("collection");
    }

    public async getCollections() {
        return (await this.get()).data;
    }

    public async getByCollectionId(id: string) {
        return (await this.getSingleItem(`/${id}`)).data.attributes;
    }
}

const CollectionRepository = new CollectionRepositoryClass();

export default CollectionRepository;