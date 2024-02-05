import { and, eq, notExists } from "drizzle-orm";
import { validate } from "uuid";

import { files, folders, users, workspaces } from "../../../migrations/schema";
import db from "./db";
import {
  type Folder,
  type Subscription,
  type User,
  type Workspace,
} from "./drizzle-types";
import { addCollaborator, validateUser } from "./helpers";
import { collaborators } from "./schema";

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

export async function getFiles(folderId: string) {
  const isValid = validate(folderId);
  if (!isValid) return { data: null, error: "Error" };

  try {
    const results = (await db
      .select()
      .from(files)
      .orderBy(files.createdAt)
      .where(eq(files.folderId, folderId))) as File[] | [];
    return { data: results, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
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

export async function getFolders(workspaceId: string) {
  const isValid = validate(workspaceId);
  if (!isValid)
    return {
      data: null,
      error: "Error",
    };

  try {
    const results: Folder[] = await db
      .select()
      .from(folders)
      .orderBy(folders.createdAt)
      .where(eq(folders.workspaceId, workspaceId));
    return { data: results, error: null };
  } catch (error) {
    return { data: null, error: "Error" };
  }
}

export async function getPrivateWorkspaces(userId: string) {
  if (!validateUser(userId)) return [];

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
  if (!validateUser(userId)) return [];

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
  if (!validateUser(userId)) return [];

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

export async function addCollaborators(users: User[], workspaceId: string) {
  users.forEach((user) => void addCollaborator(user, workspaceId));
}
