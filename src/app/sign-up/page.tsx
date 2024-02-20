import { SignUpForm } from "@/components/sign-up-form";
import Image from "next/image";

export default function () {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-6 sm:px-24 py-24 mt-6">
			<Image
				width={200}
				height={32}
				className="block mx-auto"
				src="/vercel.svg"
				alt="Vercel Logo"
			/>
			<div className="my-4 max-w-96 w-full px-4">
				<SignUpForm />
			</div>
		</main>
	);
}
