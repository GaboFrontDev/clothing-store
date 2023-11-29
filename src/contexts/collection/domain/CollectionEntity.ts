import { ProductEntity } from "@/contexts/product/domain/ProductEntity";

export interface CollectionEntity {
    products: ProductEntity[],
    created_at: Date,
    updated_at: Date,
    visible: boolean
}