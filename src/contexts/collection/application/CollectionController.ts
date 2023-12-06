import { CollectionEntity } from "../domain/CollectionEntity";
import CollectionRepository from "../infrastructure/CollectionRepository";

export class CollectionCotroller<Request> {
    constructor() {
    }


    public async getProductsInCollection(collectionId: string) {
        return (await CollectionRepository.getByCollectionId(collectionId)).attributes
    }


    public async getCollections() {
        return await CollectionRepository.getCollections();
    }
}