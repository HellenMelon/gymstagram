import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        password: z.string(),
        email: z.string(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(users).values({
        name: input.name,
        username: input.username,
        password: input.password,
        email: input.email,
        image: input.imageUrl,
      });
    }),
});
