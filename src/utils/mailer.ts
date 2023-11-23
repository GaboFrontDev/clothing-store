import * as nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.NM_HOST,
  port: parseInt(process.env.NM_PORT || ""),
  secure: true,
  auth: {
    user: process.env.NM_USER,
    pass: process.env.NM_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify().then(() => {
  console.log("email service started");
});
