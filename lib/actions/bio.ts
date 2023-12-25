"use server";

import { bios } from "@/db/schema/bioSchema";
import { db } from "../../dbConnect";
import { getUser } from "./users";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Adding bio to Bio table
export const addBio = async (e: FormData) => {
  const bio = e.get("bio") as string;
  if (!bio) throw new Error("Enter bio");

  try {
    const user = await getUser();
    if (!user) throw new Error("No user found to get userid for the bio");
    await db.insert(bios).values({ bio, userId: user.id });
  } catch (err) {
    return console.log("Error from addBio", err);
  }

  redirect("/");
};

// Getting Bio of the logged in user
export const getBio = async () => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Login first");

    const [bio] = await db.select().from(bios).where(eq(bios.userId, user.id));

    return bio;
  } catch (err) {
    return console.log("Error from getBio ", getBio);
  }
};

// Updating the bio
export const updateBio = async (e: FormData) => {
  const bio = e.get("bio") as string;
  try {
    const user = await getUser();
    if (!user) throw new Error("Invalid request");

    await db.update(bios).set({ bio }).where(eq(bios.userId, user.id));

    revalidatePath("/my-profile");
  } catch (error) {
    return console.log("Error from updateBio ", error);
  }
};
