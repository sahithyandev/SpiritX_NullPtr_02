import Leaderboard from "@/components/leaderboard";
import Nav from "@/components/nav";
import SectionTitle from "@/components/section-title";
import { StatsCard } from "@/components/stat-card";
import TournamentSummary from "@/components/tournament-summary";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type React from "react";

export default async function Home() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error || !data?.user) {
		redirect("/auth/login");
	}
	const username = data.user.user_metadata.email.replace("@spirit11.com", "");
	const { data: userData, error: userError } = await supabase
		.from("users")
		.select()
		.eq("username", username)
		.single();

	if (userError) {
		console.log(userError);
		redirect("/error");
	}

	return (
		<main>
			<Nav title={`Hello ${username}!`} isAdmin={userData.is_admin} />

			<section>
				<SectionTitle>Your Account</SectionTitle>
				<div className="flex gap-3">
					<StatsCard title="Your Balance" value={userData.account_balance} />
					<StatsCard title="Your Team" value={"0 / 11"} />
				</div>
			</section>

			<Leaderboard />
			{userData.is_admin ? <TournamentSummary /> : null}
		</main>
	);
}
