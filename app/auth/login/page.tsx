import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type React from "react";
import { login } from "../actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (!error && data?.user) {
		redirect("/");
	}

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
					<form action={login}>
						<div className="mb-4">
							<label htmlFor="username" className="block text-sm font-medium">
								Username
							</label>
							<Input
								name="username"
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
								name="password"
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
				<CardFooter className="flex justify-between">
					<span>Don't have an account?</span>
					<a href="/auth/signup" className="underline font-semibold">
						Sign up
					</a>
				</CardFooter>
			</Card>
		</main>
	);
}
