import CONFIG from "@/config";
import { jwtVerify } from "jose";

interface AuthorizationResponse {
  user_id: string
}

async function isAuthorized(token: string): Promise<AuthorizationResponse | unknown> {
  const privateKey = CONFIG.JWT_SECRET;  
  let result = null;
  try {
    result = await jwtVerify(token, new TextEncoder().encode(privateKey));
  } catch (error) {
    console.log("not authorized");
    return result;
  }
  
  return result?.payload.data;
}

export default isAuthorized;
