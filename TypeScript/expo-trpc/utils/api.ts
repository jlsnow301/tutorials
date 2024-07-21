import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/trpc/routers";

export const api = createTRPCReact<AppRouter>();
