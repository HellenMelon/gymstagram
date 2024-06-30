"use client";

import { NavArrowDown, Xmark } from "iconoir-react";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function ExerciseAdd({
  close,
  addExerciseToList,
}: {
  close: () => void;
  addExerciseToList: (id: string) => void;
}) {
  const ctx = api.useUtils();

  const [newOpen, setNewOpen] = useState(false);

  const [newExerciseName, setNewExerciseName] = useState("");

  const { mutate: addExercise } = api.exercises.create.useMutation({
    onSuccess: () => {
      void ctx.exercises.invalidate();
      setNewExerciseName("");
      setNewOpen(false);
    },
  });
  const { data: exercises } = api.exercises.getAll.useQuery();

  if (!exercises) return <></>;

  return (
    <div
      onClick={close}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-black/30"
    >
      <div
        className="absolute left-[50%] top-[50%] min-w-[80%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="hover:text-red absolute right-3 top-3"
          onClick={close}
        >
          <Xmark />
        </button>

        <button
          className={`flex flex-row items-center gap-1 rounded-xl bg-gray-100 px-4 py-2 font-medium text-black ${!newOpen && "rounded-b-xl"}`}
          onClick={() => setNewOpen((prev) => !prev)}
        >
          Create new exercise
          <span className={`transition-all ${newOpen ? "rotate-180" : ""}`}>
            <NavArrowDown />
          </span>
        </button>
        {newOpen && (
          <div
            className={`my-2 flex w-full flex-row justify-between rounded-xl rounded-r-xl bg-gray-100 px-4 py-3 text-black `}
          >
            <input
              type="text"
              placeholder="Exercise name"
              className="bg-transparent focus:outline-none"
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
            />
            <button
              className=" text-black"
              onClick={() => {
                addExercise({
                  name: newExerciseName,
                });
              }}
            >
              Create
            </button>
          </div>
        )}
        <div className="flex flex-col space-y-4 py-5">
          {exercises
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => {
                  addExerciseToList(exercise.id);
                  close();
                }}
              >
                {exercise.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
