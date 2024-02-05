import clsx from "clsx";
import { type PropsWithChildren, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type Props = PropsWithChildren<
  Partial<{
    className: string;
    content: ReactNode;
    description: string;
    header: string;
  }>
>;

export function CustomDialogTrigger(props: Props) {
  const { children, className, content, description, header } = props;

  return (
    <Dialog>
      <DialogTrigger className={clsx("", className)}>{children}</DialogTrigger>
      <DialogContent className="block h-screen w-full overflow-scroll sm:h-[440px]">
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
