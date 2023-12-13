import {
  NextRequest,
  NextResponse,
} from "next/server";
import { CartEntity } from "../../domain/CartEntity";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { getCookiesOrNull } from "../helpers/getCookiesOrNull";
import { CookieError } from "@/utils/errors/CookieError";
import { AuthenticationError } from "@/utils/errors/AuthenticationError";
import { CookieCartError } from "@/utils/errors/CookieCartError";

export async function getUserCartAction(
  req?: NextRequest,
  cookies?:
    | RequestCookies
    | ReadonlyRequestCookies
) {
  try {
    let userCookies = getCookiesOrNull(
      req,
      cookies
    );

    if (!userCookies) {
      throw new CookieError("Cookies not found");
    }

    const userCart = userCookies.get(
      "user_cart"
    ) as unknown as string;

    if (!req) {
      return userCart;
    }

    return NextResponse.json(
      {
        sucess: true,
        result: {
          cart: JSON.parse(
            userCart
          ) as CartEntity,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (!req) {
      if (error instanceof AuthenticationError) {
        throw error;
      }

      if(error instanceof CookieError) {
        throw error;
      }

      throw Error(error as string);
    }

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
