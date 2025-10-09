import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
export default defineConfig({
  dialect: "postgresql",
  schema: ["./src/schema/schemas.ts"],
  out: "./drizzle",
  dbCredentials: {
   url: process.env.DB_URL
  } as any,
  
  schemaFilter:["task"]
});