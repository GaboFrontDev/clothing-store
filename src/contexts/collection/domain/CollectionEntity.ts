import { ProductEntity } from "@/contexts/product/domain/ProductEntity";

export interface CollectionEntity {
    producst: ProductEntity[],
    created_at: Date,
    updated_at: Date,
    visible: boolean
}