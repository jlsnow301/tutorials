import db from "./db";
import { type Subscription } from "./types";

export async function getUserSubscriptionStatus(userId: string) {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (found, { eq }) => eq(found.userId, userId),
    });

    if (!data) throw new Error("No Data found");
    
    return { data: data as Subscription, error: null };
  } catch (error) {
    console.log(error);
    return { data: undefined, error: `Error ${error as string}` };
  }
}
