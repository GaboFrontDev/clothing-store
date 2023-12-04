import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";

export interface OrderEntity {
    id: string;
    products: StrapiEntryEntity<ProductEntity>[];
    user_id: string;
    amount: number;
}
