import { ProductEntity } from "@/contexts/product/domain/ProductEntity";

export interface OrderEntity {
    products: ProductEntity[];
    user_id: string;
    amount: number;
}
