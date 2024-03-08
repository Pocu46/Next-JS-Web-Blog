import React from "react";

type ErrorProps = {
  error: Error | { message: string }; // Error object or object with message property
}

const Error: React.FC<ErrorProps> = ({error}) => {
  return (
    <div className="m-auto w-full h-auto flex justify-center align-center flex-col bg-pink-300 border-[3px] rounded-xl border-solid border-[red]">
      <h2 className="text-center text-[#000] text-4xl font-[300] leading-[1.2]">An Error accrued!</h2>

      <p className="text-center text-[red] my-5 text-4xl font-[300] leading-[1.2]">{error.message || "Something went wrong. Please try again later!"}</p>
    </div>
  )
}

export default Error;