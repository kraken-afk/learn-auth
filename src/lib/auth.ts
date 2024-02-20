import { sql } from "@/lib/db";
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
import { Lucia, Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

const adapter = new PostgresJsAdapter(sql, {
	session: "user_sessions",
	user: "users",
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
	},
	getUserAttributes: (attributes) => ({}),
});

export const validateRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

		if (!sessionId)
			return {
				user: null,
				session: null,
			};

		const result = await lucia.validateSession(sessionId);

		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				);
			}
		} catch {}

		return result;
	},
);

type DatabaseUserAttributes = {
	id: string;
	email: string;
	password: string;
};

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}
