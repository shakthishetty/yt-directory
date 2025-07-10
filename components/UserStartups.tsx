import { client } from "@/sanity/lib/client";
import { Startup_BY_Querie } from "@/sanity/lib/queries";
import StartupCard from "./StartupCard";

interface UserStartupsProps {
  id: string;
}

export default async function UserStartups({id}: UserStartupsProps) {
    const startups = await client.fetch(Startup_BY_Querie,{id})
  return (
   <>
     {startups?.length > 0 ? startups.map((startup: any) => (
        <StartupCard key={startup._id} post={startup}/>
     )) : (
        <p className="no-result">No posts yet</p>
     )}
   </>
  )
}