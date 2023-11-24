import { NextRequest, NextResponse } from "next/server";
import { OrderController } from "../OrderController";
import { OrderSearchPayloadEntity } from "../../domain/OrderSearchPayloadEntity";

const { getOrdersByUserId } = new OrderController<NextRequest>();

export async function getUserOrdersAction(req: NextRequest) {
    try {
        const payload = await req.json() as OrderSearchPayloadEntity;
        
        const orders = await getOrdersByUserId(req, payload.id);
        return NextResponse.json(
            {
                sucess: true,
                result: {
                    orders
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
            },
            {
                status: 500,
            }
        );
    }
}
