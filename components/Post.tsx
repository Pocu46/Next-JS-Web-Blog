"use client"

import Button from "@/UI/Button";
import React from "react";
import Image from "next/image";
import {useMutation} from "@tanstack/react-query";
import Error from "@/components/Error";
import {postActionProps} from "@/utils/models";
import {postAction, queryClient, sendPost} from "@/utils/http";
import Loader from "@/components/Loader";

type PostProps = {
  id: string,
  summary: string,
  time: string,
  type: string,
  text: string,
  isFavorite: boolean
}
const Post: React.FC<PostProps> = ({id, summary, time, type, text, isFavorite}) => {
  const {mutate: postActionHandler, isPending, isError, error} = useMutation<void, Error, postActionProps, unknown>({
    mutationKey: ['favoriteStatusChange'],
    mutationFn: postAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true
      });
    }
  })

  const favoriteStatusChangeHandler = () => {
    postActionHandler({id, summary, time, type, text, isFavorite, method: "PUT"})
  }

  const deletePostHandler = () => {
    const confirm: boolean = window.confirm("Are you sure you want to delete this article?")

    if(confirm) {
      postActionHandler({id, summary, time, type, text, isFavorite, method: "DELETE"})
    }
  }

  const typeClass: string = type === 'Note'
    ? 'bg-[white] text-[green] w-[63px] h-9 text-center flex justify-center items-center text-[large] mx-[15px] my-0 rounded-[5px]'
    : 'bg-[white] text-[#c6c601] w-[63px] h-9 text-center flex justify-center items-center text-[large] mx-[15px] my-0 rounded-[5px]'

  // if(isPending) return <Loader />
  // if(isError) return <Error error={error} reset={() => {}} />

  return(
    <div className="w-full mx-auto mb-2 border-[3px] rounded-xl border-solid border-[#bccde2]">
        <header className="bg-[#bccde2] py-2 flex justify-around items-center">
          <p className="max-w-[150px]">{time}</p>
          <p className="w-[150px] h-[25px] overflow-y-hidden">
            <b>{summary}</b>
          </p>
          <div className="flex justify-between items-center">
            <span className={typeClass}>{type}</span>
            <Image
              className="w-[25px] h-[25px]"
              src={isFavorite ? "/star (2).png" : "/star.png"}
              alt="favorite-icon"
              width={25}
              height={25}
            />
          </div>
        </header>

        <p className="flex justify-around items-center text-left h-[150px] overflow-auto pt-2.5 px-[5px] py-0 bg-[white]">{text}</p>

        <footer className="bg-[#bccde2] flex justify-center items-center py-2">
          <Button
            type="button"
            action={() => {}}
            text="Edit"
            style="btn-primary bg-[#528fd9]"
            link="/post/posts"
            isButton={true}
          />
          <Button
            type="button"
            action={deletePostHandler}
            text="Delete"
            style="btn-primary bg-[#de5050] mx-3"
            link="/post/posts"
            isButton={true}
          />
          <Button
            type="button"
            action={favoriteStatusChangeHandler}
            text={!isFavorite ? 'Favorite' : 'Unfavorite'}
            style={!isFavorite ? "btn-primary bg-[#dede01]" : "btn-primary bg-[gold]"}
            link="/post/posts"
            isButton={true}
          />
        </footer>
    </div>
  )
}

export default Post;