"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";

import { useAppState } from "@/lib/providers/state-provider";
import { updateFile } from "@/lib/queries/file";
import { updateFolder } from "@/lib/queries/folder";
import { updateWorkspace } from "@/lib/queries/workspace";
import { type BannerForm } from "@/lib/zod";

import { Loader } from "../global/loader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  dirType: "workspace" | "file" | "folder";
  id: string;
};

export function BannerUploadForm(props: Props) {
  const { dirType, id } = props;

  const supabase = createClientComponentClient();
  const { dispatch, folderId, state, workspaceId } = useAppState();

  const {
    formState: { errors, isSubmitting: isUploading },
    handleSubmit,
    register,
    reset,
  } = useForm<BannerForm>({
    mode: "onChange",
    defaultValues: {
      banner: "",
    },
  });

  async function onSubmitHandler(values: BannerForm) {
    const file = values.banner?.[0];
    if (!file || !id) return;

    try {
      let filePath = null;

      async function uploadBanner() {
        const { data, error } = await supabase.storage
          .from("file-banners")
          .upload(`banner-${id}`, file, { cacheControl: "5", upsert: true });
        if (error) throw new Error();
        filePath = data.path;
      }

      switch (dirType) {
        case "file":
          if (!workspaceId || !folderId) return;
          await uploadBanner();
          dispatch({
            type: "UPDATE_FILE",
            payload: {
              file: { bannerUrl: filePath },
              fileId: id,
              folderId,
              workspaceId,
            },
          });
          await updateFile({ bannerUrl: filePath }, id);
          break;

        case "folder":
          if (!workspaceId || !folderId) return;
          await uploadBanner();
          dispatch({
            type: "UPDATE_FOLDER",
            payload: {
              folderId: id,
              folder: { bannerUrl: filePath },
              workspaceId,
            },
          });
          await updateFolder({ bannerUrl: filePath }, id);
          break;

        case "workspace":
          if (!workspaceId) return;
          await uploadBanner();
          dispatch({
            type: "UPDATE_WORKSPACE",
            payload: {
              workspace: { bannerUrl: filePath },
              workspaceId,
            },
          });

          await updateWorkspace({ bannerUrl: filePath }, id);
          break;
      }
    } catch (error) {}
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Label className="text-sm text-muted-foreground" htmlFor="bannerImage">
        Banner Image
      </Label>
      <Input
        accept="image/*"
        disabled={isUploading}
        id="bannerImage"
        type="file"
        {...register("banner", { required: "Banner Image is required" })}
      />
      <small className="text-red-600">
        {errors.banner?.message?.toString()}
      </small>
      <Button disabled={isUploading} type="submit">
        {!isUploading ? "Upload Banner" : <Loader />}
      </Button>
    </form>
  );
}
