"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const username = formData.get("username");
	const password = formData.get("password");

	if (typeof username !== "string" || typeof password !== "string") {
		return;
	}

	const data = {
		email: username.concat("@spirit11.com"),
		password,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function signup(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const username = formData.get("username");
	const password = formData.get("password");

	if (typeof username !== "string" || typeof password !== "string") {
		return;
	}

	const { data: e, error } = await supabase.auth.signUp({
		email: username.concat("@spirit11.com"),
		password,
	});

	if (error) {
		redirect("/error");
	}

	const { error: error2 } = await supabase.from("users").insert({
		username,
	});
	if (error2) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}
