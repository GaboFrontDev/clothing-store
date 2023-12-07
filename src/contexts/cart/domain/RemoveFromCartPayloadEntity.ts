import { CartEntity } from "../../order/domain/CartEntity";

export interface RemoveFromCartPayloadEntity {
    cart: CartEntity,
    productId: string,
    deleteAll?: boolean
}