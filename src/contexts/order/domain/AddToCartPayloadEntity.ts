import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { CartEntity } from "./CartEntity";

export interface AddToCartPayloadEntity {
    cart: CartEntity,
    newProduct: ProductEntity,
    amount: number
}