import { z } from "zod";

export const formSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z.string().describe("Password").min(1, "Password is required"),
});

export type Form = z.infer<typeof formSchema>;
