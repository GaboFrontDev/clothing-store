import { validate } from "deep-email-validator";
import { OutputFormat } from "deep-email-validator/dist/output/output";
import { NextResponse } from "next/server";

export const EMAIL_ERROR_RESPONSE = (
  message = "Email cannot being sent",
  opts = {}
) =>
  NextResponse.json(
    {
      sucess: false,
      message,
      ...opts,
    },
    {
      status: 400,
    }
  );

export async function isEmailValid(email: string) {
  const res = await validate({
    email: email,
    sender: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
  });
  console.log(res);

  return res;
}

export function emailResponseHandler(values: OutputFormat) {
  const { valid: isValidEmail, reason: reasonError, validators } = values;

  if (!isValidEmail) {
    if (reasonError === "smtp") {
      if (validators.smtp?.reason !== "Timeout") return false;
    }
  }
  return true;
}
