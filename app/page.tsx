import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {data: players} = await supabase.from("players").select("*");
  
  return <div>
    {players?.map((player) => (
      <div key={player.id}>
        <h2>{player.name}</h2>
      </div>
    ))}

  </div>;
}
