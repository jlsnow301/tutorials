import { z } from "zod";

export const formSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z.string().describe("Password").min(1, "Password is required"),
});

export type Form = z.infer<typeof formSchema>;

export const workspaceFormSchema = z.object({
  workspaceName: z
    .string()
    .describe("Workspace Name")
    .min(1, "Workspace name must be at least one character."),
  logo: z.any(),
});

export type WorkspaceForm = z.infer<typeof workspaceFormSchema>;
