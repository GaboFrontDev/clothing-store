import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";
import { UserEntity } from "@/contexts/user/domain/UserEntity";

export interface CartEntity {
    products: StrapiEntryEntity<ProductEntity>[];
    user_account?: StrapiEntryEntity<UserEntity>;
    payment_amount: number;
}
