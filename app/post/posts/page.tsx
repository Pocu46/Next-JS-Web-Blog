"use client"

import Post from "@/components/Post";
import {getPostsUI} from "@/utils/http";
import {PostsType} from "@/utils/models";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";


const Posts = () => {
  const [filter, setFilter] = useState<string>('All')
  const [filteredArray, setFilteredArray] = useState<PostsType[]>([])
  const [search, setSearch] = useState<string>('')
  const searchRef = useRef<HTMLInputElement>()
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

  let isSearchButtonText: boolean = false

  if (search.length) {
    isSearchButtonText = true
  }

  const filterHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setFilter(event.target.value)
  }

  const searchTextChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch((searchRef.current.value).trim())
  }

  const searchTextChangeHandlerKeyboard: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      // setSearch((event.target.value).trim())
      setSearch((searchRef.current.value).trim())
    }
  }

  const searchTextDeleteHandler = (): void => {
    setSearch('')
    searchRef.current.value = ''
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
    if (search.length) {
      temporaryFilteredArray = temporaryFilteredArray.filter(post => (post.summary).toLocaleLowerCase().includes(search))
    }
    setFilteredArray(temporaryFilteredArray)
  }, [filter, data, search])

  if (data && postsReverse.length === 0 && !error) return <p className="text-center text-4xl text-[#14077c] w-full">No
    data is added to Posts!</p>
  if (isPending) return <Loader/>
  if (isError) return <Error reset={() => {}} error={error}/>

  return (
    <ul className="h-[calc(100vh_-_64px_-_64px)] w-full overflow-y-scroll">
      <div className="w-full flex justify-between gap-[15px]">
        <select onClick={filterHandler}
                className="w-[120px] my-2 cursor-default rounded-lg bg-white py-1 pl-1 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
                data-testid="dropdown-select"
        >
          <option>All</option>
          <option>Notes</option>
          <option>News</option>
        </select>

        <div
          className="bg-[#1e3a8a33] w-full flex justify-around items-center my-2 cursor-default rounded-lg py-1 pl-1 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
        >
          <input
            className="w-full h-[36px] px-1"
            type="text"
            placeholder="Search Post"
            defaultValue={search}
            ref={searchRef}
            onKeyDown={searchTextChangeHandlerKeyboard}
          />

          <div className="w-[46px] flex justify-center">
            <Image
              src={isSearchButtonText ? "/closeButton.svg" : "/searchIcon.svg"}
              alt="close button"
              className="w-[25px] h-[25px]"
              onClick={isSearchButtonText ? searchTextDeleteHandler : searchTextChangeHandler}
              width={25}
              height={25}
            />
          </div>
        </div>
      </div>


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