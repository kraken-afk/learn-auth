import postgres from "postgres";

const sql = postgres({
	database: process.env.PG_DATABASE,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	max: 1,
});

try {
	await sql`
  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR NOT NULL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL
  )
`;

	await sql`
  CREATE TABLE IF NOT EXISTS user_sessions (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id TEXT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
  )
`;

	console.info("Table created..");
} catch (err) {
	console.error(`Something went error: ${err.message}`);
}

sql.end();
