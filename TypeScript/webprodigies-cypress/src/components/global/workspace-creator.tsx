"use client";

import { Lock, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 } from "uuid";

import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { type User, type Workspace } from "@/lib/supabase/drizzle-types";
import { addCollaborators, createWorkspace } from "@/lib/supabase/queries";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function WorkspaceCreator() {
  const { user } = useSupabaseUser();
  const router = useRouter();

  const [permissions, setPermissions] = useState("private");
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<User[]>([]);

  function addCollaborator(user: User) {
    setCollaborators([...collaborators, user]);
  }

  function removeCollaborator(user: User) {
    setCollaborators(collaborators.filter((c) => c.id !== user.id));
  }

  async function createItem() {
    const uuid = v4();
    if (user?.id) {
      const newWorkspace: Workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: "",
        id: uuid,
        inTrash: "",
        title,
        workspaceOwner: user.id,
        logo: null,
        bannerUrl: "",
      };

      if (permissions === "private") {
        await createWorkspace(newWorkspace);
        router.refresh();
      }
      if (permissions === "shared") {
        await createWorkspace(newWorkspace);
        await addCollaborators(collaborators, uuid);
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label className="text-sm text-muted-foreground" htmlFor="name">
          Name
        </Label>
        <div className="flex items-center justify-center gap-2">
          <Input
            name="name"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Workspace Name"
            value={title}
          />
        </div>
      </div>
      <>
        <Label className="text-sm text-muted-foreground" htmlFor="permissions">
          Permission
        </Label>
        <Select
          defaultValue={permissions}
          onValueChange={(val) => setPermissions(val)}
        >
          <SelectTrigger className="h-26 -mt-3 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="private">
                <div className="flex items-center justify-center gap-4 p-2">
                  <Lock />
                  <article className="flex flex-col text-left">
                    <span>Private</span>
                    <p>
                      Your workspace is private to you. You can choose to share
                      it later.
                    </p>
                  </article>
                </div>
              </SelectItem>
              <SelectItem value="shared">
                <div className="flex items-center justify-center gap-4 p-2">
                  <Share />
                  <article className="flex flex-col text-left">
                    <span>Shared</span>
                    <p>You can invite collaborators.</p>
                  </article>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </>
      {permissions === "shared" && <div></div>}
      <Button
        disabled={
          !title || (permissions === "shared" && collaborators.length === 0)
        }
        onClick={() => createItem()}
        type="button"
        variant="secondary"
      >
        Create
      </Button>
    </div>
  );
}
