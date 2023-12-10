import { NextResponse } from "next/server";
import { ProductController } from "../ProductController";

const { getProductsByCategory } = new ProductController();

export async function getProductsByCategoryAction(
  req?: Request,
  category?: string
) {
  try {
    let category_value = null;
    if (req) {
      const { searchParams } = new URL(req.url);
      category_value = searchParams.get("category");
    } else if (category) {
      category_value = category;
    }
    if (!category_value?.length) {
      throw Error("missing category value");
    }
    const products = await getProductsByCategory(category_value);

    if(!req) {
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
        error,
      },
      {
        status: 500,
      }
    );
  }
}
