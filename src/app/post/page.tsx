import Navbar from "../_components/navbar";
import NewPostHeader from "./newPostHeader";
import PostDate from "./postDate";

export default function Page() {
  return (
    <div>
      <div className="p-7"></div>
      <NewPostHeader name="New Post" />
      <PostDate />
      <Navbar />
    </div>
  );
}
