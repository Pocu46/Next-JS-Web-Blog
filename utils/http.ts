import {PostsData, PostType} from "@/utils/models";
import moment from "moment";
import {QueryClient} from "@tanstack/react-query";

export const queryClient:QueryClient = new QueryClient()

export const getPosts = async ():Promise<PostsData> => {
  const url: string = 'https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
  // const url: string = 'https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app/'

  const res = await fetch(url,{ cache: 'force-cache' })
  // const res = await fetch(process.env.DB_URL,{ cache: 'force-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()

  return data
}

export const getPostsUI = async ():Promise<PostsData> => {
  const url: string = 'https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app/posts.json'

  const res = await fetch(url)
  // const res = await fetch(process.env.DB_URL)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()

  return data
}

export const sendPost = async (summary: string, text: string, type: string | PostType) => {
  const url: string = 'https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
  const payload = {
    method: 'POST',
    body: JSON.stringify({
      summary: summary.trim(),
      text: text.trim(),
      type: type,
      isFavorite: false,
      time: moment().format('MMMM Do YYYY, h:mm:ss a')
    })
  }

  try {
    const response = await fetch(url, payload)

    if(!response?.ok) {
      throw Error( 'The Post isn\'t saved!')
    }

    // return response
  } catch {
    throw Error('Server doesn\'t available at this moment!')
  }
}