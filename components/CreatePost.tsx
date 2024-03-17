"use client"

import React, {useRef, useState} from "react";
import Button from "@/UI/Button";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {queryClient, sendPost} from "@/utils/http";
import {PostType} from "@/utils/models";

const CreatePost: React.FC = () => {
  const [summary, setSummary] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [type, setType] = useState<PostType | string>('')
  const [summaryError, setSummaryError] = useState<boolean>(false);
  const [textError, setTextError] = useState<boolean>(false);
  const summaryRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const router = useRouter()

  const {mutate, isPending, isError, error} = useMutation<void, [string, string, PostType]>({
    mutationFn: sendPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true
      });
      router.replace('/post/posts')
      // router.push('/post/posts')
    }
  });

  const summaryHandler = (event: React.ChangeEventHandler<HTMLInputElement>) => {
    const timer = setTimeout(() => {
      setSummary(event.target.value)
    }, 1500)

    return () => clearTimeout(timer)
  }

  const textHandler = (event: React.ChangeEventHandler<HTMLTextAreaElement>) => {
    const timer = setTimeout(() => {
      setText(event.target.value)
    }, 1500)

    return () => clearTimeout(timer)
  }

  const typeHandler = (event: React.ChangeEventHandler<HTMLSelectElement>) => {
    setType(event.target.value)
  }

  const createPostHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate(summaryRef.current.value, textRef.current.value, typeRef.current.value);
  };

  const summaryStyles: string = summaryError ? "w-full px-3 py-1.5 bg-[#e5b6c0] rounded-md border-2 border-solid border-[red]" : "w-full px-3 py-1.5 rounded-md border-2 border-solid border-[#99aec3]"
  const textStyles: string = textError ? "w-full px-3 py-1.5 bg-[#e5b6c0] rounded-md border-2 border-solid border-[red]" : "w-full px-3 py-1.5 rounded-md border-2 border-solid border-[#99aec3]"

  const summaryBlurHandler = () => {
    if (summaryRef.current.value && summaryRef.current.value.trim().length < 3) {
      setSummaryError(true);
    }
    if (summaryError && summaryRef.current.value && summaryRef.current.value.trim().length > 3) {
      setSummaryError(false);
    }
  }

  const textBlurHandler = () => {
    if (textRef.current.value && textRef.current.value.trim().length < 5) {
      setTextError(true);
    }
    if (textError && textRef.current.value && textRef.current.value.trim().length >= 5) {
      setTextError(false);
    }
  }

  return (
    <form className="w-full" onSubmit={createPostHandler}>
      <h2 className="text-center text-3xl font-[500] leading-[1.2] mb-2">Create New Post</h2>

      <div className="my-2 flex flex-col">
        <label htmlFor="summary" className="mb-2">Summary *</label>
        <input
          id="summary"
          name="summary"
          type="text"
          ref={summaryRef}
          // defaultValue={summary}
          onChange={summaryHandler}
          onBlur={summaryBlurHandler}
          className={summaryStyles}
          placeholder="Enter your summary"
        />
        {summaryError && <p className="text-[red]">The Summary field should have at least 3 characters</p>}
      </div>
      <div className="mb-2 flex flex-col">
        <label htmlFor="text" className="mb-2">Text *</label>
        <textarea
          id="text"
          name="text"
          ref={textRef}
          // defaultValue={text}
          onChange={textHandler}
          onBlur={textBlurHandler}
          className={textStyles}
          placeholder="Enter your article text"
        />
        {textError && <p className="text-[red]">The Text field should have at least 5 characters</p>}
      </div>

      <div className="w-full my-2 flex flex-row rounded-md border-2 border-solid border-[#99aec3]">
        <select
          name="type"
          onChange={typeHandler}
          ref={typeRef}
          className="w-full px-3 py-1.5"
        >
          <option value="Note">Note</option>
          <option value="News">News</option>
        </select>
        <label className="w-[100px] px-3 py-1.5 border-l-2 border-solid border-[#99aec3]">Options</label>
      </div>

      <Button
        text="Create"
        style="btn-primary mt-5 bg-[#88bddd] m-auto"
        link="/post/posts"
        type="submit"
        isButton={true}
      />
    </form>
  );
};

export default CreatePost;
