"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { lucia } from "@/lib/auth";
import { OptionIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationType = Array<{
	label: string;
	variant: ButtonProps["variant"];
	href: string;
	endpoint: string[];
}>;

export function NavBar() {
	const path = usePathname();
	const buttons: NavigationType = [
		{
			href: "/sign-up",
			label: "Sign up",
			variant: "outline",
			endpoint: ["/"],
		},
		{
			href: "/",
			label: "Sign in",
			variant: "default",
			endpoint: ["/sign-up"],
		},
	];

	return (
		<div className="fixed top-0 w-full">
			<nav className="mx-auto w-11/12 sm:w-4/5 bg-white border border-black p-3 mt-6 rounded-md flex justify-between items-center">
				<span>
					<OptionIcon size={12} className="inline" />
					{"  "}
					{path}
				</span>
				<div className="flex gap-3">
					{buttons
						.filter(({ endpoint }) => endpoint.some((uri) => uri === path))
						.map((data) => (
							<Link href={data.href} key={data.href}>
								<Button variant={data.variant} size={"sm"}>
									{data.label}
								</Button>
							</Link>
						))}
				</div>
			</nav>
		</div>
	);
}
