import { type InferSelectModel } from "drizzle-orm";

import {
  type customers,
  type files,
  type folders,
  type prices,
  type products,
  type subscriptions,
  type users,
  type workspaces,
} from "../../../migrations/schema";

export type Workspace = InferSelectModel<typeof workspaces>;
export type User = InferSelectModel<typeof users>;
export type Folder = InferSelectModel<typeof folders>;
export type File = InferSelectModel<typeof files>;
export type Product = InferSelectModel<typeof products>;
export type Price = InferSelectModel<typeof prices> & { products?: Product };
export type Customer = InferSelectModel<typeof customers>;
export type Subscription = InferSelectModel<typeof subscriptions> & {
  prices: Price; 
};
export type ProductWithPrice = Product & { prices?: Price[] };
