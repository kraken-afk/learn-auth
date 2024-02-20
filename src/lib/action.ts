"use server";

import { signInSchema, signUpSchema } from "@/lib/zod-schema";
import { z } from "zod";

export async function signInAction(data: z.infer<typeof signInSchema>) {
	console.log(data);
}

export async function signUpAction(data: z.infer<typeof signUpSchema>) {
	console.log(data);
}
