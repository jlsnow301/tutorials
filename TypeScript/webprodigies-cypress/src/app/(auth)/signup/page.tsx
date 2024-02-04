"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { MailCheck } from "lucide-react";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Loader } from "@/components/global/Loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { actionSignupUser } from "@/lib/server-actions/auth-actions";

import Logo from "../../../../public/cypresslogo.svg";

const signupSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid Email" }),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm password")
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Schema = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";

    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExchangeError,
        "border-red-500/50": codeExchangeError,
        "text-red-700": codeExchangeError,
      }),
    [codeExchangeError],
  );

  const form = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(formData: Schema) {
    const { email, password } = formData;
    const { error } = await actionSignupUser({ email, password });

    if (error) {
      setSubmitError(error.message);
      form.reset();
      return;
    }

    setConfirmation(true);
  }

  function signupHandler() {
    console.log("");
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col space-y-6 sm:w-[400px] sm:justify-center"
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
        {!confirmation && !codeExchangeError && (
          <>
            <Button className="w-full p-6" disabled={isLoading} type="submit">
              {!isLoading ? "Create Account" : <Loader />}
            </Button>
          </>
        )}
        <FormField
          control={form.control}
          disabled={isLoading}
          name="email"
          render={({ field }) => (
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
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={isLoading}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {submitError && <FormMessage>{submitError}</FormMessage>}

        <span className="self-container">
          Already have an account?{" "}
          <Link className="text-primary" href="/login">
            Login
          </Link>
        </span>
      </form>
      {(confirmation || !!codeExchangeError) && (
        <Alert className={confirmationAndErrorStyles}>
          {!codeExchangeError && <MailCheck className="h-4 w-4" />}
          <AlertTitle>
            {codeExchangeError ? "Invalid Link." : "Check your email."}
          </AlertTitle>
          <AlertDescription>
            {codeExchangeError ?? "Confirmation has been sent."}
          </AlertDescription>
        </Alert>
      )}
    </Form>
  );
}
