"use client";

import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export default function CurrWorkoutRoutine() {
  const router = useRouter();

  const params = useSearchParams();
  const [workoutId, setWorkoutId] = useState<string | null>(
    params.get("workout") ?? localStorage.getItem("workoutId"),
  );

  console.log(workoutId);

  useEffect(() => {
    if (workoutId) localStorage.setItem("workoutId", workoutId);
  }, [workoutId]);

  return (
    <div className="mx-auto flex w-[90%] flex-col items-center justify-end rounded-lg bg-white p-2 shadow-md">
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          textSize: 19,
          // mb: 2,
        }}
      >
        Workout Routine
        {!workoutId && (
          <Typography
            variant="body2"
            // component="div"
          >
            (Select Routine)
          </Typography>
        )}
      </Typography>

      {!workoutId && (
        <IconButton
          sx={{
            color: "#000",
            marginTop: "0px",
            marginBottom: "1px",
          }}
          onClick={() => router.push("/workouts")}
        >
          <AddIcon
            sx={{
              color: "#000",
              marginTop: "0px",
              marginBottom: "1px",
            }}
            fontSize="large"
          />
        </IconButton>
      )}

      {!!workoutId && <FeedWorkout id={workoutId} />}
    </div>
  );
}

function FeedWorkout({ id }: { id: string }) {
  const { data: workout, isLoading, isError } = api.workouts.get.useQuery(id);

  if (isLoading) return <div>Workout loading...</div>;
  if (isError || !workout) return <div>Error</div>;

  return (
    <div className="flex flex-col">
      <h2 className="flex flex-col items-center justify-center font-bold">
        {workout.name}
      </h2>

      <ul className="justify-left flex flex-col">
        {workout.workoutExercises.map((we) => (
          <li key={we.id}>
            <div>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#bbdf8c",
                  },
                  color: "#bbdf8c",
                }}
              />
              {we.exercise.name} - {we.weight}kg x {we.reps}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
