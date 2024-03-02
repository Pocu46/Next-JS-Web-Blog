import Button from "@/UI/Button";
import WrapperComponent from "@/UI/WrapperComponent";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Create post",
};

const CreatePost = () => {
  return(
    <WrapperComponent style="w-full">
      <h2 className="text-center text-3xl font-[500] leading-[1.2] mb-2">Create New Post</h2>

      <div className="my-2 flex flex-col">
        <label htmlFor="sammary" className="mb-2">Summary *</label>
        <input
          id="sammary"
          name="summary"
          type="text"
          className="w-full px-3 py-1.5 rounded-md border-2 border-solid border-[#99aec3]"
          placeholder="Enter your summary"
          required
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label htmlFor="text" className="mb-2">Text *</label>
        <textarea
          id="text"
          name="text"
          className="w-full px-3 py-1.5 rounded-md border-2 border-solid border-[#99aec3] min-h-[65px]"
          placeholder="Enter your article text"
          required
        />
      </div>

      <div className="w-full my-2 flex flex-row rounded-md border-2 border-solid border-[#99aec3]">
        <select name="type" className="w-full px-3 py-1.5">
          <option>Note</option>
          <option>News</option>
        </select>
        <label className="w-[100px] px-3 py-1.5 border-l-2 border-solid border-[#99aec3]">Options</label>
      </div>

      <Button
        text="Create"
        style="btn-primary mt-5 bg-[#88bddd] m-auto"
        link="/post/posts"
        type="button"
      />
    </WrapperComponent>
  )
}

export default CreatePost;