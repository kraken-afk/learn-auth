"use server";

import { signInSchema, signUpSchema } from "@/lib/zod-schema";
import { z } from "zod";
import { randomStr } from "@/lib/utils";
import { User, sql } from "@/lib/db";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

import bcrypt from "bcrypt";

export async function signInAction(data: z.infer<typeof signInSchema>) {
	const { email, password } = data;

	const users = await sql<User[]>`
		SELECT * FROM users
		WHERE email = ${email}
	`;

	if (!users.length) return { status: 404 };
	const [user] = users;

	if (!(await bcrypt.compare(password, user.password))) return { status: 401 };
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);

	return { status: 200 };
}

export async function signUpAction(data: z.infer<typeof signUpSchema>) {
	const id = `user-${randomStr(7)}`;
	const email = data.email;
	const hashed_password = await bcrypt.hash(
		data.password,
		await bcrypt.genSalt(5),
	);
	const [returnedUser] = await sql<User[]>`
		INSERT INTO users (id, email, password)
		VALUES (${id}, ${email}, ${hashed_password})
		RETURNING *;
	`;
	const session = await lucia.createSession(returnedUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);

	return { status: 201 };
}
