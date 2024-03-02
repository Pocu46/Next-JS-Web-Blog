import {PostsData, PostType} from "@/utils/models";
import {getData} from "@/utils/api";
import Post from "@/components/Post";

const Page = async () => {
  const data: PostsData = await getData()
  const posts: PostType[] = []

  for (let key in data) {
    if (data[key].isFavorite === true) {
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
      {isEmpty && <p className="text-center text-4xl text-[#14077c]">No Posts are added to Favorites!</p>}

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

export default Page;