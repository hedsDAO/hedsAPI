import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  host: `${process.env.CLOUD_SQL_HOST}`,
  user: `${process.env.CLOUD_SQL_USER}`,
  password: `${process.env.CLOUD_SQL_PASSWORD}`,
  database: `${process.env.CLOUD_SQL_DATABASE}`,
  port: 5432,
});
