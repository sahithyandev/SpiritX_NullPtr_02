import Nav from "@/components/nav";
import SectionTitle from "@/components/section-title";
import { StatsCard } from "@/components/stat-card";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type React from "react";

export default async function Home() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error || !data?.user) {
		redirect("/auth/login");
	}

	return (
		<main>
			<Nav />

			<section>
				<SectionTitle>Your Account</SectionTitle>
				<div className="flex gap-3">
					<StatsCard title="Your Balance" value={9000000} />
					<StatsCard title="Your Team" value={"7 / 11"} />
				</div>
			</section>

		</main>
	);
}
