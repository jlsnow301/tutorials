import * as userSchema from "./schemas/users";
import * as postSchema from "./schemas/posts";

export const schema = {
  ...userSchema,
  ...postSchema,
};
