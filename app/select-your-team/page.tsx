import Nav from "@/components/nav";
import PlayerCard from "@/components/player-card";
import SectionTitle from "@/components/section-title";
import { createClient } from "@/lib/supabase/server";
import { displayPlayerCategory } from "@/lib/utils";
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
	console.log(groupedPlayers);

	return (
		<main>
			<Nav title={`Hello ${username}!`} isAdmin={userData.is_admin} />

			<section>
				<div className="flex justify-between items-center">
					<SectionTitle>Select Your Team</SectionTitle>
					<span className="text-lg">
						<b>0 / 11</b> players selected
					</span>
				</div>

				{Object.entries(groupedPlayers).map(([category, players]) =>
					players.length === 0 ? null : (
						<div key={category}>
							<h3 className="mt-5 mb-3 text-xl font-semibold">
								{displayPlayerCategory(category)}
							</h3>

							<div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3">
								{players.map((player) => (
									<PlayerCard
										data={player}
										key={player.id}
										isAdmin={userData.is_admin}
									/>
								))}
							</div>
						</div>
					),
				)}
			</section>
		</main>
	);
}
