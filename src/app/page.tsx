import Image from "next/image";
import { SignInForm } from "@/components/sign-in-form";
import { validateRequest } from "@/lib/auth";
import { User, sql } from "@/lib/db";

export default async function () {
	const { user } = await validateRequest();
	const result =
		user &&
		(
			await sql<User[]>`
		SELECT email FROM users
		WHERE id = ${user.id}
	`
		).at(0);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-6 sm:px-24 py-24 mt-6">
			<div>
				<Image
					width={200}
					height={32}
					className="block mx-auto"
					src="/vercel.svg"
					alt="Vercel Logo"
				/>
				<div className="mx-auto">
					<h1 className="my-8 text-2xl sm:text-4xl">
						{user && result
							? `You're logged in as ${result.email}`
							: "You're not logged in"}
					</h1>
					{!user && <SignInForm />}
				</div>
			</div>
		</main>
	);
}
