"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Briefcase, Lock, Plus, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

import { useAppState } from "@/lib/providers/state-provider";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import {
  addCollaborators,
  deleteWorkspace,
  removeCollaborators,
  updateWorkspace,
} from "@/lib/supabase/queries";
import { type User, type Workspace } from "@/lib/supabase/schema";

import { CollaboratorSearch } from "../global/collaborator-search";
import { Alert, AlertDescription } from "../ui/alert";
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
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";

export function SettingsForm() {
  const { toast } = useToast();
  const { user } = useSupabaseUser();
  const { dispatch, state, workspaceId } = useAppState();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [permissions, setPermissions] = useState("Private");
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [workspaceDetails, setWorkspaceDetails] = useState<Workspace>();
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  async function addCollaborator(user: User) {
    if (!workspaceId) return;

    await addCollaborators(collaborators, workspaceId);
    setCollaborators([...collaborators, user]);

    router.refresh();
  }

  async function onDeleteWorkspace() {
    if (!workspaceId) return;

    const { error } = await deleteWorkspace(workspaceId);
    if (error) {
      toast({
        title: "Error",
        description: "Error while deleting workspace",
      });

      return;
    }

    dispatch({ type: "DELETE_WORKSPACE", payload: workspaceId });
    toast({
      title: "Success",
      description: "Workspace has been deleted",
    });
  }

  function onChange() {
    //
  }

  function onClick() {
    //
  }

  async function removeCollaborator(user: User) {
    if (!workspaceId) return;

    if (collaborators.length === 1) {
      setPermissions("Private");
    }

    await removeCollaborators([user], workspaceId);
    setCollaborators(collaborators.filter((c) => c.id !== user.id));
  }

  async function workspaceIconChange(evt: ChangeEvent<HTMLInputElement>) {
    if (!workspaceId) return;

    const file = evt.target.files?.[0];
    if (!file) return;

    const uuid = v4();
    setUploadingLogo(true);

    const { data, error } = await supabase.storage
      .from("workspace-logos")
      .upload(`workspaceLogo.${uuid}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to upload icon",
      });
      return;
    }

    dispatch({
      type: "UPDATE_WORKSPACE",
      payload: { workspace: { logo: data.path }, workspaceId },
    });

    await updateWorkspace({ logo: data.path }, workspaceId);

    toast({
      title: "Success",
      description: "Uploaded icon",
    });
  }

  function workspaceNameChange(evt: ChangeEvent<HTMLInputElement>) {
    if (!workspaceId || !evt.target.value) return;

    dispatch({
      type: "UPDATE_WORKSPACE",
      payload: { workspace: { title: evt.target.value }, workspaceId },
    });

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      void updateWorkspace({ title: evt.target.value }, workspaceId);
    }, 500);
  }

  useEffect(() => {
    const showingWorkspace = state.workspaces.find(
      (workspace) => workspace.id === workspaceId,
    );

    if (showingWorkspace) setWorkspaceDetails(showingWorkspace);
  }, [workspaceId, state]);

  return (
    <div className="flex flex-col gap-4">
      <p className="mt-6 flex items-center gap-2">
        <Briefcase size={20} />
      </p>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label
          className="text-sm text-muted-foreground"
          htmlFor="workspaceName"
        >
          Name
        </Label>
        <Input
          name="workspaceName"
          onChange={workspaceNameChange}
          placeholder="Name"
          value={workspaceDetails?.title ?? ""}
        />
        <Label
          className="text-sm text-muted-foreground"
          htmlFor="workspaceLogo"
        >
          Workspace Logo
        </Label>
        <Input
          accept="image/*"
          disabled={uploadingLogo}
          name="workspaceLogo"
          onChange={workspaceIconChange}
          placeholder="Workspace Logo"
          type="file"
        />
      </div>
      <>
        <Label htmlFor="permissions">Permissions</Label>
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
        <Alert variant="destructive">
          <AlertDescription>
            Warning! Deleting your workspace will permanently delete all the
            data related to this workspace.
          </AlertDescription>
          <Button
            className="mt-4 border-2 border-destructive bg-destructive/40 text-sm"
            onClick={onDeleteWorkspace}
            size="sm"
            type="submit"
            variant="destructive"
          >
            a
          </Button>
        </Alert>
      </>
    </div>
  );
}
