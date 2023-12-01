import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";

export interface CollectionEntity {
    products: StrapiEntryEntity<ProductEntity>[],
}