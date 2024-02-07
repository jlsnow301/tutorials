"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import clsx from "clsx";
import { PlusIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type PropsWithChildren,
  type ReactNode,
  useMemo,
  useState,
} from "react";
import { v4 } from "uuid";

import { useAppState } from "@/lib/providers/state-provider";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { createFile, updateFile, updateFolder } from "@/lib/supabase/queries";
import { type File } from "@/lib/supabase/schema";

import { EmojiPicker } from "../global/emoji-picker";
import { TooltipWrapper } from "../global/tooltip-wrapper";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useToast } from "../ui/use-toast";

type Props = PropsWithChildren<{
  customIcon?: ReactNode;
  disabled?: boolean;
  iconId: string;
  id: string;
  listType: "folder" | "file";
  title: string;
}>;

export function Dropdown(props: Props) {
  const { children, customIcon, disabled, iconId, id, listType, title } = props;

  const supabase = createClientComponentClient();
  const { user } = useSupabaseUser();
  const { dispatch, folderId, state, workspaceId } = useAppState();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const isFolder = listType === "folder";

  const fileTitle = useMemo(() => {
    if (isFolder) return;

    const fileFolderId = id.split("folder");

    const stateTitle = state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.folders.find((folder) => folder.id === fileFolderId[0])
      ?.files.find((file) => file.id === fileFolderId[1])?.title;

    if (title === stateTitle || !stateTitle) return title;

    return stateTitle;
  }, [state, listType, workspaceId, id, title]);

  const folderTitle = useMemo(() => {
    if (!isFolder) return;

    const stateTitle = state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.folders.find((folder) => folder.id === id)?.title;

    if (title === stateTitle || !stateTitle) return title;

    return stateTitle;
  }, [state, listType, workspaceId, id, title]);

  const groupIdentifies = useMemo(
    () =>
      clsx(
        "dark:text-white whitespace-nowrap flex justify-between items-center w-full relative",
        {
          "group/folder": isFolder,
          "group/file": !isFolder,
        },
      ),
    [isFolder],
  );

  const listStyles = useMemo(
    () =>
      clsx("relative border-none", {
        "text-md": isFolder,
        "ml-6 text-[16px] py-1": !isFolder,
      }),

    [isFolder],
  );

  const hoverStyles = useMemo(
    () =>
      clsx(
        "h-full hidden rounded-sm absolute right-0 items-center justify-center",
        {
          "group-hover/file:block": !isFolder,
          "group-hover/folder:block": isFolder,
        },
      ),
    [isFolder],
  );

  const matchingFiles = useMemo(() => {
    const filteredItems =
      state.workspaces
        .find((workspace) => workspace.id === workspaceId)
        ?.folders.find((folder) => folder.id === id)
        ?.files.filter((file) => !file.inTrash) ?? [];

    return filteredItems;
  }, [state, workspaceId]);

  async function addNewFile() {
    if (!workspaceId) return;

    const newFile: File = {
      folderId: id,
      data: null,
      createdAt: new Date().toISOString(),
      inTrash: null,
      title: "Untitled",
      iconId: "📝",
      id: v4(),
      workspaceId,
      bannerUrl: "",
    };

    dispatch({
      type: "ADD_FILE",
      payload: { file: newFile, folderId: id, workspaceId },
    });

    const { error } = await createFile(newFile);
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not create a file",
      });

      return;
    }

    toast({
      title: "Success",
      description: "File created",
    });
  }

  function fileTitleChange(evt: ChangeEvent<HTMLInputElement>) {
    if (!workspaceId || !folderId) return;

    const currentId = id.split("folder");

    if (currentId.length === 2 && currentId[1]) {
      dispatch({
        type: "UPDATE_FILE",
        payload: {
          file: { title: evt.target.value },
          folderId,
          workspaceId,
          fileId: currentId[1],
        },
      });
    }
  }

  function folderTitleChange(evt: ChangeEvent<HTMLInputElement>) {
    if (!workspaceId) return;

    const currentId = id.split("folder");

    if (currentId.length === 1) {
      dispatch({
        type: "UPDATE_FOLDER",
        payload: {
          folder: { title: evt.target.value },
          folderId: currentId[0],
          workspaceId,
        },
      });
    }
  }

  async function handleBlur() {
    if (!isEditing) return;

    setIsEditing(false);

    const fId = id.split("folder");

    if (fId.length === 1 && folderTitle) {
      await updateFolder({ title }, fId[0]);
      toast({
        title: "Success",
        description: "Folder title changed",
      });

      return;
    }

    if (fId.length === 2 && fId[1] && fileTitle) {
      await updateFile({ title: fileTitle }, fId[1]);
      toast({
        title: "Success",
        description: "File title changed",
      });
    }
  }

  async function moveToTrash() {
    if (!user || !workspaceId) return;

    const pathId = id.split("folder");

    if (isFolder) {
      dispatch({
        type: "UPDATE_FOLDER",
        payload: {
          folder: { inTrash: `Deleted by ${user.email}` },
          folderId: pathId[0],
          workspaceId,
        },
      });

      const { error } = await updateFolder(
        { inTrash: `Deleted by ${user.email}` },
        pathId[0],
      );

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not move folder to trash",
        });

        return;
      }

      toast({
        title: "Success",
        description: "Moved folder to trash",
      });

      return;
    }

    dispatch({
      type: "UPDATE_FILE",
      payload: {
        file: { inTrash: `Deleted by ${user.email}` },
        fileId: pathId[1],
        folderId: pathId[0],
        workspaceId,
      },
    });

    const { error } = await updateFile(
      { inTrash: `Deleted by ${user.email}` },
      pathId[1],
    );

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not move file to trash",
      });

      return;
    }

    toast({
      title: "Success",
      description: "Moved file to trash",
    });
  }

  async function onChangeEmoji(selectedEmoji: string) {
    if (!isFolder || !workspaceId) return;

    dispatch({
      type: "UPDATE_FOLDER",
      payload: {
        workspaceId,
        folderId: id,
        folder: { iconId: selectedEmoji },
      },
    });

    const { error } = await updateFolder({ iconId: selectedEmoji }, id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not update the emoji for this folder",
      });

      return;
    }

    toast({
      title: "Success",
      description: "Updated emoji for this folder",
    });
  }

  function navigatePage(accordionId: string, type: string) {
    const prefix = type === "file" ? `${folderId}/` : "";

    router.push(`/dashboard/${workspaceId}/${prefix + accordionId}`);
  }

  return (
    <AccordionItem
      className={listStyles}
      onClick={(evt) => {
        evt.stopPropagation();
        navigatePage(id, listType);
      }}
      value={id}
    >
      <AccordionTrigger
        className="p-2 text-sm hover:no-underline dark:text-muted-foreground"
        disabled={!isFolder}
        id={listType}
      >
        <div className={groupIdentifies}>
          <div className="flex items-center justify-center gap-4 overflow-hidden">
            <div className="relative">
              <EmojiPicker getValue={onChangeEmoji}>{iconId}</EmojiPicker>
              <input
                className={clsx(
                  "w-[140px] overflow-hidden text-Neutrals/neutrals-7 outline-none",
                  {
                    "cursor-text bg-muted": isEditing,
                    "cursor-pointer bg-transparent": !isEditing,
                  },
                )}
                onBlur={handleBlur}
                onChange={isFolder ? folderTitleChange : fileTitleChange}
                onDoubleClick={() => setIsEditing(true)}
                readOnly={!isEditing}
                type="text"
                value={isFolder ? folderTitle : fileTitle}
              />
            </div>
            <div className={hoverStyles}>
              <TooltipWrapper message="Delete Folder">
                <Trash
                  className="transition-colors dark:text-Neutrals/neutrals-7 hover:dark:text-white"
                  onClick={moveToTrash}
                  size={15}
                />
              </TooltipWrapper>{" "}
              {isFolder && !isEditing && (
                <TooltipWrapper message="Add File">
                  <PlusIcon
                    className="transition-colors dark:text-Neutrals/neutrals-7 hover:dark:text-white"
                    onClick={addNewFile}
                    size={15}
                  />
                </TooltipWrapper>
              )}
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {matchingFiles.map((file) => {
          const customFileId = `${id}folder${file.id}`;

          return (
            <Dropdown
              iconId={file.iconId}
              id={customFileId}
              key={file.id}
              listType="file"
              title={file.title}
            />
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
}
