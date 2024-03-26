import {postActionProps, PostsData, SendPostProps} from "@/utils/models";
import moment from "moment";
import {QueryClient} from "@tanstack/react-query";

export const queryClient:QueryClient = new QueryClient()

export const getPosts = async ():Promise<PostsData> => {
  const url: string = 'https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
  // const url: string = 'https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app/'

  const res = await fetch(url,{ cache: "no-store" })
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

export const sendPost = async ({summary, text, type}: SendPostProps) => {
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
  } catch {
    throw Error('Server doesn\'t available at this moment!')
  }
}

export const postAction = async ({id, summary, text, type, time, isFavorite, method}: postActionProps) => {
  const url: string = `https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`
  let isFavoriteValue: boolean

  if(isFavorite === false) {
    isFavoriteValue = true
  } else {
    isFavoriteValue = false
  }

  let payload = {
    method: method,
    body: JSON.stringify({
      summary: summary.trim(),
      text: text.trim(),
      type,
      isFavorite: isFavoriteValue,
      time
    })
  }

  let message: string = 'Post isn\'t added to Favorites!'

  if (method === 'DELETE') {
    payload = {
      method: method,
      body: JSON.stringify({
        summary: summary.trim(),
        text: text.trim(),
        type,
        isFavorite: isFavoriteValue,
        time
      })
    }
    message = 'The Post isn\'t deleted!'
  }

  try {
    const response = await fetch(url, payload)

    if (!response?.ok) {
      throw Error(message)
    }
  } catch {
    throw Error(message)
  }
}