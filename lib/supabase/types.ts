export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			players: {
				Row: {
					balls_faced: number | null;
					category: string | null;
					created_at: string;
					id: number;
					innings_played: number | null;
					is_predefined: boolean | null;
					name: string | null;
					overs_bowled: number | null;
					runs_conceded: number | null;
					total_runs: number | null;
					university: number | null;
					wickets: number | null;
				};
				Insert: {
					balls_faced?: number | null;
					category?: string | null;
					created_at?: string;
					id: number;
					innings_played?: number | null;
					is_predefined?: boolean | null;
					name?: string | null;
					overs_bowled?: number | null;
					runs_conceded?: number | null;
					total_runs?: number | null;
					university?: number | null;
					wickets?: number | null;
				};
				Update: {
					balls_faced?: number | null;
					category?: string | null;
					created_at?: string;
					id?: number;
					innings_played?: number | null;
					is_predefined?: boolean | null;
					name?: string | null;
					overs_bowled?: number | null;
					runs_conceded?: number | null;
					total_runs?: number | null;
					university?: number | null;
					wickets?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "players_university_fkey";
						columns: ["university"];
						isOneToOne: false;
						referencedRelation: "universities";
						referencedColumns: ["id"];
					},
				];
			};
			team_members: {
				Row: {
					created_at: string;
					id: number;
					team_member_id: number | null;
					team_owner: number | null;
				};
				Insert: {
					created_at?: string;
					id?: number;
					team_member_id?: number | null;
					team_owner?: number | null;
				};
				Update: {
					created_at?: string;
					id?: number;
					team_member_id?: number | null;
					team_owner?: number | null;
				};
				Relationships: [];
			};
			universities: {
				Row: {
					created_at: string;
					id: number;
					name: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					name: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			users: {
				Row: {
					account_balance: number;
					created_at: string;
					is_admin: boolean;
					points: number;
					username: string;
				};
				Insert: {
					account_balance?: number;
					created_at?: string;
					is_admin?: boolean;
					points?: number;
					username: string;
				};
				Update: {
					account_balance?: number;
					created_at?: string;
					is_admin?: boolean;
					points?: number;
					username?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;
