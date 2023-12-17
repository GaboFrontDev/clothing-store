import CONFIG from "@/config";
import { jwtVerify } from "jose";

interface AuthorizationResponse {
  id: string
}

async function parseCredentialsTokenOrFail(token: string): Promise<AuthorizationResponse> {
  const privateKey = CONFIG.JWT_SECRET;  
  let result = null;
  try {
    result = await jwtVerify(token, new TextEncoder().encode(privateKey));
  } catch (error) {
    console.log("not authorized");
    console.log(error);
    throw error;
  }
  if(!result){ 
    throw Error("Cannot validate token");
  }
  
  return result.payload
    .data as AuthorizationResponse;
}

export default parseCredentialsTokenOrFail;
