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
import { signUpAction } from "@/lib/action";
import { signUpSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export function SignUpForm() {
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	const submitHandler = async (data: z.infer<typeof signUpSchema>) =>
		await signUpAction(data);
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
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem className="my-4">
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input placeholder="Password" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className=" float-end my-4" type="submit">
					Sign up
				</Button>
			</form>
		</Form>
	);
}
