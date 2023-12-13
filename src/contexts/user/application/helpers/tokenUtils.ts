import { SignJWT } from "jose";
import { randomBytes, pbkdf2 } from "node:crypto";

import CONFIG from "@/config";

const DIGEST = "sha256";
const ITERATIONS = 1000;
const SALT_LENGTH = 24;
const BYTE_TO_STRING_ENCODING = "hex";
const PASSWORD_LENGTH = 90;

const privateKey = CONFIG.JWT_SECRET || "";

export const createLoginToken = async (data: any) => {
  if (!privateKey.length) {
    console.log("Error: setup a JWT_SECRET in ENV");
  }
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24; // one day
  const token = await new SignJWT({
    data: {
      ...data,
      password: null,
    },
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(privateKey));
  return token;
};

export const createAccountToken = async (account_id: string) => {
  if (!privateKey.length) {
    console.log("Error: setup a JWT_SECRET in ENV");
  }
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 30 * 6; // six months
  const token = await new SignJWT({
    data: {
      account_id,
    },
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(privateKey));
  return token;
};

interface PersistedPassword {
  salt: string;
  hash: string;
  iterations: number;
}

export function generateHashPassword(
  password: string
): Promise<PersistedPassword> {
  return new Promise<PersistedPassword>((accept, reject) => {
    const salt = randomBytes(SALT_LENGTH).toString(BYTE_TO_STRING_ENCODING);
    pbkdf2(
      password,
      salt,
      ITERATIONS,
      PASSWORD_LENGTH,
      DIGEST,
      (error, hash) => {
        if (error) {
          return reject(error);
        }

        accept({
          salt,
          hash: hash.toString(BYTE_TO_STRING_ENCODING),
          iterations: ITERATIONS,
        });
      }
    );
  });
}

export async function generateAuthenticationToken() {
  if (!privateKey.length) {
    console.log("Error: setup a JWT_SECRET in ENV");
  }
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 10; // ten minutes
  const token = await new SignJWT({
    data: {},
  })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(privateKey));
  return token;
}

export function verifyPassword(
  persistedPassword: Omit<PersistedPassword, 'iterations'>,
  passwordAttempt: string
): Promise<boolean> {
  return new Promise<boolean>((accept, reject) => {
    pbkdf2(
      passwordAttempt,
      persistedPassword.salt,
      ITERATIONS,
      PASSWORD_LENGTH,
      DIGEST,
      (error, hash) => {
        if (error) {
          return reject(error);
        }

        accept(
          persistedPassword.hash === hash.toString(BYTE_TO_STRING_ENCODING)
        );
      }
    );
  });
}
