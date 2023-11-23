import { ProductEntity } from "@/contexts/product/infrastructure/ProductEntity";

export interface OrderEntity {
    id: number;
    product: ProductEntity;
    amount: number
}
