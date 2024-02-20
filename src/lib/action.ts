"use server";

import { signInSchema } from "@/lib/zod-schema";
import { z } from "zod";

export async function signInAction(data: z.infer<typeof signInSchema>) {
	console.log(data);
}
