import { NextRequest, NextResponse } from "next/server";
import { ProductController } from "../ProductController";

const { getProducts } = new ProductController();

export async function getProductsAction(req?: NextRequest) {
  try {
    const products = await getProducts();
    if (!req) {
      return products;
    }
    return NextResponse.json(
      {
        sucess: true,
        result: {
          products,
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
