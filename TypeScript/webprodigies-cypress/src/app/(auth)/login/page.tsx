"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { actionLoginUser } from "@/lib/server-actions/auth-actions";
import { type Form as FormType, formSchema } from "@/lib/types";

import Logo from "../../../../public/cypresslogo.svg";

export default function LoginPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<FormType>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(formData: FormType) {
    const { error } = await actionLoginUser(formData);

    if (error) {
      form.reset();
      setSubmitError(error.message);
      return;
    }

    await router.replace("/dashboard");
  }

  return (
    <Form {...form}>
      <form
        className="flex-center flex w-full space-y-6 sm:w-[400px] sm:justify-center "
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Link className="justify-left flex w-full items-center" href="/">
          <Image
            alt="Cypress Logo"
            height={50}
            src={Logo as StaticImport}
            width={50}
          />
          <span className="text-4xl font-semibold first-letter:ml-2 dark:text-white">
            cypress.
          </span>
        </Link>
        <FormDescription className="text-foreground/60">
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>
        <FormField
          control={form.control}
          disabled={isLoading}
          name="email"
          render={(field) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={isLoading}
          name="password"
          render={(field) => (
            <FormItem>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          className="w-full p-6"
          disabled={isLoading}
          size="lg"
          type="submit"
        >
          {!isLoading ? "Login" : <Loader />}
        </Button>
        <span className="self-container">
          Don&apos;t have an account?{" "}
          <Link className="text-primary" href="/signup">
            Sign Up
          </Link>
        </span>
      </form>
    </Form>
  );
}
