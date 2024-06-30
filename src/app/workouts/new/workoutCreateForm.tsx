"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import ExerciseAdd from "./exerciseAdd";
import { useRouter } from "next/navigation";

export default function WorkoutCreateForm() {
  const router = useRouter();

  const [name, setName] = useState("");

  // exercise form
  const [open, setOpen] = useState(false);

  // exercises
  const [addedExercises, setAddedExercises] = useState<
    { id: string; weight: number; reps: number }[]
  >([]);

  const { data: exercises } = api.exercises.getAll.useQuery();

  const ctx = api.useUtils();

  const { mutate: createWorkout } = api.workouts.create.useMutation({
    onSuccess: () => {
      void ctx.workouts.invalidate();
      router.push("/workouts");
    },
  });

  console.log(addedExercises);

  if (!exercises) return <></>;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        className="border-b-2 border-gray-200 py-4 text-xl hover:border-[#bbdf8c] focus:outline-none"
        type="text"
        id="name"
        placeholder="Pick a workout name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl bg-[#bbdf8c] py-3 text-center text-white hover:bg-blue-600"
      >
        Add an exercise
      </button>
      {addedExercises.length > 0 ? (
        <div className="flex flex-row gap-4 font-medium underline">
          <p className="flex-grow-[2]">Exercise Name</p>
          <p className="flex-grow text-right">Weight</p>
          <p className="flex-grow text-right">Reps</p>
        </div>
      ) : (
        <p className="text-center text-gray-300">
          Add some exercises to this workout!
        </p>
      )}
      {addedExercises.length > 0 &&
        addedExercises
          .map((ae) => ({
            ...ae,
            name: exercises.find((e) => e.id === ae.id)?.name,
          }))
          .map((ex, index) => (
            <div key={index} className="flex flex-row">
              <p className="w-1/2">{ex.name}</p>
              <input
                className="w-1/4 min-w-0 text-right focus:outline-none"
                type="number"
                placeholder="0.0"
                value={ex.weight}
                onChange={(e) => {
                  setAddedExercises((prev) => {
                    const newExercises = [...prev];
                    if (e.target.value !== "") {
                      newExercises[index]!.weight = parseInt(e.target.value);
                    } else {
                      newExercises[index]!.weight = 0;
                    }

                    return newExercises;
                  });
                }}
              />
              <input
                className="w-1/4 min-w-0 text-right focus:outline-none"
                type="number"
                placeholder="0"
                value={ex.reps}
                onChange={(e) => {
                  setAddedExercises((prev) => {
                    const newExercises = [...prev];
                    if (e.target.value === "") {
                      newExercises[index]!.reps = 0;
                    } else {
                      newExercises[index]!.reps = parseInt(e.target.value);
                    }
                    return newExercises;
                  });
                }}
              />
            </div>
          ))}
      {open && (
        <ExerciseAdd
          close={() => setOpen(false)}
          addExerciseToList={(id) =>
            setAddedExercises((prev) => [...prev, { id, weight: 0, reps: 0 }])
          }
        />
      )}
      <button
        className="w-full rounded-xl bg-green-500 py-3 text-center text-white hover:bg-green-600"
        onClick={() => {
          createWorkout({
            name,
            exercises: addedExercises,
          });
        }}
      >
        Create
      </button>
    </form>
  );
}
