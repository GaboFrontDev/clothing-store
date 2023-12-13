import {
  NextRequest,
  NextResponse,
} from "next/server";
import { CartEntity } from "../../domain/CartEntity";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { getCookiesOrNull } from "../helpers/getCookiesOrNull";
import { AuthenticationError } from "@/utils/errors/AuthenticationError";
import { CookieError } from "@/utils/errors/CookieError";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function createUserCartActions(
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

    const authToken = userCookies.get(
      "authentication_token"
    ) as unknown as string;

    if (!authToken) {
      console.log("authentication token not found");
      
      throw new AuthenticationError(
        "Authentication Token not found"
      );
    }

    const authData = JSON.parse(
      authToken
    ) as LoginEntity;

    if (!authData.user_id) {
      throw Error(
        "Missing user_id in auth token, relogin."
      );
    }

    const userCart = userCookies.set(
      "user_cart",
      JSON.stringify({
        payment_amount: 0,
        products: [],
        user_id: authData.user_id,
      } as CartEntity)
    );

    if (!req) {
      return userCart;
    }

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
    if (!req) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      if (error instanceof CookieError) {
        console.log(error);
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
