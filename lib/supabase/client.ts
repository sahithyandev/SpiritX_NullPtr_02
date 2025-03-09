import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./env";
import type { Database } from "./types";

export function createClient() {
	// Create a supabase client on the browser with project's credentials
	return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
