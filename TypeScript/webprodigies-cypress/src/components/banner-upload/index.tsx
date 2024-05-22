import { type PropsWithChildren } from "react";

import { CustomDialogTrigger } from "../global/custom-dialog";
import { BannerUploadForm } from "./banner-upload-form";

type Props = {
  className?: string;
  dirType: "workspace" | "file" | "folder";
  id: string;
} & PropsWithChildren;

export function BannerUpload(props: Props) {
  const { children, className, dirType, id } = props;

  return (
    <CustomDialogTrigger
      className={className}
      content={<BannerUploadForm dirType={dirType} id={id} />}
      header="Upload Banner"
    >
      {children}
    </CustomDialogTrigger>
  );
}
