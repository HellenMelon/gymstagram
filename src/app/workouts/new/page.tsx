import Navbar from "~/app/_components/navbar";
import WorkoutCreateForm from "./workoutCreateForm";

export default function Page() {
  return (
    <main className="space-y-5 p-8 py-10">
      <h1 className="text-3xl font-medium">Create a new workout</h1>
      <WorkoutCreateForm />
      <Navbar />
    </main>
  );
}
