//import * as devData from "./data.dev.js";
import * as prodData from "./data.prod.js";

//const isDev = process.env.NODE_ENV === "production";
//const data = isDev ? devData : prodData; FOR LATER WHEN I PUSH THE SITE LIVE

const data = prodData;

export const {
  logotext,
  meta,
  introdata,
  dataabout,
  dataportfolio,
  databooks,
  contactConfig,
  socialprofils
} = data;