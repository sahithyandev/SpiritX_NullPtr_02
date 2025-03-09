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
import { redirect } from "next/navigation";

export default async function Leaderboard() {
	const supabase = await createClient();
	const { data: currentUser, error: error1 } = await supabase.auth.getUser();
	if (error1) {
		redirect("/auth/login");
	}
	const { data, error } = await supabase
		.from("users")
		.select()
		.order("points", { ascending: false })
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
						<TableRow
							key={user.username}
							className={`${user.username === currentUser.user.email?.replace("@spirit11.com", "") ? "bg-red-400/20" : ""}`}
						>
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
