import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

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

export default function PlayerCard({ data }: PlayerCardProps) {
	return (
		<Card className="w-full mx-auto shadow-lg rounded-lg hover:border-2 border cursor-pointer hover:border-red-200">
			<CardContent className="mt-0">
				<h2 className="text-xl mb-2 font-semibold">{data.name}</h2>

				<p>{playerDescription(data)}</p>
			</CardContent>
		</Card>
	);
}
