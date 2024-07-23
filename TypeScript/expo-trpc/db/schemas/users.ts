import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { posts } from "./posts";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const usersRelations = relations(users, ({ many }) => ({
  author: many(posts, { relationName: "author" }),
  reviewer: many(posts, { relationName: "reviewer" }),
}));
