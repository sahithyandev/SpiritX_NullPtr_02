import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import SectionTitle from "./section-title";
import { createClient } from "@/lib/supabase/server";
import { StatsCard } from "./stat-card";

export default async function TournamentSummary() {
	const supabase = await createClient();
	const { data, error } = await supabase.from("players").select();

	if (error) {
		return <p>An error occurred</p>;
	}

	const { data: tournamentSummary, error: error2 } =
		await supabase.rpc("tournament_summary");

	return (
		<section>
			<SectionTitle>Tournament Summary</SectionTitle>

			{error2 || !tournamentSummary || tournamentSummary.length === 0 ? null : (
				<>
					<div className="grid grid-cols-2 gap-4 mb-5">
						<StatsCard
							title="Overall Runs"
							value={tournamentSummary[0].total_runs}
						/>
						<StatsCard
							title="Overall Wickets"
							value={tournamentSummary[0].total_wickets}
						/>
						<StatsCard
							title="Highest Run Scorer"
							value={`${tournamentSummary[0].top_scorer} (${tournamentSummary[0].top_scorer_runs})`}
						/>
						<StatsCard
							title="Highest Wicket Taker"
							value={`${tournamentSummary[0].top_wicket_taker} (${tournamentSummary[0].top_wicket_taker_wickets})`}
						/>
					</div>
				</>
			)}
		</section>
	);
}
