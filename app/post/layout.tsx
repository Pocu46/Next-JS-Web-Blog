import React from "react";
import PostsHeader from "@/components/PostsHeader";

const Posts = ({children}: { children: React.ReactNode }) => {
  return (
    <div className="h-[calc(100vh_-_64px)] w-full flex items-center flex-col">
      <PostsHeader />

      {children}
    </div>
  )
}

export default Posts;
