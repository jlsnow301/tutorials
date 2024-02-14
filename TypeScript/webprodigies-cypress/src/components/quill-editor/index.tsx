"use client";

import "quill/dist/quill.snow.css";

import type Quill from "quill";
import { useCallback, useMemo, useState } from "react";

import { useAppState } from "@/lib/providers/state-provider";
import { deleteFile, updateFile } from "@/lib/queries/file";
import { deleteFolder, updateFolder } from "@/lib/queries/folder";
import { type File, type Folder, type Workspace } from "@/lib/supabase/schema";

import { Button } from "../ui/button";
import { TOOLBAR_OPTIONS } from "./constants";

type Props = {
  dirDetails: File | Folder | Workspace;
  dirType: "workspace" | "folder" | "file";
  fileId: string;
};

export function QuillEditor(props: Props) {
  const { dirDetails, dirType, fileId } = props;

  const { dispatch, folderId, state, workspaceId } = useAppState();
  const [quill, setQuill] = useState<Quill>();

  const details = useMemo(() => {
    let selectedDir;

    switch (dirType) {
      case "file":
        selectedDir = state.workspaces
          .find((workspace) => workspace.id === workspaceId)
          ?.folders.find((folder) => folder.id === folderId)
          ?.files.find((file) => file.id === fileId);
        break;
      case "folder":
        selectedDir = state.workspaces
          .find((workspace) => workspace.id === workspaceId)
          ?.folders.find((folder) => folder.id === folderId);
        break;
      case "workspace":
        selectedDir = state.workspaces.find(
          (workspace) => workspace.id === workspaceId,
        );
        break;
    }

    if (selectedDir) return selectedDir;

    return {
      title: dirDetails.title,
      iconId: dirDetails.iconId,
      createdAt: dirDetails.createdAt,
      data: dirDetails.data,
      inTrash: dirDetails.inTrash,
      bannerUrl: dirDetails.bannerUrl,
    } as Workspace | File | Folder;
  }, [state, workspaceId, folderId]);

  const wrapperRef = useCallback(async (wrapper: HTMLDivElement) => {
    if (typeof window === "undefined" || !wrapper) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const Quill = (await import("quill")).default;

    const quillInstance = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        // WIP cursors
      },
    });

    setQuill(quillInstance);
  }, []);

  async function deleteFileHandler() {
    switch (dirType) {
      case "file":
        if (!folderId || !workspaceId) return;
        dispatch({
          type: "DELETE_FILE",
          payload: { fileId, folderId, workspaceId },
        });
        await deleteFile(fileId);
      case "folder":
        if (!workspaceId) return;
        dispatch({
          type: "DELETE_FOLDER",
          payload: {
            folderId: fileId,
            workspaceId,
          },
        });
        await deleteFolder(fileId);
    }
  }

  async function restoreFileHandler() {
    switch (dirType) {
      case "file":
        if (!folderId || !workspaceId) return;
        dispatch({
          type: "UPDATE_FILE",
          payload: { file: { inTrash: "" }, fileId, folderId, workspaceId },
        });
        await updateFile({ inTrash: "" }, fileId);
      case "folder":
        if (!workspaceId) return;
        dispatch({
          type: "UPDATE_FOLDER",
          payload: { folder: { inTrash: "" }, folderId: fileId, workspaceId },
        });
        await updateFolder({ inTrash: "" }, fileId);
    }
  }

  return (
    <>
      <div className="relative">
        {details.inTrash && (
          <article className="z-40 flex flex-col flex-wrap items-center justify-center gap-4 bg-[#EB5757] py-2 md:flex-row">
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              <span className="text-white">
                This {dirType} is in the trash.
              </span>
              <Button
                className="border-white bg-transparent text-white hover:bg-white hover:text-[#EB5757]"
                onClick={restoreFileHandler}
                size="sm"
                variant="outline"
              >
                Restore
              </Button>
              <Button
                className="border-white bg-transparent text-white hover:bg-white hover:text-[#EB5757]"
                onClick={deleteFileHandler}
                size="sm"
                variant="outline"
              >
                Delete
              </Button>
            </div>
          </article>
        )}
      </div>
      <div className="relative mt-2 flex flex-col items-center justify-center">
        <div className="max-w-[800px]" id="container" ref={wrapperRef} />
      </div>
    </>
  );
}
