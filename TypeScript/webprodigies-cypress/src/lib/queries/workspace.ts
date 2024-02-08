import { and, eq, notExists } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { validate } from "uuid";

import { collaborators, users, workspaces } from "../../../migrations/schema";
import db from "../supabase/db";
import { type Workspace } from "../supabase/schema";

export async function getPrivateWorkspaces(userId: string) {
  if (!!userId && validate(userId)) return [];

  const privateWorkspaces = await db
    .select({
      id: workspaces.id,
      createdAt: workspaces.createdAt,
      workspaceOwner: workspaces.workspaceOwner,
      title: workspaces.title,
      iconId: workspaces.iconId,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
    })
    .from(workspaces)
    .where(
      and(
        notExists(
          db
            .select()
            .from(collaborators)
            .where(eq(collaborators.workspaceId, workspaces.id)),
        ),
        eq(workspaces.workspaceOwner, userId),
      ),
    );

  return privateWorkspaces as Workspace[];
}

export async function getCollaboratingWorkspaces(userId: string) {
  if (!!!userId && validate(userId)) return [];

  const collaboratedWorkspaces = await db
    .select({
      id: workspaces.id,
      createdAt: workspaces.createdAt,
      workspaceOwner: workspaces.workspaceOwner,
      title: workspaces.title,
      iconId: workspaces.iconId,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
    })
    .from(users)
    .innerJoin(collaborators, eq(users.id, collaborators.userId))
    .innerJoin(workspaces, eq(collaborators.workspaceId, workspaces.id))
    .where(eq(users.id, userId));

  return collaboratedWorkspaces as Workspace[];
}

export async function getSharedWorkspaces(userId: string) {
  if (!!userId && validate(userId)) return [];

  const sharedWorkspaces = await db
    .select({
      id: workspaces.id,
      createdAt: workspaces.createdAt,
      workspaceOwner: workspaces.workspaceOwner,
      title: workspaces.title,
      iconId: workspaces.iconId,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
    })
    .from(workspaces)
    .orderBy(workspaces.createdAt)
    .innerJoin(collaborators, eq(workspaces.id, collaborators.userId))
    .where(eq(workspaces.workspaceOwner, userId));

  return sharedWorkspaces as Workspace[];
}

export async function createWorkspace(workspace: Workspace) {
  try {
    await db.insert(workspaces).values(workspace);

    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
}

export async function updateWorkspace(
  workspace: Partial<Workspace>,
  workspaceId: string,
) {
  try {
    await db
      .update(workspaces)
      .set(workspace)
      .where(eq(workspaces.id, workspaceId));

    revalidatePath(`/dashboard/${workspaceId}`);

    return { data: null, error: null };
  } catch (err) {
    console.log(err);

    return { data: null, error: "Error" };
  }
}
