import postgres from "postgres";

export const sql = postgres({
	database: process.env.PG_DATABASE!,
	host: process.env.PG_HOST,
	port: parseInt(process.env.PG_PORT!),
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	max: 1,
	ssl: "require",
});

export type User = {
	id: string;
	email: string;
	password: string;
};
