import { auth } from "@/auth";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch } from "@/sanity/lib/live";
import { Startup_Queries } from "@/sanity/lib/queries";
import SearchForm from "../../components/SearchForm";

export default async function Home({searchParams}:{
  searchParams: Promise<{query?:string}>

}) {
  const query = (await searchParams).query

  const params = {search:query || null}

  const session = await auth();

  console.log(session?.id)

  const {data:post} = await sanityFetch({query:Startup_Queries,params})
  


  return (
  
  <>
    <section className="pink_container">
      <h1 className="heading">
        pitch  your startup,<br />connect with entrepreneurs
      </h1>
       <p className="sub-heading !max-w-3xl">
        Submits Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
       </p>

       <SearchForm query={query}/>
    </section>

    <section className="section_container">
               <p className="text-30-semibold">
                {query ?`Search result for ${query}`:'All Startups' }
               </p>

               <ul className="mt-7 card_grid">
            {post?.length > 0 ? (
                 post.map((post:StartupTypeCard,index:number)=>(
                           <StartupCard key={post?._id} post={post}/>
                 ))
            ):(
               <p className="no-results">No startups found</p>
            )}
               </ul>
    </section>

     
   
        </>
  );
}
