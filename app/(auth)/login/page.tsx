import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type React from "react";

export default function LoginPage() {
	return (
		<main className="flex gap-6 flex-col items-center justify-center min-h-screen">
			<div>
				<PageTitle>Welcome to Spirit11</PageTitle>
				<p className="text-lg">Made by team NullPtr</p>
			</div>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<h2 className="text-2xl font-bold">Login</h2>
				</CardHeader>
				<CardContent>
					<form>
						<div className="mb-4">
							<label htmlFor="username" className="block text-sm font-medium">
								Username
							</label>
							<Input
								id="username"
								type="text"
								placeholder="Enter your username"
								className="mt-1 block w-full"
							/>
						</div>
						<div className="mb-6">
							<label htmlFor="password" className="block text-sm font-medium">
								Password
							</label>
							<Input
								id="password"
								type="password"
								placeholder="Enter your password"
								className="mt-1 block w-full"
							/>
						</div>
						<Button type="submit" className="w-full">
							Login
						</Button>
					</form>
				</CardContent>
			</Card>
		</main>
	);
}
