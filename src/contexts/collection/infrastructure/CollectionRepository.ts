import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { CollectionEntity } from "../domain/CollectionEntity";

class CollectionRepositoryClass extends StrapiRepository<CollectionEntity> {
    constructor() {
        super("collections");
    }

    public getCollections() {
        return this.get();
    }

    public getByCollectionId(id: string) {
        return this.get(`/${id}`);
    }
}

const CollectionRepository = new CollectionRepositoryClass();

export default CollectionRepository;