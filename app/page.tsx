import Button from "@/UI/Button";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh_-_64px)] w-full bg-gradient-to-b">
      <h1 className="text-center text-5xl font-[500] leading-[1.2] mb-2">Web Blog</h1>

      <p>
        Add articles and save them to favorites.
      </p>

      <Button text="Start" style="bg-[#BCC6CC]" link="./post/create" />
    </div>
  )
}

export default Home;