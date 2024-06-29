import { eq } from "drizzle-orm";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(users);
  }),

  getSessionedUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, ctx.session.user.id));
  }),
});
