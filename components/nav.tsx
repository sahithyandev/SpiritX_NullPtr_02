"use client";

import { createClient } from "@/lib/supabase/client";
import NavLink from "./nav-link";
import PageTitle from "./page-title";
import { redirect } from "next/navigation";

interface NavProps {
	title?: string;
	isAdmin?: boolean;
}

export default function Nav({ title, isAdmin = false }: NavProps) {
	const supabase = createClient();
	return (
		<nav className="flex mt-6 mb-10 justify-between items-center">
			<div>
				<PageTitle>{title || "Hello!"}</PageTitle>
				{isAdmin ? <span>You are signed as an admin.</span> : null}
			</div>

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
