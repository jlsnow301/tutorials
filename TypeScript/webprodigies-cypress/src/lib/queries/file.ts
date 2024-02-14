import { eq } from "drizzle-orm";
import { validate } from "uuid";

import { files } from "../../../migrations/schema";
import { db } from "../supabase/db";
import { type File } from "../supabase/schema";
import { apiWrapper } from ".";

export const getFiles = apiWrapper(_getFiles);
export const createFile = apiWrapper(_createFile);
export const updateFile = apiWrapper(_updateFile);
export const deleteFile = apiWrapper(_deleteFile);

async function _getFiles(folderId: string) {
  if (!folderId || !validate(folderId)) throw new Error();

  return (await db
    .select()
    .from(files)
    .orderBy(files.createdAt)
    .where(eq(files.folderId, folderId))) as File[];
}

async function _createFile(file: File) {
  await db.insert(files).values(file);
}

async function _updateFile(file: Partial<File>, fileId: string) {
  if (!validate(fileId)) throw new Error();

  await db.update(files).set(file).where(eq(files.id, fileId));
}

async function _deleteFile(fileId: string) {
  if (!validate(fileId)) throw new Error();

  await db.delete(files).where(eq(files.id, fileId));
}
