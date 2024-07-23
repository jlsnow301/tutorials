import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { posts } from "@/db/schema";

const byUser = publicProcedure
  .input(
    z.object({
      user: z.number(),
    })
  )
  .query((opts) => {
    /// Sql way
    const postsSQL = db
      .select()
      .from(posts)
      .where(eq(posts.authorId, opts.input.user));

    /// Query way
    const postsQuery = db.query.posts.findMany({
      where: (posts) => eq(posts.reviewerId, opts.input.user),
    });

    return postsQuery;
  });

/** All user posts */
export const postsRouter = router({
  byUser,
});
