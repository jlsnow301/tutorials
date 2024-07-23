import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { posts } from "@/db/schema";

// Sql way - self documenting also
const byUser = publicProcedure.input(z.number()).query((opts) => {
  const postsSQL = db
    .select()
    .from(posts)
    .where(eq(posts.authorId, opts.input));

  return postsSQL;
});

// Query way - shortened
const byPostId = publicProcedure.input(z.number()).query((opts) =>
  db.query.posts.findFirst({
    where: (posts) => eq(posts.id, opts.input),
  })
);

/** All user posts */
export const postsRouter = router({
  byUser,
  byPostId,
});
