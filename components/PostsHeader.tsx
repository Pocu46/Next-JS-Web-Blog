"use client"

import React from 'react'
import {usePathname} from "next/navigation";
import Link from "next/link";

type PostsHeaderProps = {
  children: React.ReactNode
}

const PostsHeader: React.FC<PostsHeaderProps> = ({children}) => {
  const pathname: string = usePathname()

  return (
    <div className="w-full max-w-md px-2 py-2 sm:px-0">
      <nav className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Link
          href='/post/posts'
          className={`link ${pathname === '/post/posts' 
            ? 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 bg-white text-blue-700 shadow' 
            : 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white'
          }`}
        >
          Posts
        </Link>
        <Link
          href='/post/create'
          className={`link ${pathname === '/post/create'
            ? 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 bg-white text-blue-700 shadow'
            : 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white'
          }`}
        >
          Create
        </Link>
        <Link
          href='/post/favorites'
          className={`link ${pathname === '/post/favorites'
            ? 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 bg-white text-blue-700 shadow'
            : 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white'
          }`}
        >
          Favorites
        </Link>
      </nav>
    </div>
  )
}
export default PostsHeader;