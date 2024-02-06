import { and } from "drizzle-orm";
import { validate } from "uuid";

import { collaborators } from "../../../migrations/schema";
import db from "./db";
import { type User } from "./schema";

export function validateUser(userId: string) {
  if (!userId) return false;

  const isValid = validate(userId);
  if (!isValid) return false;
}

export async function addCollaborator(user: User, workspaceId: string) {
  const userExists = await db.query.collaborators.findFirst({
    where: (u, { eq }) =>
      and(eq(u.userId, user.id), eq(u.workspaceId, workspaceId)),
  });

  if (!userExists)
    await db.insert(collaborators).values({ workspaceId, userId: user.id });
}
