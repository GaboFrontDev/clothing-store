import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";
import { UserPayloadEntity } from "@/contexts/user/domain/UserEntity";

export interface CartEntity {
    products: StrapiEntryEntity<ProductEntity>[];
    user_account?: StrapiEntryEntity<UserPayloadEntity>;
    payment_amount: number;
}
