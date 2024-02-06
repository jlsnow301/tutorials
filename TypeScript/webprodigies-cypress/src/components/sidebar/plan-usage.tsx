"use client";

import { useEffect, useState } from "react";

import { MAX_FOLDERS_FREE_PLAN } from "@/lib/constants";
import { useAppState } from "@/lib/providers/state-provider";
import { type Subscription } from "@/lib/supabase/schema";

import { CypressDiamondIcon } from "../icons/cypressDiamondIcon";
import { Progress } from "../ui/progress";
import { NativeNavigation } from "./native-navigation";

type Props = {
  foldersLength: number | undefined;
  subscription: Subscription | undefined;
};

export function PlanUsage(props: Props) {
  const { foldersLength = 0, subscription } = props;
  const { state, workspaceId } = useAppState();

  const initialVal = (foldersLength / MAX_FOLDERS_FREE_PLAN) * 100;
  const [usagePercentage, setUsagePercentage] = useState(initialVal);

  useEffect(() => {
    const stateFoldersLength = state.workspaces.find(
      (workspace) => workspace.id === workspaceId,
    )?.folders.length;

    if (stateFoldersLength === undefined) return;

    setUsagePercentage((stateFoldersLength / MAX_FOLDERS_FREE_PLAN) * 100);
  }, [state, workspaceId]);

  return (
    <article className="mb-4">
      {subscription?.status !== "active" && (
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <div className="h-4 w-4">
            <CypressDiamondIcon />
          </div>
          <div className="flex w-full items-center justify-between">
            <div>Free Plan</div>
            <small>{usagePercentage.toFixed(0)}% / 100%</small>
            di
          </div>
        </div>
      )}
      {subscription?.status !== "active" && (
        <Progress className="h-1" value={usagePercentage} />
      )}
      <NativeNavigation myWorkspaceId={workspaceId} />
    </article>
  );
}
