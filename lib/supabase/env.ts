export const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseAnonKey: string =
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (supabaseUrl === "" || supabaseAnonKey === "") {
	throw new Error(
		"Missing env variables NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY",
	);
}
