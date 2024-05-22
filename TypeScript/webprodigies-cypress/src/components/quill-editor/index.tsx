"use client";

import "quill/dist/quill.snow.css";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type Quill from "quill";
import { useCallback, useMemo, useState } from "react";

import { useAppState } from "@/lib/providers/state-provider";
import { deleteFile, updateFile } from "@/lib/queries/file";
import { deleteFolder, updateFolder } from "@/lib/queries/folder";
import { updateWorkspace } from "@/lib/queries/workspace";
import { type File, type Folder, type Workspace } from "@/lib/supabase/schema";

import { BannerUpload } from "../banner-upload";
import { EmojiPicker } from "../global/emoji-picker";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TOOLBAR_OPTIONS } from "./constants";

type Props = {
  dirDetails: File | Folder | Workspace;
  dirType: "workspace" | "folder" | "file";
  fileId: string;
};

type Collaborator = {
  avatarUrl: string;
  email: string;
  id: string;
};

export function QuillEditor(props: Props) {
  const { dirDetails, dirType, fileId } = props;

  const supabase = createClientComponentClient();
  const { dispatch, folderId, state, workspaceId } = useAppState();
  const pathname = usePathname();
  const [quill, setQuill] = useState<Quill>();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [saving, setSaving] = useState(false);

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

  const breadCrumbs = useMemo(() => {
    if (!pathname || !state.workspaces || !workspaceId) return;

    const segments = pathname
      .split("/")
      .filter((val) => val !== "dashboard" && val);

    const workspaceDetails = state.workspaces.find(
      (workspace) => workspace.id === workspaceId,
    );

    const workspaceBreadcrumb = workspaceDetails
      ? `${workspaceDetails.iconId} ${workspaceDetails.title}`
      : "";

    if (segments.length === 1) {
      return workspaceBreadcrumb;
    }

    // eslint-disable-next-line @typescript-eslint/prefer-destructuring
    const folderSegment = segments[1];
    const folderDetails = workspaceDetails?.folders.find(
      (folder) => folder.id === folderSegment,
    );
    const folderBreadCrumb = folderDetails
      ? `/ ${folderDetails.iconId} ${folderDetails.title}`
      : "";

    if (segments.length === 2) {
      return `${workspaceBreadcrumb} ${folderBreadCrumb}`;
    }

    // eslint-disable-next-line @typescript-eslint/prefer-destructuring
    const fileSegment = segments[2];
    const fileDetails = folderDetails?.files.find(
      (file) => file.id === fileSegment,
    );
    const fileBreadcrumb = fileDetails
      ? `/ ${fileDetails.iconId} ${fileDetails.title}`
      : "";

    return `${workspaceBreadcrumb} ${folderBreadCrumb} ${fileBreadcrumb}`;
  }, [state, pathname, workspaceId]);

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

  async function iconOnChange(icon: string) {
    if (!fileId) return;

    switch (dirType) {
      case "workspace":
        dispatch({
          type: "UPDATE_WORKSPACE",
          payload: { workspace: { iconId: icon }, workspaceId: fileId },
        });
        await updateWorkspace({ iconId: icon }, fileId);
        break;
      case "folder":
        if (!workspaceId) return;
        dispatch({
          type: "UPDATE_FOLDER",
          payload: {
            folder: { iconId: icon },
            folderId: fileId,
            workspaceId,
          },
        });
        await updateFolder({ iconId: icon }, fileId);
        break;
      case "file":
        if (!workspaceId || !folderId) return;
        dispatch({
          type: "UPDATE_FILE",
          payload: { file: { iconId: icon }, workspaceId, folderId, fileId },
        });
        await updateFile({ iconId: icon }, fileId);
        break;
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
            <span className="text-sm text-white">{details.inTrash}</span>
          </article>
        )}
        <div className="flex flex-col-reverse justify-center p-8 sm:flex-row sm:items-center sm:justify-between sm:p-2">
          <div>{breadCrumbs}</div>
          <div className="flex items-center gap-4">
            <div className="flex h-10 items-center justify-center">
              {collaborators.map((collaborator) => (
                <TooltipProvider key={collaborator.id}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="-ml-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-background">
                        <AvatarImage className="rounded-full" />
                        <AvatarFallback>
                          {collaborator.email.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>User Name</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            {saving ? (
              <Badge
                className="right-4 top-4 z-50 bg-orange-600 text-white"
                variant="secondary"
              >
                Saving
              </Badge>
            ) : (
              <Badge
                className="right-4 top-4 z-50 bg-emerald-600 text-white"
                variant="secondary"
              >
                Saved
              </Badge>
            )}
          </div>
        </div>
      </div>
      {details.bannerUrl && (
        <div className="relative h-[200px] w-full">
          <Image
            alt="Banner image"
            className="h-20 w-full object-cover md:h-48"
            fill
            src={
              supabase.storage
                .from("file-banners")
                .getPublicUrl(details.bannerUrl).data.publicUrl
            }
          />
        </div>
      )}
      <div className="relative mt-2 flex flex-col items-center justify-center">
        <div className="flex w-full max-w-[800px] flex-col self-center px-7 lg:my-8 ">
          <div className="text-[80px]">
            <EmojiPicker getValue={iconOnChange}>
              <div className="flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-muted">
                {details.iconId}
              </div>
            </EmojiPicker>
          </div>
          <div className="flex">
            <BannerUpload className="mt-2 text-sm text-muted-foreground p-2 hover:text-card-foreground transition-all rounded-md" details={details} dirType={dirType} id={fileId} >{details.bannerUrl ? "Update Banner" : "Add Banner"}</BannerUpload>
          </div>
        </div>
        <div className="max-w-[800px]" id="container" ref={wrapperRef} />
      </div>
    </>
  );
}
