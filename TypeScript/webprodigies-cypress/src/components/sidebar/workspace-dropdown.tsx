"use client";

import { useEffect, useState } from "react";

import { useAppState } from "@/lib/providers/state-provider";
import { type Workspace } from "@/lib/supabase/schema";

import { CustomDialogTrigger } from "../global/custom-dialog";
import { WorkspaceCreator } from "../global/workspace-creator";
import { SelectedWorkspace } from "./selected-workspace";

type Props = {
  collaboratingWorkspaces: Workspace[];
  defaultValue: Workspace | undefined;
  privateWorkspaces: Workspace[];
  sharedWorkspaces: Workspace[];
};

export function WorkspaceDropdown(props: Props) {
  const {
    collaboratingWorkspaces,
    defaultValue,
    privateWorkspaces,
    sharedWorkspaces,
  } = props;
  const { dispatch, state } = useAppState();
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workspace) => ({ ...workspace, folders: [] })),
        },
      });
    }
  }, [collaboratingWorkspaces, privateWorkspaces, sharedWorkspaces]);

  function handleSelect(option: Workspace) {
    setSelectedOption(option);
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <span onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? (
            <SelectedWorkspace workspace={selectedOption} />
          ) : (
            "Select a workspace"
          )}
        </span>
      </div>
      {isOpen && (
        <div className="group absolute z-50 h-[190px] w-full origin-top-right overflow-scroll rounded-md border-[1px] border-muted bg-black/10 shadow-md backdrop-blur-lg">
          <div className="flex flex-col rounded-md">
            <div className="!p-2">
              {!!privateWorkspaces.length && (
                <>
                  <p>
                    <hr></hr>
                    {privateWorkspaces.map((option) => (
                      <SelectedWorkspace
                        key={option.id}
                        onClick={handleSelect}
                        workspace={option}
                      />
                    ))}
                  </p>
                </>
              )}
            </div>
            <div className="!p-2">
              {!!sharedWorkspaces.length && (
                <>
                  <p>
                    <hr></hr>
                    {sharedWorkspaces.map((option) => (
                      <SelectedWorkspace
                        key={option.id}
                        onClick={handleSelect}
                        workspace={option}
                      />
                    ))}
                  </p>
                </>
              )}
            </div>
            <div className="!p-2">
              {!!collaboratingWorkspaces.length && (
                <>
                  <p>
                    <hr></hr>
                    {collaboratingWorkspaces.map((option) => (
                      <SelectedWorkspace
                        key={option.id}
                        onClick={handleSelect}
                        workspace={option}
                      />
                    ))}
                  </p>
                </>
              )}
            </div>
            <CustomDialogTrigger
              content={<WorkspaceCreator />}
              description="Workspaces give you the power to collaborate with others. You can also adjust your workspace privacy settings after creating the workspace too."
              header="Create a Workspace"
            >
              <div className="flex w-full items-center justify-center gap-2 p-2 transition-all hover:bg-muted">
                <article className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                  +
                </article>
                Create Workspace
              </div>
            </CustomDialogTrigger>
          </div>
        </div>
      )}
    </div>
  );
}
