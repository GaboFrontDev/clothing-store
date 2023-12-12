import { NextRequest, NextResponse } from "next/server";
import { CartEntity } from "../../domain/CartEntity";

export async function createUserCartActions(req: NextRequest) {
  try {
    const authData = JSON.parse(
      req.cookies.get("authentication_token") as unknown as string
    ) as LoginEntity;
    const userCart = req.cookies.set(
      "user_cart",
      JSON.stringify({
        payment_amount: 0,
        products: [],
        user_id: authData.user_id,
      } as CartEntity)
    );
    return NextResponse.json(
      {
        sucess: true,
        result: {
          userCart,
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
