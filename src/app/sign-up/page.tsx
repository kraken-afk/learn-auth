import { SignUpForm } from "@/components/sign-up-form";
import Image from "next/image";

export default function SignUp() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-6 sm:px-24 py-24 mt-6">
			<div className="max-w-96 w-full px-4">
				<Image
					width={200}
					height={32}
					className="block mx-auto"
					src="/vercel.svg"
					alt="Vercel Logo"
				/>
				<div className="mt-16">
					<SignUpForm />
				</div>
			</div>
		</main>
	);
}
