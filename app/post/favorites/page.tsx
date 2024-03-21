"use client"

import {PostsType} from "@/utils/models";
import {getPostsUI} from "@/utils/http";
import Post from "@/components/Post";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Error from "@/components/Error";

const Favorites = async () => {
  const {data, error, isError, isPending} = useQuery({
    queryKey: ['posts'],
    queryFn: getPostsUI,
    refetchOnWindowFocus: false,
  })

  const posts: PostsType[] = []

  for (let key in data) {
    if (data[key].isFavorite) {
      posts.push({
        id: key,
        summary: data[key].summary,
        text: data[key].text,
        type: data[key].type,
        time: data[key].time,
        isFavorite: data[key].isFavorite
      })
    }
  }

  const postsReverse: PostsType[] = posts.reverse()

  if (posts.length === 0) return <p className="text-center text-4xl text-[#14077c]">No data is added to Favorites!</p>
  if (isPending) return <Loader/>
  if (isError) return <Error reset={() => {}} error={error}/>

  return (
    <ul className="post-lists__container h-[calc(100vh_-_64px_-_64px)] overflow-y-scroll">
      {postsReverse.map(post => {
        return (
          <li key={post.id} className="post-lists__item">
            <Post
              id={post.id}
              time={post.time}
              summary={post.summary}
              text={post.text}
              type={post.type}
              isFavorite={post.isFavorite}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default Favorites;