import { ProductEntity } from "@/contexts/product/domain/ProductEntity";

export interface CartEntity {
    products: ProductEntity[];
    user_id: string;
    amount: number;
}
