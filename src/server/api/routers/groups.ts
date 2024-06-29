import { eq } from "drizzle-orm";
import z from "node_modules/zod/lib";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { group, groupUsers, users } from "~/server/db/schema";

export const groupRouter = createTRPCRouter({
  createGroup: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        photo: z.string(),
        usernames: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const insertedGroup = await ctx.db
        .insert(group)
        .values({
          name: input.name,
          photo: input.photo,
        })
        .returning({ groupID: group.id });

      const groupId = insertedGroup[0]!.groupID;

      for (const username of input.usernames) {
        const userId = await ctx.db
          .select()
          .from(users)
          .where(eq(users.name, username));
        await ctx.db.insert(groupUsers).values({
          group: groupId,
          user: userId[0]!.id,
        });
      }
      return true;
    }),
});
