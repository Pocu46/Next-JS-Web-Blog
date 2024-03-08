"use client"

import Post from "@/components/Post";
import {getPostsUI} from "@/utils/api";
import {PostType} from "@/utils/models";
import type {Metadata} from "next";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Error from "@/components/Error";

// export const metadata: Metadata = {
//   title: "Posts list",
// };

const Posts = () => {
  const {data, error, isError, isPending} = useQuery({
    queryKey: ['posts'],
    queryFn: getPostsUI,
    refetchOnWindowFocus: false,
  })

  const posts: PostType[] = []

  for (let key in data) {
    posts.push({
      id: key,
      summary: data[key].summary,
      text: data[key].text,
      type: data[key].type,
      time: data[key].time,
      isFavorite: data[key].isFavorite
    })
  }

  const postsReverse: PostType[] = posts.reverse()

  if (data && postsReverse.length === 0 && !error) {
    return (
      <p className="text-center text-4xl text-[#14077c] w-full">No data is added to Posts!</p>
    )
  }
  if (isPending) return <Loader/>
  if (isError) return <Error error={error}/>

  return (
    <>
      <ul className="h-[calc(100vh_-_64px_-_64px)] overflow-y-scroll">
        {postsReverse.map(post => {
          return (
            <li key={post.id}>
              <Post
                id={post.id}
                time={post.time}
                summary={post.summary}
                text={post.text}
                type={post.type}
                isFavorite={post.isFavorite}
                page="lists"
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Posts;