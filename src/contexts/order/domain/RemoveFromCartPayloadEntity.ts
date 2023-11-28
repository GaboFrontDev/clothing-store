import { CartEntity } from "./CartEntity";

export interface RemoveFromCartPayloadEntity {
    cart: CartEntity,
    productId: string,
    deleteAll?: boolean
}