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
import { SubmitButton } from "@/components/submit-button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function SignInForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const submitHandler = async (data: z.infer<typeof signInSchema>) => {
		const response = (await signInAction(data)) as { status: number };

		switch (response.status) {
			case 200:
				toast({
					title: "You're logged in",
					duration: 2000,
				});
				router.replace("/");
				break;
			case 404:
				toast({
					title: "Email didn't exist",
					duration: 2000,
				});
				break;
			case 401:
				toast({
					title: "Password wrong",
					duration: 2000,
				});
				break;
			default:
				toast({
					title: "Something went wrong",
					duration: 2000,
				});
		}

		if (response.status === 200) {
		}
	};
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
				<SubmitButton
					pending={form.formState.isSubmitting}
					className="float-end my-4"
					type="submit"
				>
					Sign In
				</SubmitButton>
			</form>
		</Form>
	);
}
