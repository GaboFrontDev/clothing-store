import { ProductEntity } from "@/contexts/product/domain/ProductEntity";

export interface OrderEntity {
    id: string;
    products: ProductEntity[];
    user_id: string;
    amount: number;
}
