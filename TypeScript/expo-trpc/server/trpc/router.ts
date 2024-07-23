import { router } from "./trpc";
import { postsRouter } from "./routers/posts";

export const appRouter = router({
  posts: postsRouter,
  // users: usersRouter,
  // Any other routers you want to add
});

export type AppRouter = typeof appRouter;
