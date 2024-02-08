"use client";

import { Lock, Plus, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 } from "uuid";

import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { addCollaborators } from "@/lib/queries/user";
import { createWorkspace } from "@/lib/queries/workspace";
import { type User, type Workspace } from "@/lib/supabase/schema";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";
import { CollaboratorSearch } from "./collaborator-search";

export function WorkspaceCreator() {
  const { user } = useSupabaseUser();
  const { toast } = useToast();
  const router = useRouter();

  const [permissions, setPermissions] = useState("private");
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function addCollaborator(user: User) {
    setCollaborators([...collaborators, user]);
  }

  function removeCollaborator(user: User) {
    setCollaborators(collaborators.filter((c) => c.id !== user.id));
  }

  async function createItem() {
    if (!user?.id) return;

    setIsLoading(true);
    const uuid = v4();

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
      toast({ title: "Success", description: "Created private workspace" });
      router.refresh();
    } else if (permissions === "shared") {
      await createWorkspace(newWorkspace);
      addCollaborators(collaborators, uuid);
      toast({ title: "Success", description: "Created shared workspace" });
      router.refresh();
    }

    setIsLoading(false);
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
      {permissions === "shared" && (
        <div>
          <CollaboratorSearch
            existingCollaborators={collaborators}
            getCollaborator={(user) => addCollaborator(user)}
          >
            <Button className="mt-4 text-sm" type="button">
              <Plus />
              Add Collaborators
            </Button>
          </CollaboratorSearch>
          <div className="mt-4">
            <span className="text-sm text-muted-foreground">
              Collaborators {collaborators.length || ""}
            </span>
            <ScrollArea className="h-[120px] w-full overflow-y-scroll rounded-md border border-muted-foreground/20 ">
              {collaborators.length ? (
                collaborators.map((c) => (
                  <div
                    className="flex items-center justify-between p-4"
                    key={c.id}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/avatars/7.png" />
                        <AvatarFallback>TJ</AvatarFallback>
                      </Avatar>
                      <div className="w-[140px] gap-2 overflow-hidden overflow-ellipsis text-sm text-muted-foreground sm:w-[300px]">
                        {c.email}
                      </div>
                    </div>
                    <Button
                      onClick={() => removeCollaborator(c)}
                      variant="secondary"
                    >
                      Remove
                    </Button>
                  </div>
                ))
              ) : (
                <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    You have no collaborators.
                  </span>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      )}
      <Button
        disabled={
          !title ||
          (permissions === "shared" && collaborators.length === 0) ||
          isLoading
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
