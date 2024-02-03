import { type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

type Props = Partial<{
  cardContent: ReactNode;
  cardFooter: ReactNode;
  cardHeader: ReactNode;
}> &
  ComponentProps<typeof Card>;

export function CustomCard(props: Props) {
  const { cardContent, cardFooter, cardHeader, className, ...rest } = props;

  return (
    <Card className={cn("w-[380px]", className)} {...rest}>
      <CardHeader>{cardHeader}</CardHeader>
      <CardContent>{cardContent}</CardContent>
      <CardFooter>{cardFooter}</CardFooter>
    </Card>
  );
}
