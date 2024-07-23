import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { posts } from "@/db/schemas/posts";

export const postsRouter = router({
  byUser: publicProcedure
    .input(
      z.object({
        user: z.number(),
      })
    )
    .query(async (opts) => {
      /// Sql way
      const postsSQL = await db
        .select()
        .from(posts)
        .where(eq(posts.authorId, opts.input.user));

      /// Query way
      const postsQuery = await db.query.posts.findMany({
        where: (posts) => eq(posts.reviewerId, opts.input.user),
      });

      return { postsSQL, postsQuery };
    }),
});
