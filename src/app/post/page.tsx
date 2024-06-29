import Navbar from "../_components/navbar";
import NewPostHeader from "./newPostHeader";
import PostDate from "./postDate";

export default function Page() {
  return (
    <div className="bg-[#e2f7c6]">
      <div className="p-10"></div>
      <NewPostHeader name="New Post" />
      <PostDate />
      <Navbar />
    </div>
  );
}
