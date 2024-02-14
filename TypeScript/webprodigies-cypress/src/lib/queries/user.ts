"use server";

import { and, eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { validate } from "uuid";

import { collaborators, users, workspaces } from "../../../migrations/schema";
import { db } from "../supabase/db";
import { type Subscription, type User } from "../supabase/schema";
import { apiWrapper } from ".";

export const getUserSubscriptionStatus = apiWrapper(_getUserSubscriptionStatus);
export const getUsersFromSearch = apiWrapper(_getUsersFromSearch);
export const deleteWorkspace = apiWrapper(_deleteWorkspace);

async function _getUserSubscriptionStatus(userId: string) {
  if (!userId || !validate(userId)) throw new Error();

  const data = await db.query.subscriptions.findFirst({
    where: (found, { eq }) => eq(found.userId, userId),
  });

  if (!data) throw new Error("No Data found");

  return data as Subscription;
}

async function _getUsersFromSearch(email: string) {
  if (!email) return;

  const accounts = await db
    .select()
    .from(users)
    .where(ilike(users.email, `${email}%`));

  return accounts as User[];
}

async function _deleteWorkspace(workspaceId: string) {
  await db.delete(workspaces).where(eq(workspaces.id, workspaceId));

  revalidatePath("/dashboard");
}

export async function addCollaborators(users: User[], workspaceId: string) {
  users.forEach((user) => void addCollaborator(user, workspaceId));
}

export async function removeCollaborators(users: User[], workspaceId: string) {
  users.forEach((user) => void removeCollaborator(user, workspaceId));
}

async function addCollaborator(user: User, workspaceId: string) {
  const userExists = await db.query.collaborators.findFirst({
    where: (u, { eq }) =>
      and(eq(u.userId, user.id), eq(u.workspaceId, workspaceId)),
  });

  if (!userExists)
    return await db
      .insert(collaborators)
      .values({ workspaceId, userId: user.id });
}

async function removeCollaborator(user: User, workspaceId: string) {
  const userExists = await db.query.collaborators.findFirst({
    where: (u, { eq }) =>
      and(eq(u.userId, user.id), eq(u.workspaceId, workspaceId)),
  });

  if (userExists)
    return await db
      .delete(collaborators)
      .where(
        and(
          eq(collaborators.workspaceId, workspaceId),
          eq(collaborators.userId, user.id),
        ),
      );
}
