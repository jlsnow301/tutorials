import { redirect } from "next/navigation";

import { QuillEditor } from "@/components/quill-editor";
import { getFileDetails } from "@/lib/queries/file";
import { type File } from "@/lib/supabase/schema";

export const dynamic = "force-dynamic";

type Props = {
  params: { fileId: string };
};

export default async function FilePage(props: Props) {
  const {
    params: { fileId },
  } = props;

  const { data, error } = await getFileDetails(fileId);
  if (error ?? data?.length) redirect("/dashboard");

  return (
    <div className="relative">
      <QuillEditor
        dirDetails={data[0] ?? ({} as File)}
        dirType="file"
        fileId={fileId}
      />
    </div>
  );
}
