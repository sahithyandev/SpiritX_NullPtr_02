import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./env";

export function createClient() {
	// Create a supabase client on the browser with project's credentials
	return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
