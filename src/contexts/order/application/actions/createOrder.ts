import { NextRequest, NextResponse } from "next/server";
import { OrderController } from "../OrderController";
import { OrderEntity } from "../../domain/OrderEntity";

const { createOrder } = new OrderController<NextRequest>();

export async function createOrderAction(req: NextRequest, session_id?: string) {
  try {

    if(session_id) {
        return;
    }
    const payload = (await req.json()) as Omit<OrderEntity, "id">;

    const order = await createOrder(payload);
    return NextResponse.json(
      {
        sucess: true,
        result: {
          order,
        },
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
