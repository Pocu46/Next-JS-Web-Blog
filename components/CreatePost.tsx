"use client"

import React, {useEffect, useRef, useState} from "react";
import Button from "@/UI/Button";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {editPost, queryClient, sendPost} from "@/utils/http";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import {editPostProps, SendPostProps} from "@/utils/models";
import {Transition} from '@headlessui/react';

type CreatePostProps = {
  id?: string;
  summaryValue?: string;
  textValue?: string;
  typeValue?: string;
  isFavorite?: boolean;
  action?: () => void;
  headingText: string;
  buttonText: string;
}

let componentFirstMount: boolean = true

const CreatePost: React.FC<CreatePostProps> = ({
                                                 id,
                                                 summaryValue,
                                                 textValue,
                                                 typeValue,
                                                 isFavorite,
                                                 action,
                                                 headingText,
                                                 buttonText
                                               }) => {
  const [summaryVal, setSummaryVal] = useState<string | undefined>('')
  const [textVal, setTextVal] = useState<string | undefined>('')
  const [summaryError, setSummaryError] = useState<boolean>(false);
  const [textError, setTextError] = useState<boolean>(false);
  const summaryRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const router = useRouter()

  useEffect(() => {
    if (summaryValue && textValue && typeValue && summaryRef.current !== null && textRef.current !== null && typeRef.current !== null) {
      // summaryRef.current.value = summaryValue
      // textRef.current.value = textValue
      setSummaryVal(summaryValue)
      setTextVal(textValue)
      typeRef.current.value = typeValue

      componentFirstMount = false
    }
  }, [])

  // useEffect(() => {
  //   if (summaryVal!.trim().length > 1 && summaryVal!.trim().length < 3 && !componentFirstMount) {
  //     setSummaryError(true);
  //   }
  //   if (summaryVal!.trim().length >= 3 && !componentFirstMount) {
  //     setSummaryError(false);
  //   }
  //   if (textVal!.trim().length > 1  && textVal!.trim().length < 5 && !componentFirstMount) {
  //     setTextError(true);
  //   }
  //   if (textVal!.trim().length >= 5 && !componentFirstMount) {
  //     setTextError(false);
  //   }
  // }, [summaryVal, textVal])

  const {mutate, isPending, isError, error} = useMutation<void, Error, SendPostProps, unknown>({
    mutationKey: ['createPost'],
    mutationFn: sendPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true
      });
      router.replace('/post/posts')
    }
  })
  const {
    mutate: editPostMethod,
    isError: isEditEror,
    error: editEror
  } = useMutation<void, Error, editPostProps, unknown>({
    mutationKey: ['editPost'],
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true
      });
    }
  })

  const createPostHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (summaryVal!.trim().length < 3 && !componentFirstMount) {
      setSummaryError(true);
      return
    }
    if (summaryVal!.trim().length >= 3 && !componentFirstMount) {
      setSummaryError(false);
    }
    if (textVal!.trim().length < 5 && !componentFirstMount) {
      setTextError(true);
      return
    }
    if (textVal!.trim().length >= 5 && !componentFirstMount) {
      setTextError(false);
    }

    mutate({
      // summary: summaryRef.current?.value,
      summary: summaryVal,
      // text: textRef.current?.value,
      text: textVal,
      type: typeRef.current?.value
    });
  };

  const summaryStyles: string = summaryError ? "w-full px-3 py-1.5 bg-[#e5b6c0] rounded-md border-2 border-solid border-[red]" : "w-full px-3 py-1.5 rounded-md border-2 border-solid border-[#99aec3]"
  const textStyles: string = textError ? "w-full px-3 py-1.5 bg-[#e5b6c0] rounded-md border-2 border-solid border-[red]" : "w-full px-3 py-1.5 rounded-md border-2 border-solid border-[#99aec3]"

  // const summaryBlurHandler = () => {
  //   if (summaryRef.current?.value && summaryRef.current.value.trim().length < 3) {
  //     setSummaryError(true);
  //   }
  //   if (summaryError && summaryRef.current?.value && summaryRef.current.value.trim().length >= 3) {
  //     setSummaryError(false);
  //   }
  // }
  //
  // const textBlurHandler = () => {
  //   if (textRef.current?.value && textRef.current.value.trim().length < 5) {
  //     setTextError(true);
  //   }
  //   if (textError && textRef.current?.value && textRef.current.value.trim().length >= 5) {
  //     setTextError(false);
  //   }
  // }

  const summaryChangeHandler = () => {
    setSummaryVal(summaryRef.current?.value)

    componentFirstMount = false
  }

  const textChangeHandler = () => {
    setTextVal(textRef.current?.value)

    componentFirstMount = false
  }

  const editPostHandler = () => {
    editPostMethod({
      id,
      summary: summaryRef.current?.value,
      type: typeRef.current?.value,
      text: textRef.current?.value,
      isFavorite
    })

    action && action()
  }

  if (isPending) return <Loader/>
  if (isError) {
    return (
      <Error reset={() => mutate({
        summary: summaryRef.current?.value,
        text: textRef.current?.value,
        type: typeRef.current?.value
      })}
             error={error}
      />
    )
  }
  if (isEditEror) return <Error reset={editPostHandler} error={editEror}/>

  return (
    <Transition
      appear={true}
      show={true}
      enter="ease-linear duration-700"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
      className="w-full"
    >
      <form className="w-full h-[calc(100vh_-_64px_-_64px)]"
            onSubmit={buttonText === "Edit" ? editPostHandler : createPostHandler}>
        <h2 className="text-center text-3xl font-[500] leading-[1.2] mb-2">{headingText}</h2>

        <div className="my-2 flex flex-col">
          <label htmlFor="summary" className="mb-2">Summary *</label>
          <input
            id="summary"
            type="text"
            ref={summaryRef}
            // onBlur={summaryBlurHandler}
            value={summaryVal}
            onChange={summaryChangeHandler}
            className={summaryStyles}
            placeholder="Enter your summary"
          />
          {summaryError && <p className="text-[red]">The Summary field should have at least 3 characters</p>}
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="text" className="mb-2">Text *</label>
          <textarea
            id="text"
            ref={textRef}
            // onBlur={textBlurHandler}
            value={textVal}
            onChange={textChangeHandler}
            className={textStyles}
            placeholder="Enter your article text"
          />
          {textError && <p className="text-[red]">The Text field should have at least 5 characters</p>}
        </div>

        <div className="w-full my-2 flex flex-row rounded-md border-2 border-solid border-[#99aec3]">
          <select
            name="type"
            ref={typeRef}
            className="w-full px-3 py-1.5"
          >
            <option value="Note">Note</option>
            <option value="News">News</option>
          </select>
          <label className="w-[100px] px-3 py-1.5 border-l-2 border-solid border-[#99aec3]">Options</label>
        </div>

        <Button
          text={buttonText}
          style="btn-primary mt-5 bg-[#88bddd] m-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300"
          link="/post/posts"
          type="submit"
          isButton={true}
        />
      </form>
    </Transition>
  );
};

export default CreatePost;
