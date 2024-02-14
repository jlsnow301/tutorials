import { redirect } from "next/navigation";

import { QuillEditor } from "@/components/quill-editor";
import { getWorkspaceDetails } from "@/lib/queries/workspace";

export const dynamic = "force-dynamic";

type Props = {
  params: { workspaceId: string };
};

export default async function WorkspacePage(props: Props) {
  const {
    params: { workspaceId },
  } = props;

  const { data, error } = await getWorkspaceDetails(workspaceId);
  if (!!error || !data) redirect("/dashboard");

  return (
    <div className="relative">
      <QuillEditor
        dirDetails={data[0] ?? {}}
        dirType="workspace"
        fileId={workspaceId}
      />
    </div>
  );
}
