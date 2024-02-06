"use client";

import dynamic from "next/dynamic";
import { type PropsWithChildren } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = PropsWithChildren<{
  getValue?: (emoji: string) => void;
}>;

type Selection = {
  emoji: string;
};

export function EmojiPicker(props: Props) {
  const { children, getValue } = props;
  const Picker = dynamic(() => import("emoji-picker-react"));

  function onClick(selected: Selection) {
    getValue?.(selected.emoji);
  }

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
        <PopoverContent className="border-none p-0">
          <Picker onEmojiClick={onClick} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
