import { eq } from "drizzle-orm";
import { validate } from "uuid";

import { folders } from "../../../migrations/schema";
import { db } from "../supabase/db";
import { type Folder } from "../supabase/schema";
import { apiWrapper } from ".";

export const getFolders = apiWrapper(_getFolders);
export const createFolders = apiWrapper(_createFolder);
export const updateFolders = apiWrapper(_updateFolder);

async function _getFolders(workspaceId: string) {
  const isValid = validate(workspaceId);
  if (!isValid) throw new Error();

  return (await db
    .select()
    .from(folders)
    .orderBy(folders.createdAt)
    .where(eq(folders.workspaceId, workspaceId))) as Folder[];
}

async function _createFolder(folder: Folder) {
  await db.insert(folders).values(folder);
}

async function _updateFolder(folder: Partial<Folder>, folderId: string) {
  await db.update(folders).set(folder).where(eq(folders.id, folderId));
}
