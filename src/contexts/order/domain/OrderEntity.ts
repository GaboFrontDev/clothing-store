import { ProductEntity } from "@/contexts/product/domain/ProductEntity";

export interface OrderEntity {
    id: number;
    products: ProductEntity[];
    amount: number
}
