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

export default async function Leaderboard() {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("users")
		.select()
		.order("account_balance", { ascending: false })
		.limit(15);

	if (error) {
		return <p>An error occurred</p>;
	}

	return (
		<section>
			<SectionTitle>Leaderboard</SectionTitle>
			<Table className="text-base">
				<TableHeader>
					<TableRow>
						<TableHead>Rank</TableHead>
						<TableHead>Username</TableHead>
						<TableHead className="text-right">Points</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((user, index) => (
						<TableRow key={user.username}>
							<TableCell className="font-medium">{index + 1}</TableCell>
							<TableCell>{user.username}</TableCell>
							<TableCell className="text-right">{user.points}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}
