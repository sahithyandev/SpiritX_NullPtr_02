import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	if (
		!body.selectedPlayers ||
		!Array.isArray(body.selectedPlayers) ||
		!body.accountBalance ||
		typeof body.accountBalance !== "number"
	) {
		return new Response("Bad Request", {
			status: 400,
		});
	}
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error || !data?.user || !data.user.email) {
		return new Response("Error while authenticating user", {
			status: 500,
		});
	}
	const username = data.user.email.replace("@spirit11.com", "");

	// delete unselected team members
	const { data: removedOldTeamPlayers, error: error2 } = await supabase
		.from("team_members")
		.delete()
		.eq("team_owner", username)
		.not("team_member_id", "in", `(${body.selectedPlayers.join(",")})`)
		.select();

	if (error2) {
		console.error(error2);
		return new Response("Internal error occurred", {
			status: 500,
		});
	}

	if (removedOldTeamPlayers) {
		console.log(removedOldTeamPlayers);

		for (const player of removedOldTeamPlayers) {
		}
	}

	// insert other team members
	const { data: existingTeamPlayers, error: existingTeamPlayersError } =
		await supabase
			.from("team_members")
			.select("team_member_id")
			.eq("team_owner", username);

	if (existingTeamPlayersError) {
		console.error(existingTeamPlayersError);
		return new Response("Internal error occurred", {
			status: 500,
		});
	}
	console.log(existingTeamPlayers);

	const toInsert: Array<{ team_owner: string; team_member_id: number }> = [];
	for (const player of body.selectedPlayers) {
		const index = existingTeamPlayers.findIndex(
			(p) => player === p.team_member_id,
		);
		if (index === -1) {
			toInsert.push({
				team_owner: username,
				team_member_id: player,
			});
		}
	}

	const { data: insertNewMembers, error: error1 } = await supabase
		.from("team_members")
		.insert(toInsert);
	if (error1) {
		console.error(error1);
		return new Response("Internal error occurred", {
			status: 500,
		});
	}
	const { data: updateBalance, error: error3 } = await supabase
		.from("users")
		.update({
			account_balance: body.accountBalance,
		})
		.eq("username", username);
	if (error3) {
		console.error(error3);
		return new Response("Internal error occurred", {
			status: 500,
		});
	}

	return new Response("Success");
}
