import { eq } from "drizzle-orm";
import { validate } from "uuid";

import { files } from "../../../migrations/schema";
import db from "../supabase/db";
import { type File } from "../supabase/schema";

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
