import { type PropsWithChildren } from "react";

export default function HomePageLayout(props: PropsWithChildren) {
  const { children } = props;

  return <main>{children}</main>;
}
