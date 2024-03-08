import {PostsData} from "@/utils/models";
import {redirect} from "next/navigation";

export const getPosts = async ():Promise<PostsData> => {
  // const url: string = 'https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
  // const url: string = 'https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app/'

  // const res = await fetch(url,{ cache: 'force-cache' })
  const res = await fetch(process.env.DB_URL,{ cache: 'force-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export const getPostsUI = async ():Promise<PostsData> => {
  const url: string = 'https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app/posts.json'

  const res = await fetch(url)
  // const res = await fetch(process.env.DB_URL)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

