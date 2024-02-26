import Link from "next/link";

const PostHeader = ({children}: { children: React.ReactNode }) => {
  return (
    <>
      <ul className="flex flex-wrap content-center list-none pl-0 mb-0 border-b-[rgb(205,203,203)] w-[960px] border-solid h-[26px]">
        <li
          className="content-center border h-[26px] w-[63px] text-[#1d7aea] rounded-[5px] border-solid border-[rgb(205,203,203)]">
          <Link className="py-2 px-4 no-underline border border-b-0 rounded rounded-t"
                href="lists">Posts</Link>
        </li>
        <li
          className="content-center border h-[26px] w-[63px] text-[#1d7aea] rounded-[5px] border-solid border-[rgb(205,203,203)]">
          <Link className="py-2 px-4 no-underline border border-b-0 rounded rounded-t" href=""
                aria-current="page">Create</Link>
        </li>
        <li
          className="content-center border h-[26px] w-[63px] text-[#1d7aea] rounded-[5px] border-solid border-[rgb(205,203,203)]">
          <Link className="py-2 px-4 no-underline border border-b-0 rounded rounded-t"
                href="favorites">Favorites</Link>
        </li>
      </ul>

      {/*{children}*/}
    </>
  )
}

export default PostHeader;
