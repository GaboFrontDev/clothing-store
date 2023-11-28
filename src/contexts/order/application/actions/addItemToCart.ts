
import { NextRequest, NextResponse } from "next/server";
import { OrderController } from "../OrderController";
import { AddToCartPayloadEntity } from "../../domain/AddToCartPayloadEntity";

const { addToCart } = new OrderController<NextRequest>();

export async function addItemToCartAction(req: NextRequest) {
    try {
        const {cart, newProduct, amount} = (await req.json()) as AddToCartPayloadEntity ;
        
        const updatedCart = await addToCart(cart, newProduct, amount);
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
