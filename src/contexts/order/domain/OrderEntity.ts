import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { UserEntity } from "@/contexts/user/domain/UserEntity";

export interface OrderEntity {
    id: string;
    products: ProductEntity[];
    user_id: string;
    amount: number;
}
