import { api } from "~/trpc/server";
import Header from "../_components/header";
import Navbar from "../_components/navbar";
import DailyChallenges from "./dailyChallenges";
import { DummyPostData } from "./dummyDataPosts";
import CurrWorkoutRoutine from "./currWorkoutRoutine";
import PostFeed from "./postFeed";

export default function Page() {
  return (
    <div
      style={{
        backgroundColor: "#e2f7c6",
      }}
    >
      <Header name="Home" />

      <DailyChallenges />
      <CurrWorkoutRoutine />
      <PostFeed />
      <div className="p-10"></div>
      <Navbar />
    </div>
  );
}

// export default async function Page() {
// const post = await api.post.getLatest();
