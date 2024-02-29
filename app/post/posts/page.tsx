import Post from "@/components/Post";

const Posts = () => {
  return(
    <Post
      type="Note"
      text="hello"
      time={new Date().toLocaleString("en")}
      isFavorite={false}
      summary="some text" />
  )
}

export default Posts;