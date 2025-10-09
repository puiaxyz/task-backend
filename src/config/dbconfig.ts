import { Pool } from 'pg';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as dbschema from '../schema/schemas.ts';
import * as dbrelations from '../schema/relations.ts';

const pool = new Pool({
    connectionString: process.env.DB_URL
})


export const db = drizzle(pool,{schema:{...dbschema,...dbrelations}})
