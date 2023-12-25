"use server";

import { transactions } from "@/db/schema/transactionSchema";
import { db } from "../../dbConnect";
import { getUser } from "./users";
import { revalidatePath } from "next/cache";

// const connectDB = async () => await connect();
// connectDB();

export const addTransaction = async (e: FormData) => {
  const desc = e.get("desc") as string;
  const type = e.get("type") as string;
  const amount = e.get("amount");

  try {
    const user = await getUser();
    if (!user) throw new Error("Login first");

    await db
      .insert(transactions)
      // @ts-ignore
      .values({ desc, type, amount, userId: user.id })
      .returning();
  } catch (err) {
    return console.log("Error from addTransaction ", err);
  }

  revalidatePath("/transactions");
  return true;
};
