
import { NextRequest, NextResponse } from "next/server";
import { OrderController } from "../OrderController";
import { RemoveFromCartPayloadEntity } from "../../domain/RemoveFromCartPayloadEntity";

const { removeFromCart } = new OrderController<NextRequest>();

export async function removeItemFromCartAction(req: NextRequest) {
    try {
        const {cart, productId, deleteAll = false} = (await req.json()) as RemoveFromCartPayloadEntity ;
        
        const updatedCart = await removeFromCart(cart, productId, deleteAll);
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