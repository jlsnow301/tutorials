"use server";

import { and, eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { collaborators, users, workspaces } from "../../../migrations/schema";
import db from "../supabase/db";
import { type Subscription, type User } from "../supabase/schema";

export async function getUserSubscriptionStatus(userId: string) {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (found, { eq }) => eq(found.userId, userId),
    });

    if (!data) throw new Error("No Data found");

    return { data: data as Subscription, error: null };
  } catch (error) {
    console.log(error);
    return { data: undefined, error: `Error ${error as string}` };
  }
}

export function addCollaborators(users: User[], workspaceId: string) {
  users.forEach((user) => void addCollaborator(user, workspaceId));
}

export async function getUsersFromSearch(email: string) {
  if (!email) return;

  const accounts = await db
    .select()
    .from(users)
    .where(ilike(users.email, `${email}%`));

  return accounts as User[];
}

export function removeCollaborators(users: User[], workspaceId: string) {
  users.forEach((user) => void removeCollaborator(user, workspaceId));
}

export async function deleteWorkspace(workspaceId: string) {
  try {
    await db.delete(workspaces).where(eq(workspaces.id, workspaceId));

    revalidatePath("/dashboard");

    return { data: null, error: null };
  } catch (err) {
    console.log(err);

    return { data: null, error: "Error" };
  }
}

async function addCollaborator(user: User, workspaceId: string) {
  const userExists = await db.query.collaborators.findFirst({
    where: (u, { eq }) =>
      and(eq(u.userId, user.id), eq(u.workspaceId, workspaceId)),
  });

  if (!userExists)
    await db.insert(collaborators).values({ workspaceId, userId: user.id });
}

async function removeCollaborator(user: User, workspaceId: string) {
  const userExists = await db.query.collaborators.findFirst({
    where: (u, { eq }) =>
      and(eq(u.userId, user.id), eq(u.workspaceId, workspaceId)),
  });

  if (userExists)
    await db
      .delete(collaborators)
      .where(
        and(
          eq(collaborators.workspaceId, workspaceId),
          eq(collaborators.userId, user.id),
        ),
      );
}
