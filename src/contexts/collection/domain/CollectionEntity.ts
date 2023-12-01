import { ProductEntity } from "@/contexts/product/domain/ProductEntity";

export interface CollectionEntity {
    products: ProductEntity[],
}