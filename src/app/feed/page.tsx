import Header from "../_components/header";
import Navbar from "../_components/navbar";
import DailyChallenges from "./dailyChallenges";
import CurrWorkoutRoutine from "./currWorkoutRoutine";
import PostFeed from "./postFeed";
import { Suspense } from "react";

export default function Page() {
  return (
    <div
      style={{
        backgroundColor: "#e2f7c6",
      }}
      className="flex min-h-screen w-full flex-col justify-start gap-4 bg-[#e2f7c6]"
    >
      <Header name="Home" />

      <DailyChallenges />
      <Suspense fallback={<div>Loading...</div>}>
        <CurrWorkoutRoutine />
      </Suspense>
      <PostFeed />
      <div className="p-10"></div>
      <Navbar />
    </div>
  );
}

// export default async function Page() {
// const post = await api.post.getLatest();
