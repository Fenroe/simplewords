import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: "monorail.proxy.rlwy.net",
  port: 18005,
  database: "railway",
  user: "postgres",
  password: process.env.POSTGRES_PASSWORD,
});
