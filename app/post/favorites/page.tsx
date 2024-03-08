import {PostsData, PostType} from "@/utils/models";
import {getPosts} from "@/utils/api";
import Post from "@/components/Post";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Favorites posts",
};

const Favorites = async () => {
  const data: PostsData = await getPosts()
  const posts: PostType[] = []

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

  const postsReverse: PostType[] = posts.reverse()

  let isEmpty: boolean = false

  if(posts.length === 0) {
    isEmpty = true
  }

  return (
    <>
      {isEmpty && <p className="text-center text-4xl text-[#14077c]">No data is added to Favorites!</p>}

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
                page="lists"
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Favorites;