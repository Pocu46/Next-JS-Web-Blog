import type {Metadata} from "next";
import CreatePost from "@/components/CreatePost";

export const metadata: Metadata = {
  title: "Create post",
};

const CreatePostPage = () => {
  return(
    <CreatePost />
  )
}

export default CreatePostPage;