"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { type Workspace } from "@/lib/supabase/types";

type Props = {
  onClick?: (option: Workspace) => void;
  workspace: Workspace;
};

export function SelectedWorkspace(props: Props) {
  const { onClick, workspace } = props;
  const supabase = createClientComponentClient();

  const [workspaceLogo, setWorkspaceLogo] = useState("/cypresslogo.svg");

  useEffect(() => {
    if (workspace.logo) {
      const path = supabase.storage
        .from("workspace-logos")
        .getPublicUrl(workspace.logo)?.data.publicUrl;
      setWorkspaceLogo(path);
    }
  }, [workspace]);

  return (
    <Link
      className="my-2 flex cursor-pointer flex-row items-center justify-center gap-4 rounded-md p-2 transition-all hover:bg-muted"
      href={`/dashboard/${workspace.id}`}
      onClick={() => onClick?.(workspace)}
    >
      <Image
        alt="Workspace Logo"
        height={26}
        objectFit="cover"
        src={workspaceLogo}
        width={26}
      />
      <div className="flex flex-col">
        <p className="w-[170px] overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
          {workspace.title}
        </p>
      </div>
    </Link>
  );
}
