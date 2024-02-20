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
import { z } from "zod";
import { Button } from "@/components/ui/button";

export function SignInForm() {
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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitHandler)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="my-4">
							<FormLabel>Email address</FormLabel>
							<FormControl>
								<Input placeholder="Email address" type="email" {...field} />
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
								<Input placeholder="Password" type="password" {...field} />
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
	);
}
