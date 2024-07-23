import { router } from "./trpc";
import { postsRouter } from "./routers/posts";

/** This is the main router for the tRPC API. */
export const appRouter = router({
  posts: postsRouter,
  // users: usersRouter,
  // Any other routers you want to add
});

export type AppRouter = typeof appRouter;
