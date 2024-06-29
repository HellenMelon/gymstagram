import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
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
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(users).values({
        name: input.name,
        username: input.username,
        password: input.password,
        email: input.email,
        image: input.imageUrl,
      });
    }),

  updateUserProfilePic: protectedProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({ image: input.url })
        .where(eq(users.id, ctx.session.user.id));
    }),
});
