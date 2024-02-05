import { type PropsWithChildren } from "react";

import { Sidebar } from "@/components/sidebar";

type Props = PropsWithChildren<{
  params: any;
}>;

export default function DashboardLayout(props: Props) {
  const { children, params } = props;

  return (
    <main className="flex h-screen w-screen overflow-hidden">
      <Sidebar params={params} />
      <div className="dark:border-Neutrals-12/70 relative w-full overflow-scroll border-l-[1px]">
        {children}
      </div>
    </main>
  );
}
