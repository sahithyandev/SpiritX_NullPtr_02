import Nav from "@/components/nav";
import PlayerCard from "@/components/player-card";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
	const supabase = await createClient();
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
	if (players) {
		console.log(players[0]);
	}

	return (
		<main>
			<Nav />

			<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{players?.map((player) => (
					<PlayerCard key={player.id} data={player} />
				))}
			</section>
		</main>
	);
}
