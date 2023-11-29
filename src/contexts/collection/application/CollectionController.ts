import { CollectionEntity } from "../domain/CollectionEntity";
import CollectionRepository from "../infrastructure/CollectionRepository";

export class CollectionCotroller<Request> {
    constructor() {
    }


    getProductsInCollection(req: Request): Promise<CollectionEntity> {

        return new Promise<CollectionEntity>(() => { })
    }


    async getCollections() {
        return await CollectionRepository.getCollections();
    }
}