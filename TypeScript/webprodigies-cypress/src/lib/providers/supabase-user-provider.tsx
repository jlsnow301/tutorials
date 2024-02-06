"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type AuthUser } from "@supabase/supabase-js";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "@/components/ui/use-toast";

import { getUserSubscriptionStatus } from "../supabase/queries";
import { type Subscription } from "../supabase/schema";

type ContextType = {
  subscription: Subscription | undefined;
  user: AuthUser | undefined;
};

const supabaseUserContext = createContext<ContextType>({
  user: undefined,
  subscription: undefined,
});

export function useSupabaseUser() {
  return useContext(supabaseUserContext);
}

export function SupabaseUserProvider(props: PropsWithChildren) {
  const { children } = props;
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<AuthUser>();
  const [subscription, setSubscription] = useState<Subscription>();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUser(user);
      const { data, error } = await getUserSubscriptionStatus(user.id);

      if (data) setSubscription(data);
      if (error) {
        toast({
          title: "Unexpected error",
          description: "Oops! An unexpected error occurred. Try again later.",
        });
      }
    }
    void getUser();
  }, [supabase]);

  return (
    <supabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </supabaseUserContext.Provider>
  );
}
