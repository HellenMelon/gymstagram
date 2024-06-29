import { workout, workoutExercises } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const workoutsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        exercises: z.array(
          z.object({
            id: z.string(),
            weight: z.number(),
            reps: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(ctx.session.user.id);

      const id = await ctx.db
        .insert(workout)
        .values({
          name: input.name,
          createdBy: ctx.session.user.id,
        })
        .returning({ id: workout.id });

      const workoutId = id[0]!.id;
      console.log(workoutId);

      await ctx.db.insert(workoutExercises).values(
        input.exercises.map((e) => ({
          exercise: e.id,
          workout: workoutId,
          weight: e.weight,
          reps: e.reps,
        })),
      );
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.workout.findMany({
      with: {
        workoutExercises: {
          with: {
            exercise: true,
          },
        },
      },
      where: eq(workout.createdBy, ctx.session.user.id),
    });
  }),
});
