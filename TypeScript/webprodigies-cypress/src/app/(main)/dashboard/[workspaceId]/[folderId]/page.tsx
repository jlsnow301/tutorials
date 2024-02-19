import { redirect } from "next/navigation";

import { QuillEditor } from "@/components/quill-editor";
import { getFolderDetails } from "@/lib/queries/folder";
import { type Folder } from "@/lib/supabase/schema";

export const dynamic = "force-dynamic";

type Props = {
  params: { folderId: string };
};

export default async function FolderPage(props: Props) {
  const {
    params: { folderId },
  } = props;

  const { data, error } = await getFolderDetails(folderId);
  if (error ?? !data?.length) redirect("/dashboard");

  return (
    <div className="relative">
      <QuillEditor
        dirDetails={data?.[0] ?? ({} as Folder)}
        dirType="folder"
        fileId={folderId}
      />
    </div>
  );
}
