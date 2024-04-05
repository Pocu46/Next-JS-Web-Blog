"use client"

import Post from "@/components/Post";
import {getPostsUI} from "@/utils/http";
import {PostsType} from "@/utils/models";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import {useEffect, useState} from "react";


const Posts = () => {
  const [filter, setFilter] = useState<string>('All')
  const [filteredArray, setFilteredArray] = useState<PostsType[]>([])
  const {data, error, isError, isPending} = useQuery({
    queryKey: ['posts'],
    queryFn: getPostsUI,
    refetchOnWindowFocus: false,
  })

  const posts: PostsType[] = []

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

  const postsReverse: PostsType[] = posts.reverse()

  const filterHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    let temporaryFilteredArray: PostsType[] = []
    if (filter === 'All') {
      temporaryFilteredArray = [...postsReverse]
    }
    if (filter === 'Notes') {
      temporaryFilteredArray = (postsReverse.filter(post => {
        if (post.type === 'Note') {
          return true
        }
      }))
    }
    if (filter === 'News') {
      temporaryFilteredArray = (postsReverse.filter(post => {
        if (post.type === 'News') {
          return true
        }
      }))
    }
    // if (search.length) {
    //   temporaryFilteredArray = temporaryFilteredArray.filter(post => (post.summary).toLocaleLowerCase().includes(search))
    // }
    setFilteredArray(temporaryFilteredArray)
  }, [filter, data])

  if (data && postsReverse.length === 0 && !error) return <p className="text-center text-4xl text-[#14077c] w-full">No
    data is added to Posts!</p>
  if (isPending) return <Loader/>
  if (isError) return <Error reset={() => {}} error={error}/>

  return (
    <ul className="h-[calc(100vh_-_64px_-_64px)] w-full overflow-y-scroll">
      <select onClick={filterHandler} className="w-[200px] my-2 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm" data-testid="dropdown-select">
        <option>All</option>
        <option>Notes</option>
        <option>News</option>
      </select>

      {filteredArray.map(post => {
        return (
          <li key={post.id}>
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

export default Posts;