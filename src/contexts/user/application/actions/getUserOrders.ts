import { NextRequest, NextResponse } from "next/server";
import { UserController } from "../UserController";

const { getUserOrders } = new UserController<NextRequest>();

export async function getUserOrdersAction(req: NextRequest) {
    try {
        const orders = getUserOrders(req);
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
