"use client";

// Realtime is not yet ready
// issue: join with university table

import { useState } from "react";
import type { PlayerCardProps } from "./player-card";
import PlayerCard from "./player-card";

interface Props {
	players: Array<PlayerCardProps["data"]>;
	isAdmin?: boolean;
}

export default function RealtimePlayersSection({
	players,
	isAdmin = false,
}: Props) {
	// const [realtimePlayers, setRealtimePlayers] =
	// 	useState<Array<PlayerCardProps["data"]>>(players);

	// useEffect(() => {
	// 	const allChanges = supabase
	// 		.channel("schema-db-changes")
	// 		.on(
	// 			"postgres_changes",
	// 			{
	// 				table: "players",
	// 				event: "*",
	// 				schema: "public",
	// 			},
	// 			(payload) => {
	// 				console.log(payload);
	// 				const oldPlayerId = (payload.old as { id: number }).id;
	// 				if (typeof oldPlayerId !== "number") return;

	// 				setRealtimePlayers((prev) => {
	// 					const newPlayers = [...prev];

	// 					const playerIndex = newPlayers.findIndex(
	// 						(player) => player.id === oldPlayerId,
	// 					);
	// 					console.log(playerIndex);

	// 					if (playerIndex === -1) {
	// 						newPlayers.push(payload.new as PlayerCardProps["data"]);
	// 					} else {
	// 						newPlayers[playerIndex] = payload.new as PlayerCardProps["data"];
	// 					}
	// 					return newPlayers;
	// 				});
	// 			},
	// 		)
	// 		.subscribe();
	// }, []);

	return (
		<section className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3">
			{players.map((player) => (
				<PlayerCard key={player.id} data={player} isAdmin={isAdmin} />
			))}
		</section>
	);
}
