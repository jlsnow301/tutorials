import { eq } from "drizzle-orm";
import { validate } from "uuid";

import { files } from "../../../migrations/schema";
import { db } from "../supabase/db";
import { type File } from "../supabase/schema";
import { apiWrapper } from ".";

export const getFiles = apiWrapper(_getFiles);
export const createFile = apiWrapper(_createFile);
export const updateFile = apiWrapper(_updateFile);

async function _getFiles(folderId: string) {
  const isValid = validate(folderId);
  if (!isValid) throw new Error();

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
  await db.update(files).set(file).where(eq(files.id, fileId));
}
