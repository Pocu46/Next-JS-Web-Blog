import React from "react";
import Button from "@/UI/Button";

type ErrorProps = {
  error: Error | { message: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({error,reset}) => {
  return (
    <div className="m-auto w-full h-auto flex justify-center align-center flex-col bg-pink-300 border-[3px] rounded-xl border-solid border-[red]">
      <h2 className="text-center text-[#000] text-4xl font-[300] leading-[1.2]">An Error accrued!</h2>

      <p className="text-center text-[red] my-5 text-4xl font-[300] leading-[1.2]">{error.message || "Something went wrong. Please try again later!"}</p>

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

export default Error;