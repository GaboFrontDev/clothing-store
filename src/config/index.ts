const CONFIG = {
  JWT_SECRET: process.env["JWT_SECRET"] || "",
  STRAPI_URL: process.env["STRAPI_URL"] || "",
  STRAPI_URL_PAGE: process.env["STRAPI_URL_PAGE"] || "",
  STRAPI_TOKEN: process.env["STRAPI_TOKEN"] || "",
  STRIPE_SECRET: process.env["STRIPE_SECRET"] || "",
};

export default CONFIG;
