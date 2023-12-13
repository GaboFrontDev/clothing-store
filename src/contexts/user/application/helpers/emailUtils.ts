import { transporter } from "@/utils/mailer";
import { EMAIL_ERROR_RESPONSE } from "./emailExists";

const verificationPage = "https://wwww.telluridedigitalworks.com/verified?token="

export async function sendVerificationEmail(email: string, token: string, returnUrl = 'login') {
  try {
    const res = await new Promise<any>((resolve, reject) => {
      const ownerEmailPayload = {
        from: `Telluride Digital Works <no-reply@telluridedigitalworks.com>`,
        to: `${email}`,
        subject: "Verify your email",
        text:
          "Please confirm your email by clicking on this link: \n" +
          `<a href='${verificationPage}${token}?from=${returnUrl}'>Verify my account</a> `,
      };
      const sendCallback = function (err: any) {
        if (err) {
          console.error({ err });
          reject(err);
          return;
        }
        resolve(true);
      };
      console.log(
        `Sending email ${JSON.stringify(
          ownerEmailPayload
        )}`
      );
      transporter.sendMail(ownerEmailPayload, sendCallback);
    });
    return res;
  } catch (error) {
    return false;
  }
}
