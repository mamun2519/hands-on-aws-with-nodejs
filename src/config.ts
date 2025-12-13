import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
//Dot Env Config-----
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
};
