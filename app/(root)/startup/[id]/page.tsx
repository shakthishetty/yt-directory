import StartupCard, { StartupTypeCard } from "@/components/StartupCard"
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View"
import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { START_BY_ID_QUERY } from "@/sanity/lib/queries"
import MarkdownIt from "markdown-it"
import Image from "next/image"
import Link from "next/link"

import { notFound } from "next/navigation"
import { Suspense } from "react"

export const experimental_ppr = true
const md = MarkdownIt();

const page = async({params}:{params:Promise<{id:string}>}) => {

    const id = (await params).id

    // const post = await client.fetch(START_BY_ID_QUERY,{id})


    // For now, just fetch recent startups instead of relying on playlist
    const [post, recentStartups] = await Promise.all([
    client.fetch(START_BY_ID_QUERY, { id }),
    client.fetch(`*[_type == "startup" && _id != $id] | order(_createdAt desc)[0...3]{
      _id,
      _createdAt,
      title,
      slug,
      author->{
        _id,
        name,
        slug,
        image,
        bio
      },
      views,
      description,
      category,
      image,
      pitch
    }`, { id }),
  ]);

  // You can uncomment this and remove the above when you create the playlist
  // const [post, editorPicksResult] = await Promise.all([
  //   client.fetch(START_BY_ID_QUERY, { id }),
  //   client.fetch(PLAYLIST_BY_SLUG_QUERY, {
  //     slug: "editor-picks-new",
  //   }),
  // ]);

  const editorPosts = recentStartups || [];


    if(!post){
        return notFound();
    }

    const parsedContent = md.render(post?.pitch || "");
  return (
    <>
    <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
    </section>

    <section className="section_container">
<img src={post.image} alt="image" className="rounded-xl w-full h-auto"/>

  <div className="space-y-5 mt-10 max-w-4xl max-auto">
     <div className="flex-between gap-3">
                <Link href={`/user/${post.author?._id}`}
                  className="flex gap-2 items-center mb-3"
                >
                   <Image src={post.author.image} alt="avatar"
                   width={64}
                   height={64}
                    className="rounded-full object-cover drop-shadow-lg"
                   />

                   <div>
                      <p className="text-20-medium">{post.author.name}</p>
                       <p className="text-16-medium !text-black-300">@{post.author.username}</p>
                   </div>
                </Link>

                <p className="category-tag">{post.category}</p>

     </div>
     <h3 className="text-30-bold">Pitch Details</h3>
       {parsedContent ? (
        <article dangerouslySetInnerHTML={{__html:parsedContent}}
         className="prose max-w-4xl font-work-sans break-all"
        />
       ):(
<p className="no-result">No details provided</p>
       )}
  </div>
  <hr className="divider"/>

  
        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">You May Also Like</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={post._id || i} post={post} />
              ))}
            </ul>
          </div>
        )}
  <Suspense fallback={<Skeleton className="view_skeleton"/>}>
    {/* @ts-expect-error Async Server Component */}
    <View id={id}/>
  </Suspense>
    </section>
    
    </>
  )
}

export default page