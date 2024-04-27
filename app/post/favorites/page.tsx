"use client"

import {PostsType} from "@/utils/models";
import {getPostsUI} from "@/utils/http";
import Post from "@/components/Post";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import {Transition} from '@headlessui/react';

const Favorites = () => {
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

  if (data && posts.length === 0 && !error) return (
    <Transition
      appear={true}
      show={true}
      enter="ease-linear duration-700"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
      className="w-full h-full flex justify-center items-center"
    >
      <p className="text-center text-4xl text-[#14077c]">No data is added to Favorites!</p>
    </Transition>
  )
  if (isPending) return <Loader/>
  if (isError) return <Error reset={getPostsUI} error={error}/>

  return (
    <Transition
      appear={true}
      show={true}
      enter="ease-linear duration-700"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
      className="w-full"
    >
      <ul className="post-lists__container h-[calc(100vh_-_64px_-_64px)] overflow-y-scroll">
        {postsReverse.map(post => {
          return (
            <li key={post.id} className="post-lists__item">
              <Transition.Child
                enter="ease-linear duration-700 delay-300"
                enterFrom="opacity-0 scale-80"
                enterTo="opacity-100 scale-100"
                className="w-full"
              >
                <Post
                  id={post.id}
                  time={post.time}
                  summary={post.summary}
                  text={post.text}
                  type={post.type}
                  isFavorite={post.isFavorite}
                />
              </Transition.Child>
            </li>
          )
        })}
      </ul>
    </Transition>
  )
}

export default Favorites;