"use client";

import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

import { useAppState } from "@/lib/providers/state-provider";
import { createFolder } from "@/lib/supabase/queries";
import { type Folder } from "@/lib/supabase/schema";

import { TooltipWrapper } from "../global/tooltip-wrapper";
import { useToast } from "../ui/use-toast";

type Props = {
  workspaceFolders: Folder[];
  workspaceId: string;
};

export function FoldersDropDownList(props: Props) {
  const { workspaceFolders, workspaceId } = props;
  const { toast } = useToast();

  const { dispatch, state } = useAppState();
  const [folders, setFolders] = useState<Folder[]>([]);

  async function addFolder() {
    const newFolder: Folder = {
      data: null,
      id: v4(),
      createdAt: new Date().toISOString(),
      title: "Untitled",
      iconId: "📜",
      inTrash: null,
      workspaceId,
      bannerUrl: "",
      logo: "",
    };

    dispatch({
      type: "ADD_FOLDER",
      payload: { workspaceId, folder: { ...newFolder, files: [] } },
    });
    const { data, error } = await createFolder(newFolder);
    if (error) {
      toast({
        title: "error",
        variant: "destructive",
        description: "Could not create folder.",
      });
      return;
    }

    toast({
      title: "success",
      description: "Created folder.",
    });
  }

  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: "SET_FOLDERS",
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((f) => f.id === folder.id)?.files ?? [],
          })),
        },
      });
    }
  }, [workspaceFolders, workspaceId]);

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders ?? [],
    );
  }, [state]);

  return (
    <>
      <div className="stick group/title top-0 z-20 flex h-10 w-full items-center justify-between bg-background pr-4 text-Neutrals/neutrals-8">
        <span className="text-Neutrals-8 text-xs font-bold">FOLDERS</span>
        <TooltipWrapper message="Create Folder">
          <PlusIcon
            className="hidden cursor-pointer group-hover/title:inline-block hover:dark:text-white"
            onClick={addFolder}
            size={16}
          />
        </TooltipWrapper>
      </div>
    </>
  );
}
