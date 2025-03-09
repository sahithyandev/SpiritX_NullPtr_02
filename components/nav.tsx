"use client";

import { createClient } from "@/lib/supabase/client";
import NavLink from "./nav-link";
import PageTitle from "./page-title";
import { redirect } from "next/navigation";

interface NavProps {
	title?: string;
}

export default function Nav({ title }: NavProps) {
	const supabase = createClient();
	return (
		<nav className="flex mt-6 mb-10 justify-between items-center">
			<PageTitle>{title || "Hello!"}</PageTitle>

			<ul className="flex gap-4">
				<NavLink href="/">Home</NavLink>
				<NavLink href="/players">Players</NavLink>
				<button
					className="cursor-pointer hover:underline font-semibold text-lg"
					type="button"
					onClick={() => {
						supabase.auth.signOut();
						redirect("/auth/login");
					}}
				>
					Log out
				</button>
			</ul>
		</nav>
	);
}
