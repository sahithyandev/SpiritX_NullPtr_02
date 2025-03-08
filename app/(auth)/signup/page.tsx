import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type React from "react";

export default function SignupPage() {
	return (
		<div className="flex gap-6 flex-col items-center justify-center min-h-screen">
			<div>
				<h1 className="text-4xl font-bold">Welcome to Spirit11</h1>
				<p className="text-lg">Made by team NullPtr</p>
			</div>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<h2 className="text-2xl font-bold">Sign Up</h2>
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
						<div className="mb-6">
							<label
								htmlFor="confirm-password"
								className="block text-sm font-medium"
							>
								Confirm Password
							</label>
							<Input
								id="confirm-password"
								type="password"
								placeholder="Enter your password"
								className="mt-1 block w-full"
							/>
						</div>
						<Button type="submit" className="w-full">
							Sign Up
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
