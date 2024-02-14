import { and, eq, notExists } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { validate } from "uuid";

import { collaborators, users, workspaces } from "../../../migrations/schema";
import { db } from "../supabase/db";
import { type Workspace } from "../supabase/schema";
import { apiWrapper } from ".";

export const getPrivateWorkspaces = apiWrapper(_getPrivateWorkspaces);
export const getCollaboratingWorkspaces = apiWrapper(
  _getCollaboratingWorkspaces,
);
export const getSharedWorkspaces = apiWrapper(_getSharedWorkspaces);
export const createWorkspace = apiWrapper(_createWorkspace);
export const updateWorkspace = apiWrapper(_updateWorkspace);
export const getWorkspaceDetails = apiWrapper(_getWorkspaceDetails);

async function _getWorkspaceDetails(workspaceId: string) {
  if (!validate(workspaceId)) throw new Error();

  const workspace = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.id, workspaceId))
    .limit(1);

  return workspace;
}

async function _getPrivateWorkspaces(userId: string) {
  if (!validate(userId)) throw new Error();

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

  return privateWorkspaces;
}

async function _getCollaboratingWorkspaces(userId: string) {
  if (!validate(userId)) throw new Error();

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

  return collaboratedWorkspaces;
}

async function _getSharedWorkspaces(userId: string) {
  if (!validate(userId)) throw new Error();

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

  return sharedWorkspaces;
}

async function _createWorkspace(workspace: Workspace) {
  await db.insert(workspaces).values(workspace);
}

async function _updateWorkspace(
  workspace: Partial<Workspace>,
  workspaceId: string,
) {
  if (!validate(workspaceId)) throw new Error();

  await db
    .update(workspaces)
    .set(workspace)
    .where(eq(workspaces.id, workspaceId));

  revalidatePath(`/dashboard/${workspaceId}`);
}
