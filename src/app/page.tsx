"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/lib/action";
import { signInSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, z } from "zod";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function () {
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const submitHandler = async (data: z.infer<typeof signInSchema>) =>
		await signInAction(data);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 mt-6">
			<div>
				<Image
					width={200}
					height={32}
					className="block mx-auto"
					src="/vercel.svg"
					alt="Vercel Logo"
				/>
				<div className="mx-auto">
					<h1 className="my-8 text-4xl">You're not logged in</h1>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(submitHandler)}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="my-4">
										<FormLabel>Email address</FormLabel>
										<FormControl>
											<Input
												placeholder="Email address"
												type="email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="my-4">
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button className=" float-end my-4" type="submit">
								Sign in
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</main>
	);
}
