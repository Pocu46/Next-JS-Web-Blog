"use client"

import { useEffect } from 'react'
import Button from "@/UI/Button";
import Error from "@/components/Error";

export default function ErrorPage({ error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="m-auto flex justify-center items-center h-[98vh] w-full">
      <Error error={error} />

      <Button
        text="Reset"
        style="btn-primary mt-5 bg-[#88bddd] m-auto"
        link="/post/posts"
        type="button"
        isButton={true}
        action={reset}
      />
      <Button
        text="Home"
        style="btn-primary mt-5 bg-[#88bddd] m-auto"
        link="/"
      />
    </div>
  )
}