import { type PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  params: any;
}>;

export default function DashboardLayout(props: Props) {
  const { children } = props;

  return <main className="over-hidden flex h-screen">{children}</main>;
}
