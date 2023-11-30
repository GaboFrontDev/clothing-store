import { NextRequest, NextResponse } from "next/server";
import { ProductController } from "../ProductController";

const { getProductsByCategory } = new ProductController();

export async function getProductsByCategoryAction(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category_value = searchParams.get('category');
    if(!category_value?.length) {
        throw Error("missing category value")
    }
    const products = await getProductsByCategory(category_value);
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
        error,
      },
      {
        status: 500,
      }
    );
  }
}
