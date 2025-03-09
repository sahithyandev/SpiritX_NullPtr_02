import Nav from "@/components/nav";
import TeamSelectionSection from "@/components/team-selection-section";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SelectYourTeam() {
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

	const { data: players, error: error2 } = await supabase
		.from("players")
		.select(`
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
	if (error2) {
		redirect("/");
	}

	const { data: _selectedPlayers, error: error3 } = await supabase
		.from("team_members")
		.select("team_member_id")
		.eq("team_owner", username);
	if (error3) {
		redirect("/");
	}

	const selectedPlayers: Array<number> = [];
	for (const player of _selectedPlayers) {
		if (player.team_member_id) selectedPlayers.push(player.team_member_id);
	}

	const groupedPlayers: Record<string, Array<(typeof players)[number]>> = {
		not_grouped: [],
	};

	for (const player of players) {
		if (!player.category) {
			groupedPlayers._.push(player);
			continue;
		}
		if (player.category in groupedPlayers) {
			groupedPlayers[player.category].push(player);
		} else {
			groupedPlayers[player.category] = [player];
		}
	}

	return (
		<main>
			<Nav title={`Hello ${username}!`} isAdmin={userData.is_admin} />

			<TeamSelectionSection
				groupedPlayers={Object.entries(groupedPlayers)}
				selectedPlayers={selectedPlayers}
				isAdmin={userData.is_admin}
				accountBalance={userData.account_balance}
			/>
		</main>
	);
}
