import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";
import { StrapiMediaEntity } from "@/contexts/shared/domain/StrapiMediaEntity";

export interface CollectionEntity {
    products: {
        data: StrapiEntryEntity<ProductEntity>[]
    },
    name: string;
    description: string;
    collection_photo: {
        data: StrapiMediaEntity[];
    };
}