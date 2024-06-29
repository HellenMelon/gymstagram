import { ArrowRight, PlusCircle } from "iconoir-react";
import Navbar from "../_components/navbar";
import Link from "next/link";
import { api } from "~/trpc/server";

export default async function Page() {
  const workouts = await api.workouts.getAll();

  return (
    <main className="flex flex-col gap-6 px-8 py-10">
      <Navbar />
      <h1 className="text-3xl">My Workouts</h1>

      <div className="flex flex-col gap-8">
        {workouts.map((w) => (
          <div
            key={w.id}
            className="cursor-pointer rounded-2xl border px-6 py-4"
          >
            <div className="flex flex-row items-start justify-between">
              <h3 className="text-lg font-medium">{w.name}</h3>
              <Link
                href={`/feed?workout=${w.id}`}
                className="flex flex-row gap-1 text-sm text-green-500"
              >
                start workout <ArrowRight width={12} />
              </Link>
            </div>
            <ul>
              {w.workoutExercises.map((we) => (
                <li key={we.id} className="flex flex-row justify-between">
                  <p className="flex-1">{we.exercise.name}</p>
                  <div className="flex flex-1 flex-row gap-4">
                    <p className="flex-grow text-right">Reps: {we.reps}</p>
                    <p className="flex-grow text-right">Weight: {we.weight}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link href="/workouts/new" className="fixed right-5 top-5">
        <PlusCircle width={32} height={32} />
      </Link>
    </main>
  );
}
