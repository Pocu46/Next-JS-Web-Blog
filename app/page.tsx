import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[yellowgreen] min-h-[calc(100vh_-_64px)] w-full">
      <h1 className="text-center">Web Blog</h1>

      <p>
        Add articles and save them to favorites.
      </p>

      <Link className="w-[126px]" href="/post/create">Start</Link>
    </div>
  )
}

export default Home;