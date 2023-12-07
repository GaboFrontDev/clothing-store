
import { NextRequest, NextResponse } from "next/server";
import { CartController } from "../CartController";
import { RemoveFromCartPayloadEntity } from "../../domain/RemoveFromCartPayloadEntity";
import { getProductById } from "../helpers/productsInventoryQueries";

const { removeFromCart } = new CartController<NextRequest>();

export async function removeItemFromCartAction(req: NextRequest) {
    try {
        const {cart, productId, deleteAll = false} = (await req.json()) as RemoveFromCartPayloadEntity ;
        const product = await getProductById(productId);
        const updatedCart = await removeFromCart(cart, product.id as string, deleteAll);
        return NextResponse.json(
            {
                sucess: true,
                result: {
                    cart: updatedCart
                }
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                sucess: false,
                error
            },
            {
                status: 500,
            }
        );
    }
}
