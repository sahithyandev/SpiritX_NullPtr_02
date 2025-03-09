"use client";

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
import { signup } from "../actions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const formSchema = z
	.object({
		username: z.string().min(6, {
			message: "Username must be at least 6 characters long",
		}),
		password: z.string().min(6, {
			message: "Password must be at least 6 characters long",
		}),
		confirmPassword: z.string().min(6, {
			message: "Password must be at least 6 characters long",
		}),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
				path: ["confirmPassword"],
			});
		}
	});

export default function SignupPage() {
	const supabase = createClient();

	// biome-ignore lint/correctness/useExhaustiveDependencies: idk
	useEffect(() => {
		supabase.auth.getUser().then(({ data, error }) => {
			if (!error && data?.user) {
				redirect("/");
			}
		});
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const f = new FormData();
		f.append("username", values.username);
		f.append("password", values.password);

		try {
			const result = await signup(f);
		} catch (error) {
			console.error("An error occured while signup:", error);
		}
	}
	return (
		<main className="flex gap-6 flex-col items-center justify-center min-h-screen">
			<div>
				<PageTitle>Welcome to Spirit11</PageTitle>
				<p className="text-lg">Made by team NullPtr</p>
			</div>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<h2 className="text-2xl font-bold">Sign Up</h2>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							action={signup}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your username"
												className="mt-1 block w-full"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your password"
												className="mt-1 block w-full"
												{...field}
												type="password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Retype your password"
												className="mt-1 block w-full"
												{...field}
												type="password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full cursor-pointer">
								Sign Up
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<span>Already have an account?</span>
					<a href="/auth/login" className="underline font-semibold">
						Login
					</a>
				</CardFooter>
			</Card>
		</main>
	);
}
