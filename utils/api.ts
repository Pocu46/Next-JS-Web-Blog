import {PostsData} from "@/utils/models";

export const getData = async ():Promise<PostsData> => {
  // const url: string = `${DOMEN}/posts.json`
  const url: string = 'https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app/posts.json'

  const res = await fetch(url,{ cache: 'force-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}