"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function NavBar() {
	const title = usePathname();
	return (
		<div className="fixed top-0 w-full">
			<nav className="mx-auto w-4/5 bg-white border border-black p-3 mt-6 rounded-md flex justify-between items-center">
				<span>{title}</span>
				<div>
					<Button variant={"outline"} size={"sm"}>
						Sign up
					</Button>
				</div>
			</nav>
		</div>
	);
}
