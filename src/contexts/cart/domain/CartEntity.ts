import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";

export interface CartEntity {
    products: StrapiEntryEntity<ProductEntity>[];
    user_id?: string;
    amount: number;
}
