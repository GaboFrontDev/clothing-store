const CONFIG = {
  JWT_SECRET: process.env["JWT_SECRET"] || "",
  STRAPI_URL: process.env["STRAPI_URL"] || "",
  STRIPE_SECRET: process.env["STRIPE_SECRET"] || "",
};

export default CONFIG;
