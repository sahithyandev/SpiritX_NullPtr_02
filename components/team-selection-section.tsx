"use client";

import { displayPlayerCategory } from "@/lib/utils";
import PlayerCard, { type PlayerCardProps } from "./player-card";
import SectionTitle from "./section-title";
import { Button } from "./ui/button";
import { useState } from "react";
import { StatsCard } from "./stat-card";
import { redirect } from "next/navigation";

interface Props {
	groupedPlayers: Array<[string, Array<PlayerCardProps["data"]>]>;
	selectedPlayers: Array<number>;
	accountBalance: number;
	points: number;
	isAdmin: boolean;
}

export default function TeamSelectionSection(props: Props) {
	const [selectedPlayers, setSelectedPlayers] = useState<Array<number>>(
		props.selectedPlayers,
	);
	const [accountBalance, setAccountBalance] = useState(props.accountBalance);
	const [points, setPoints] = useState(props.points);

	const savePlayers = async () => {
		const response = await fetch("/select-your-team/update", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				selectedPlayers,
				accountBalance,
				points,
			}),
		});
		const data = await response.text();
		if (data === "Success") {
			redirect("/");
		}
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<section
			onClick={(e) => {
				const target = e.target;
				if (
					!(target instanceof HTMLElement) ||
					target instanceof HTMLButtonElement
				)
					return;
				const closest = target.closest(".player-card");
				if (
					!(closest instanceof HTMLElement) ||
					closest.dataset.id === undefined ||
					closest.dataset.value === undefined ||
					closest.dataset.points === undefined
				)
					return;
				const id = Number.parseInt(closest.dataset.id, 10);
				const playerValue = Number.parseInt(closest.dataset.value, 10);
				const playerPoints = Number.parseInt(closest.dataset.points, 10);
				if (
					Number.isNaN(id) ||
					Number.isNaN(playerValue) ||
					Number.isNaN(playerPoints)
				)
					return;

				const indexOfPlayer = selectedPlayers.indexOf(id);
				if (indexOfPlayer === -1 && selectedPlayers.length < 11) {
					// player not already selected
					setSelectedPlayers((selectedPlayers) => [...selectedPlayers, id]);
					setAccountBalance((accountBalance) => accountBalance - playerValue);
					setPoints((points) => points + playerPoints);
				} else if (indexOfPlayer !== -1 && selectedPlayers.length <= 11) {
					// player already selected
					setAccountBalance((accountBalance) => accountBalance + playerValue);
					setSelectedPlayers((selectedPlayers) =>
						selectedPlayers.filter((playerId) => playerId !== id),
					);
					setPoints((points) => points - playerPoints);
				}
			}}
		>
			<div className="flex items-center gap-4">
				<SectionTitle className="mr-auto">Select Your Team</SectionTitle>
				<Button onClick={savePlayers} type="button" className="cursor-pointer">
					Save
				</Button>
			</div>
			<p>The changes you make here are not saved automatically.</p>

			<div className="my-4 flex gap-4 sticky top-5">
				<StatsCard title="Your Balance" value={accountBalance} />
				<StatsCard
					title="Selected Players"
					value={`${selectedPlayers.length} / 11`}
				/>
			</div>

			{props.groupedPlayers.map(([category, players]) =>
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
									isAdmin={props.isAdmin}
									variant="selectable"
									selected={selectedPlayers.includes(player.id)}
								/>
							))}
						</div>
					</div>
				),
			)}
		</section>
	);
}
