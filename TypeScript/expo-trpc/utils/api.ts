import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/trpc/routers/_root";

export const api = createTRPCReact<AppRouter>();
