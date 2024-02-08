import { type PropsWithChildren } from "react";

import { CustomDialogTrigger } from "../global/custom-dialog";
import { SettingsForm } from "./settings-form";

export function Settings(props: PropsWithChildren) {
  const { children } = props;

  return (
    <CustomDialogTrigger content={<SettingsForm />} header="Settings">
      {children}
    </CustomDialogTrigger>
  );
}
