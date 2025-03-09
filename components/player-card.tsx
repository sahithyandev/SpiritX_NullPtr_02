import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	aOrAn,
	displayPlayerCategory,
	roundToNearestMultipleOf,
} from "@/lib/utils";
import type React from "react";

export type PlayerCardProps = {
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
		wickets: number | null;
	};
	isAdmin: boolean;
} & (
	| {
			variant?: "normal";
	  }
	| {
			selected?: boolean;
			variant: "selectable";
	  }
);

function playerDescription(
	player: PlayerCardProps["data"],
	variant: PlayerCardProps["variant"] = "normal",
): string {
	if (variant === "selectable" && player.from_university) {
		return `From ${player.from_university.name}`;
	}
	if (player.category && player.from_university) {
		return `${displayPlayerCategory(player.category)} from ${player.from_university.name}`;
	}
	return "";
}

function DetailedPlayerDescription({
	data,
}: { data: PlayerCardProps["data"] }) {
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

export default function PlayerCard({
	data,
	isAdmin = false,
	variant = "normal",
	...otherProps
}: PlayerCardProps) {
	let isSelected = false;
	if (
		variant === "selectable" &&
		"selected" in otherProps &&
		otherProps.selected
	) {
		isSelected = otherProps.selected;
	}

	let batting_strike_rate: number | undefined = undefined;
	if (!data.total_runs) {
		batting_strike_rate = 0;
	} else if (data.balls_faced) {
		batting_strike_rate = (100 * data.total_runs) / data.balls_faced;
	}
	let batting_average = undefined;
	if (!data.total_runs) {
		batting_average = 0;
	} else if (data.innings_played) {
		batting_average = data.total_runs / data.innings_played;
	}
	let bowling_strike_rate = undefined;
	if (!data.overs_bowled) {
		bowling_strike_rate = 0;
	} else if (data.wickets) {
		bowling_strike_rate = (data.overs_bowled * 6) / data.wickets;
	}
	let economy_rate = undefined;
	if (!data.runs_conceded) {
		economy_rate = 0;
	} else if (data.overs_bowled) {
		economy_rate = data.runs_conceded / data.overs_bowled;
	}
	let player_points = 0;
	let player_value: number | undefined = undefined;
	if (batting_strike_rate && batting_average) {
		player_points = batting_strike_rate / 5 + batting_average * 0.8;
	}
	if (
		economy_rate !== undefined &&
		economy_rate !== 0 &&
		bowling_strike_rate !== undefined &&
		bowling_strike_rate !== 0
	) {
		player_points += 140 / economy_rate + 500 / bowling_strike_rate;
	}
	player_value = roundToNearestMultipleOf(
		(9 * player_points + 100) * 1000,
		50000,
	);

	if (variant === "normal") {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Card className="w-full mx-auto shadow-lg rounded-lg hover:border-2 border cursor-pointer hover:border-red-200">
						<CardContent className="mt-0">
							<h2 className="text-xl mb-2 font-semibold">{data.name}</h2>

							<p>
								{playerDescription(data)}
								<br />

								{typeof player_value === "undefined" ? null : (
									<>
										<span>Budget: </span>
										<b>{player_value}</b>
									</>
								)}
							</p>
						</CardContent>
					</Card>
				</DialogTrigger>
				<DialogContent className="text-lg text-foreground">
					<DialogHeader>
						<DialogTitle className="text-3xl" asChild>
							<h2>{data.name}</h2>
						</DialogTitle>
					</DialogHeader>
					<DetailedPlayerDescription data={data} />

					<h3 className="mt-4 mb-2 text-xl">Stats</h3>
					<table className="w-full player-card-table">
						<tbody>
							{typeof player_value === "undefined" ? null : (
								<tr>
									<td>Player Value</td>
									<td>{player_value}</td>
								</tr>
							)}
							{isAdmin ? (
								<>
									{typeof player_points === "undefined" ? null : (
										<tr>
											<td>Player Points</td>
											<td>{Math.floor(10 * player_points) / 10}</td>
										</tr>
									)}
									{typeof batting_strike_rate === "undefined" ? null : (
										<tr>
											<td>Batting Strike Rate</td>
											<td>{Math.floor(10 * batting_strike_rate) / 10}</td>
										</tr>
									)}
									{typeof batting_average === "undefined" ? null : (
										<tr>
											<td>Batting Average</td>
											<td>{Math.floor(10 * batting_average) / 10}</td>
										</tr>
									)}
									{typeof bowling_strike_rate === "undefined" ? null : (
										<tr>
											<td>Bowling Strike Rate</td>
											<td>{Math.floor(10 * bowling_strike_rate) / 10}</td>
										</tr>
									)}
									{typeof economy_rate === "undefined" ? null : (
										<tr>
											<td>Economy Rate</td>
											<td>{Math.floor(10 * economy_rate) / 10}</td>
										</tr>
									)}
								</>
							) : null}
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
						</tbody>
					</table>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Card
			className={`w-full mx-auto shadow-lg rounded-lg hover:border-2 border hover:bg-red-200/10 cursor-pointer player-card ${isSelected ? "outline outline-red-300" : ""}`}
			data-id={data.id}
			data-value={player_value}
		>
			<CardContent className="mt-0">
				<h2 className="text-xl mb-2 font-semibold">{data.name}</h2>

				<p>
					{playerDescription(data, "selectable")}
					<br />

					{typeof player_value === "undefined" ? null : (
						<>
							<span>Budget: </span>
							<b>{player_value.toLocaleString("en-GB")}</b>
						</>
					)}
				</p>

				<div>
					<Dialog>
						<DialogTrigger className="mt-6 cursor-pointer">
							More Details
						</DialogTrigger>
						<DialogContent className="text-lg text-foreground">
							<DialogHeader>
								<DialogTitle className="text-3xl" asChild>
									<h2>{data.name}</h2>
								</DialogTitle>
							</DialogHeader>
							<DetailedPlayerDescription data={data} />

							<h3 className="mt-4 mb-2 text-xl">Stats</h3>
							<table className="w-full player-card-table">
								<tbody>
									{typeof player_value === "undefined" ? null : (
										<tr>
											<td>Player Value</td>
											<td>{player_value.toLocaleString("en-GB")}</td>
										</tr>
									)}
									{isAdmin ? (
										<>
											{typeof player_points === "undefined" ? null : (
												<tr>
													<td>Player Points</td>
													<td>{Math.floor(10 * player_points) / 10}</td>
												</tr>
											)}
											{typeof batting_strike_rate === "undefined" ? null : (
												<tr>
													<td>Batting Strike Rate</td>
													<td>{Math.floor(10 * batting_strike_rate) / 10}</td>
												</tr>
											)}
											{typeof batting_average === "undefined" ? null : (
												<tr>
													<td>Batting Average</td>
													<td>{Math.floor(10 * batting_average) / 10}</td>
												</tr>
											)}
											{typeof bowling_strike_rate === "undefined" ? null : (
												<tr>
													<td>Bowling Strike Rate</td>
													<td>{Math.floor(10 * bowling_strike_rate) / 10}</td>
												</tr>
											)}
											{typeof economy_rate === "undefined" ? null : (
												<tr>
													<td>Economy Rate</td>
													<td>{Math.floor(10 * economy_rate) / 10}</td>
												</tr>
											)}
										</>
									) : null}
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
								</tbody>
							</table>
						</DialogContent>
					</Dialog>
				</div>
			</CardContent>
		</Card>
	);
}
