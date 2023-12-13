import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

export function getCookiesOrNull(
    req?: NextRequest,
    cookies?:
      | RequestCookies
      | ReadonlyRequestCookies
  ) {
    let res = null;
    if (req) {
      res = req.cookies;
    }
    if (cookies) {
      res = cookies;
    }
  
    return res;
  }
  