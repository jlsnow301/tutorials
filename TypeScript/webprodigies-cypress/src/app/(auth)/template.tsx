import { type PropsWithChildren } from "react";

export function Template(props: PropsWithChildren) {
  const { children } = props;

  return <div className="flex h-screen justify-center p-6">{children}</div>;
}
