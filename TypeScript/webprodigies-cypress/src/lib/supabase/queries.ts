"use server";

import { and, eq, ilike, notExists } from "drizzle-orm";
import { validate } from "uuid";

import {
  collaborators,
  files,
  folders,
  users,
  workspaces,
} from "../../../migrations/schema";
import db from "./db";
import { addCollaborator, validateUser } from "./helpers";
import {
  type File,
  type Folder,
  type Subscription,
  type User,
  type Workspace,
} from "./schema";

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

export async function getUsersFromSearch(email: string) {
  if (!email) return;

  const accounts = await db
    .select()
    .from(users)
    .where(ilike(users.email, `${email}%`));

  return accounts as User[];
}

export async function createFolder(folder: Folder) {
  try {
    await db.insert(folders).values(folder);

    return { data: null, error: null };
  } catch (err) {
    console.log(err);

    return { data: null, error: "Error" };
  }
}

export async function updateFolder(folder: Partial<Folder>, folderId: string) {
  try {
    await db.update(folders).set(folder).where(eq(folders.id, folderId));

    return { data: null, error: null };
  } catch (err) {
    console.log(err);

    return { data: null, error: "Error" };
  }
}

export async function createFile(file: File) {
  try {
    await db.insert(files).values(file);

    return { data: null, error: null };
  } catch (err) {
    console.log(err);

    return { data: null, error: "Error" };
  }
}

export async function updateFile(file: Partial<File>, fileId: string) {
  try {
    await db.update(files).set(file).where(eq(files.id, fileId));

    return { data: null, error: null };
  } catch (err) {
    console.log(err);

    return { data: null, error: "Error" };
  }
}

