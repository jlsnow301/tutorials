"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type AuthUser } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";

import { useAppState } from "@/lib/providers/state-provider";
import { createWorkspace } from "@/lib/supabase/queries";
import {
  type Subscription,
  type Workspace,
} from "@/lib/supabase/schema";
import { type WorkspaceForm } from "@/lib/types";

import { EmojiPicker } from "../global/emoji-picker";
import { Loader } from "../global/loader";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

type Props = {
  subscription: Subscription | undefined;
  user: AuthUser;
};

export function DashboardSetup(props: Props) {
  const { subscription, user } = props;

  const { toast } = useToast();
  const router = useRouter();
  const { dispatch } = useAppState();
  const [selectedEmoji, setSelectedEmoji] = useState("💼");
  const supabase = createClientComponentClient();

  const {
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
    register,
    reset,
  } = useForm<WorkspaceForm>({
    mode: "onChange",
    defaultValues: {
      logo: "",
      workspaceName: "",
    },
  });

  async function onSubmit(value: WorkspaceForm) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const file = value.logo?.[0] as File;
    let filePath = null;
    const workspaceUUID = v4();
    console.log(file);

    if (file) {
      try {
        const { data, error } = await supabase.storage
          .from("workspace-logos")
          .upload(`workspaceLogo.${workspaceUUID}`, file, {
            cacheControl: "3600",
            upsert: true,
          });
        if (error) throw new Error("");
        filePath = data.path;
      } catch (error) {
        console.log("Error", error);
        toast({
          variant: "destructive",
          title: "Error! Could not upload your workspace logo",
        });
      }
    }
    try {
      const newWorkspace: Workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: selectedEmoji,
        id: workspaceUUID,
        inTrash: "",
        title: value.workspaceName,
        workspaceOwner: user.id,
        logo: filePath ?? null,
        bannerUrl: "",
      };
      const { error: createError } = await createWorkspace(newWorkspace);
      if (createError) {
        throw new Error();
      }
      dispatch({
        type: "ADD_WORKSPACE",
        payload: { ...newWorkspace, folders: [] },
      });

      toast({
        title: "Workspace Created",
        description: `${newWorkspace.title} has been created successfully.`,
      });

      router.replace(`/dashboard/${newWorkspace.id}`);
    } catch (error) {
      console.log(error, "Error");
      toast({
        variant: "destructive",
        title: "Could not create your workspace",
        description:
          "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
      });
    } finally {
      reset();
    }
  }

  return (
    <Card
      className="h-screen
      w-[800px]
      sm:h-auto
  "
    >
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started.You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div
              className="flex
            items-center
            gap-4"
            >
              <div className="text-5xl">
                <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                  {selectedEmoji}
                </EmojiPicker>
              </div>
              <div className="w-full ">
                <Label
                  className="text-sm
                  text-muted-foreground
                "
                  htmlFor="workspaceName"
                >
                  Name
                </Label>
                <Input
                  disabled={isLoading}
                  id="workspaceName"
                  placeholder="Workspace Name"
                  type="text"
                  {...register("workspaceName", {
                    required: "Workspace name is required",
                  })}
                />
                <small className="text-red-600">
                  {errors?.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>
            <div>
              <Label
                className="text-sm
                  text-muted-foreground
                "
                htmlFor="logo"
              >
                Workspace Logo
              </Label>
              <Input
                accept="image/*"
                id="logo"
                placeholder="Workspace Name"
                type="file"
                {...register("logo", {
                  required: false,
                })}
              />
              <small className="text-red-600">
                {errors?.logo?.message?.toString()}
              </small>
              {subscription?.status !== "active" && (
                <small
                  className="
                  block
                  text-muted-foreground
              "
                >
                  To customize your workspace, you need to be on a Pro Plan
                </small>
              )}
            </div>
            <div className="self-end">
              <Button disabled={isLoading} type="submit">
                {!isLoading ? "Create Workspace" : <Loader />}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
