import { NextRequest, NextResponse } from "next/server";
import { PaymentStripePayloadEntity } from "../../domain/PaymentPayloadEntity";
import { PaymentController } from "../PaymentController";

const { makePayment } = new PaymentController();

export async function handlePayment(req: NextRequest) {
  try {
    const data = (await req.json()) as unknown as PaymentStripePayloadEntity;
    const token = (await makePayment(data)) as any;
    req.cookies.set("authentication_token", token);
    return NextResponse.json(
      {
        sucess: true,
      },
      {
        status: 201,
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
