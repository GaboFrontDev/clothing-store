const CONFIG = {
  JWT_SECRET: process.env["JWT_SECRET"] || "",
  STRAPI_URL: process.env["STRAPI_URL"] || "",
  STRAPI_URL_PAGE: process.env["STRAPI_URL_PAGE"] || "",
  STRAPI_TOKEN: process.env["STRAPI_TOKEN"] || "",
  STRIPE_SECRET: process.env["STRIPE_SECRET"] || "",
  SHOW_GOTO_BUTTON: process.env["SHOW_GOTO_BUTTON"] === 'true',
  SHOW_CART_BUTTON: process.env["SHOW_CART_BUTTON"] === 'true',
};



export default CONFIG;
