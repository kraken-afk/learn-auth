import Image from "next/image";
import { SignInForm } from "@/components/sign-in-form";

export default function () {
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
					<h1 className="my-8 text-2xl sm:text-4xl">You're not logged in</h1>
					<SignInForm />
				</div>
			</div>
		</main>
	);
}
