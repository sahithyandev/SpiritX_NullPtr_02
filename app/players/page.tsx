import Nav from "@/components/nav";
import RealtimePlayersSection from "@/components/realtime-players-sectino";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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

	const { data: players } = await supabase.from("players").select(`
		id,
		name,
		balls_faced,
		category,
		wickets,
		total_runs,
		runs_conceded,
		overs_bowled,
		is_predefined,
		innings_played,
		from_university:universities (name)
	`);

	return (
		<main>
			<Nav title={`Hello ${username}!`} isAdmin={userData.is_admin} />
			{userData.is_admin ? (
				<p className="text-lg">
					As you are an admin, you can see detailed statistics about the
					players.
				</p>
			) : null}

			{players === null ? null : <RealtimePlayersSection players={players} />}
		</main>
	);
}
