import { resolve } from "path";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../../.env") });

export const PORT = (process.env.PORT != null) || 3000;
