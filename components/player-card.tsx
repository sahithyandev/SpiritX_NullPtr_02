import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { aOrAn } from "@/lib/utils";
import type React from "react";

interface PlayerCardProps {
	data: {
		balls_faced: number | null;
		category: string | null;
		id: number;
		innings_played: number | null;
		is_predefined: boolean | null;
		name: string | null;
		overs_bowled: number | null;
		runs_conceded: number | null;
		total_runs: number | null;
		from_university: {
			name: string;
		} | null;
		wickets: string | null;
	};
}

function displayPlayerCategory(category: string) {
	const words = category.split("_");
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		words[i] = word.charAt(0).toUpperCase().concat(word.slice(1));
	}

	return words.join(" ");
}

function playerDescription(player: PlayerCardProps["data"]): string {
	if (player.category && player.from_university) {
		return `${displayPlayerCategory(player.category)} from ${player.from_university.name}`;
	}
	return "";
}

function DetailedPlayerDescription({ data }: PlayerCardProps) {
	if (data.name && data.category && data.from_university) {
		return (
			<p>
				{data.name} is {aOrAn(displayPlayerCategory(data.category))} from{" "}
				{data.from_university.name}.
			</p>
		);
	}
	return null;
}

export default function PlayerCard({ data }: PlayerCardProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className="w-full mx-auto shadow-lg rounded-lg hover:border-2 border cursor-pointer hover:border-red-200">
					<CardContent className="mt-0">
						<h2 className="text-xl mb-2 font-semibold">{data.name}</h2>

						<p>{playerDescription(data)}</p>
					</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-3xl" asChild>
						<h2>{data.name}</h2>
					</DialogTitle>
				</DialogHeader>
				<DialogDescription className="text-lg text-foreground">
					<DetailedPlayerDescription data={data} />

					<h3 className="mt-4 mb-2 text-xl">Stats</h3>
					<table className="w-full player-card-table">
						<tr>
							<td>Runs</td>
							<td>{data.total_runs}</td>
						</tr>
						<tr>
							<td>Innings Played</td>
							<td>{data.innings_played}</td>
						</tr>
						<tr>
							<td>Balls Faced</td>
							<td>{data.balls_faced}</td>
						</tr>
						<tr>
							<td>Overs Bowled</td>
							<td>{data.overs_bowled}</td>
						</tr>
						<tr>
							<td>Wickets</td>
							<td>{data.wickets}</td>
						</tr>
						<tr>
							<td>Runs Conceded</td>
							<td>{data.runs_conceded}</td>
						</tr>
					</table>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}
