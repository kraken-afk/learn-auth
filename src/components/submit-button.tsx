"use client";

import { ButtonProps, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { PropsWithChildren } from "react";

export function SubmitButton(
	props: PropsWithChildren<ButtonProps & { pending: boolean }>,
) {
	const { pending, className, ...attributues } = props;

	return (
		<Button
			aria-disabled={pending}
			className={cn("min-w-24", className)}
			{...attributues}
		>
			{pending ? (
				<Loader2 className="fill-slate-800 animate-spin" />
			) : (
				props.children
			)}
		</Button>
	);
}
