"use client";

import { Search } from "lucide-react";
import {
  type ChangeEvent,
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { getUsersFromSearch } from "@/lib/queries/user";
import { type User } from "@/lib/supabase/schema";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type Props = PropsWithChildren<{
  existingCollaborators: User[];
  getCollaborator: (collaborator: User) => void;
}>;

export function CollaboratorSearch(props: Props) {
  const { children, existingCollaborators, getCollaborator } = props;
  const { user } = useSupabaseUser();
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  function addCollaborator(user: User) {
    getCollaborator(user);
  }

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    if (timerRef) clearTimeout(timerRef.current);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    timerRef.current = setTimeout(async () => {
      const res = await getUsersFromSearch(event.target.value);

      setSearchResults(res ?? []);
    }, 450);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="w-full">{children}</SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Search Collaborator</SheetTitle>
          <SheetDescription>
            <p className="text-sm text-muted-foreground">
              You can also remove collaborators after adding them via the
              settings tab.
            </p>
          </SheetDescription>
        </SheetHeader>
        <div className="md-2 flex items-center justify-center gap-2">
          <Search />
          <Input
            className="dark:bg-background"
            name="name"
            onChange={onChangeHandler}
          />
        </div>
        <ScrollArea className="mt-6 w-full overflow-y-scroll rounded-md">
          {searchResults
            .filter(
              (result) =>
                !existingCollaborators.some(
                  (existing) => existing.id === result.id,
                ),
            )
            .filter((result) => result.id !== user?.id)
            .map((user) => (
              <div
                className="flex items-center justify-between p-4"
                key={user.id}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/7.png" />
                    <AvatarFallback>DC</AvatarFallback>
                  </Avatar>
                  <div className="w-[180px] gap-2 overflow-hidden overflow-ellipsis text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
                <Button
                  onClick={() => addCollaborator(user)}
                  variant="secondary"
                >
                  Add
                </Button>
              </div>
            ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
