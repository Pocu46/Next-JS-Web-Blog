"use client"

import { useEffect } from 'react'
import Error from "@/components/Error";

export default function ErrorPage({ error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // useEffect(() => {
  //   console.error(error)
  // }, [error])

  return (
    <div className="m-auto flex justify-center items-center h-[98vh] w-full">
      <Error error={error} reset={reset} />
    </div>
  )
}