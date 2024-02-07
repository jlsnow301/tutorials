"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import clsx from "clsx";
import { PlusIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type PropsWithChildren,
  type ReactNode,
  useMemo,
  useState,
} from "react";

import { useAppState } from "@/lib/providers/state-provider";
import { updateFolder } from "@/lib/supabase/queries";

import { EmojiPicker } from "../global/emoji-picker";
import { TooltipWrapper } from "../global/tooltip-wrapper";
import { AccordionItem, AccordionTrigger } from "../ui/accordion";
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

  function addNewFile(){
    
  }

  function fileTitleChange() {
    if (!workspaceId) return;

    const fId = id.split("folder");

    if (fId.length === 2 && fId[1]) {
      //
    }
  }

  function folderTitleChange() {
    if (!workspaceId) return;

    const fId = id.split("folder");

    if (fId.length === 1) {
      dispatch({
        type: "UPDATE_FOLDER",
        payload: {
          folder: { title },
          folderId: fId[0],
          workspaceId,
        },
      });
    }
  }

  async function handleBlur() {
    setIsEditing(false);

    if (!folderTitle) return;

    const fId = id.split("folder");

    if (fId?.length === 1) {
      await updateFolder({ title }, fId[0]);
      return;
    }

    if (fId.length === 2 && fId[1]) {
    }
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
            <div className="absolute right-0 hidden h-full items-center justify-center gap-2 rounded-sm group-hover/file:block">
              {isFolder && !isEditing && (
                <TooltipWrapper message="Add File">
                  <PlusIcon
                    className="transition-colors dark:text-Neutrals/neutrals-7 hover:dark:text-white"
                    //onClick={addNewFile}
                    size={15}
                  />
                </TooltipWrapper>
              )}
              <TooltipWrapper message="Delete Folder">
                <Trash
                  className="transition-colors dark:text-Neutrals/neutrals-7 hover:dark:text-white"
                  //onClick={deleteFile}
                  size={15}
                />
              </TooltipWrapper>
            </div>
          </div>
        </div>
      </AccordionTrigger>
    </AccordionItem>
  );
}
