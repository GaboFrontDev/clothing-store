import { NextRequest, NextResponse } from "next/server";
import { CartEntity } from "../../../order/domain/CartEntity";

export async function getUserCartAction(req: NextRequest) {
  try {
    const userCart = req.cookies.get("user_cart") as unknown as string;
    return NextResponse.json(
      {
        sucess: true,
        result: {
          cart: JSON.parse(userCart) as CartEntity,
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
