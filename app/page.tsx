import Nav from "@/components/nav";
import SectionTitle from "@/components/section-title";
import { StatsCard } from "@/components/stat-card";
import type React from "react";

export default async function Home() {
	return (
		<main>
			<Nav />

			<section>
				<SectionTitle>Your Account</SectionTitle>
				<div className="flex gap-3">
					<StatsCard title="Your Balance" value={9000000} />
					<StatsCard title="Your Team" value={"7 / 11"} />
				</div>
			</section>

		</main>
	);
}
