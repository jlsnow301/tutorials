import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getUserSubscriptionStatus,
} from "@/lib/supabase/queries";

import { ScrollArea } from "../ui/scroll-area";
import { FoldersDropDownList } from "./folders-dropdown-list";
import { NativeNavigation } from "./native-navigation";
import { PlanUsage } from "./plan-usage";
import { WorkspaceDropdown } from "./workspace-dropdown";

type Props = {
  className?: string;
  params: { workspaceId: string };
};

export async function Sidebar(props: Props) {
  const { className, params } = props;
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  const { data: folderData, error: folderError } = await getFolders(
    params.workspaceId,
  );

  if (subscriptionError ?? folderError) redirect("/dashboard");

  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);

  const defaultVal = [
    ...privateWorkspaces,
    ...collaboratingWorkspaces,
    ...sharedWorkspaces,
  ].find((workspace) => workspace.id === params.workspaceId);

  return (
    <aside
      className={twMerge(
        "hidden w-[280px] shrink-0 !justify-between p-4 sm:flex sm:flex-col md:gap-4",
        className,
      )}
    >
      <div>
        <WorkspaceDropdown
          collaboratingWorkspaces={collaboratingWorkspaces}
          defaultValue={defaultVal}
          privateWorkspaces={privateWorkspaces}
          sharedWorkspaces={sharedWorkspaces}
        />
        <PlanUsage
          foldersLength={folderData?.length}
          subscription={subscriptionData}
        />
        <NativeNavigation myWorkspaceId={params.workspaceId} />
        <ScrollArea className="relative h-[450px] overflow-scroll">
          <div className="pointer-events-none absolute bottom-0 z-40 h-20 w-full bg-gradient-to-t from-background to-transparent" />
          <FoldersDropDownList
            workspaceFolders={folderData ?? []}
            workspaceId={params.workspaceId}
          />
        </ScrollArea>
      </div>
    </aside>
  );
}
