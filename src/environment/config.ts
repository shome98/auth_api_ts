import dotenv from "dotenv";
dotenv.config();
const config = {
  MONGODB_URI: String(process.env.MONGODB_URI),
  JWT_SECRET: String(process.env.JWT_SECRET),
  JWT_EXPIRY: Number(process.env.JWT_EXPIRY),
  JWT_REFRESH_SECRET: String(process.env.JWT_REFRESH_SECRET),
  JWT_REFRESH_EXPIRY: Number(process.env.JWT_REFREH_EXPIRY),
  PORT: Number(process.env.PORT),
};
export default config;