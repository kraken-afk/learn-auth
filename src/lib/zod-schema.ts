import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const signUpSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6),
		confirmPassword: z.string().min(6),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
