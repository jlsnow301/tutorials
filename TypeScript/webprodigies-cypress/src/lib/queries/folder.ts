import { eq } from "drizzle-orm";
import { validate } from "uuid";

import { folders } from "../../../migrations/schema";
import db from "../supabase/db";
import { type Folder } from "../supabase/schema";

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
