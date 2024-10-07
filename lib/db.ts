import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { photos, comments, users } from './schema';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);

export { photos, comments, users };