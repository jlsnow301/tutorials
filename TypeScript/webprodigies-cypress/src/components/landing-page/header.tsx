"use client";

import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type PropsWithChildren,
  useState,
} from "react";

import { cn } from "@/lib/utils";

import Logo from "../../../public/cypresslogo.svg";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

const routes = [
  { title: "Features", href: "#features" },
  { title: "Resources", href: "#resources" },
  { title: "Pricing", href: "#pricing" },
  { title: "Testimonials", href: "#testimonial" },
];

const components: { description: string; href: string; title: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function Header() {
  const [path, setPath] = useState("#products");

  return (
    <header className="flex items-center justify-center p-4">
      <Link className="justify-left flex w-full items-center gap-2" href="/">
        <Image
          alt="Cypress Logo"
          height={25}
          src={Logo as StaticImport}
          width={25}
        />
        <span className="font-semibold dark:text-white">cypress</span>
      </Link>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList className="gap-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn({
                "dark:text-white": path === "#resources",
                "dark:text-white/40": path !== "resources",
                "font-normal": true,
                "text-xl": true,
              })}
              onClick={() => setPath("#resources")}
            >
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <span className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none">
                    Welcome
                  </span>
                </li>
                <ListItem href="#" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="#" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="#" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn({
              "dark:text-white": path === "#resources",
              "dark:text-white/40": path !== "resources",
              "font-normal": true,
              "text-xl": true,
            })}
            onClick={() => setPath("#pricing")}
          >
            Pricing
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="md:grid-row-2 grid w-[400px] gap-3 p-4">
              <ListItem href="#" title="Pro Plan">
                Unlock full power with collaboration.
              </ListItem>
              <ListItem href="#" title="Free Plan">
                Great for teams just starting out.
              </ListItem>
            </ul>
          </NavigationMenuContent>
          <NavigationMenuItem>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map(({ description, href, title }) => (
                  <ListItem href={href} key={title} title={title}>
                    {description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#">
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), {
                  "dark:text-white": path === "#testimonials",
                  "dark:text-white/40": path !== "#testimonials",
                  "font-normal": true,
                  "text-xl": true,
                })}
              >
                Testimonials
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <aside className="flex w-full justify-end gap-2">
        <Link href="/login">
          <Button className="hidden p-1 sm:block" variant="btn-secondary">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="whitespace-nowrap" variant="btn-primary">
            Sign Up
          </Button>
        </Link>
      </aside>
    </header>
  );
}

type ListItemProps = PropsWithChildren<{
  className?: string;
  title?: string;
}>;

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  function ListItem(props: ListItemProps, forwardedRef) {
    const { children, className, title, ...rest } = props;

    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            className={cn(
              "group block select-none space-y-1 font-medium leading-none",
              className,
            )}
            ref={forwardedRef}
            {...rest}
          >
            <div className="text-sm font-medium leading-none text-white">
              {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-white/40 group-hover:text-white/70">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
