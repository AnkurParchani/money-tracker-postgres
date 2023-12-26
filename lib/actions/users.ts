"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { users } from "@/db/schema/userSchema";
import { db } from "../../dbConnect";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getUserFromToken } from "../auth/getUser";
import { transactions } from "@/db/schema/transactionSchema";

// const connectDB = async () => await connect();
// connectDB();

// Signup
export const signup = async (e: FormData) => {
  try {
    const name = e.get("name") as string;
    const email = e.get("email") as string;
    const password = e.get("password") as string;

    if (!name || !email || !password)
      throw new Error("Provide all the details");

    const hashedPassword = await bcrypt.hash(password, 6);

    const user = await db
      .insert(users)
      .values({ name, email, password: hashedPassword })
      .returning();

    const token = jwt.sign(
      { userId: user[0].id },
      process.env.JWT_SECRET_KEY as string,
    );

    cookies().set("token", token);
  } catch (err) {
    return console.log("Error from signup route", err);
  }
};

// Login
export const login = async (e: FormData) => {
  try {
    const email = e.get("email") as string;
    const password = e.get("password") as string;

    if (!email || !password) throw new Error("Provide all the details");

    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    // If no user found
    const checkCredentials =
      foundUser && (await bcrypt.compare(password, foundUser.password));

    if (!checkCredentials) throw new Error("Invalid username or password");

    // Generating token
    const token = jwt.sign(
      { userId: foundUser.id },
      process.env.JWT_SECRET_KEY as string,
    );

    cookies().set("token", token);
  } catch (err) {
    return console.log("Error from login route ", err);
  }
  redirect("/");
};

// Logout
export const logout = () => {
  cookies().delete("token");
  revalidatePath("/");

  return true;
};

// Getting all users
export const getUsers = async () => {
  const token = cookies().get("token")?.value;
  if (!token) return redirect("/login");

  try {
    const verifyToken: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
    );

    const userId = (verifyToken as JwtPayload).userId;

    if (userId) {
      const allUsers = await db.select().from(users);

      return allUsers;
    }
  } catch (err) {
    return console.log("Error from getUsers ", err);
  }
};

// Get particular user
export const getUser = async () => {
  try {
    const user = await getUserFromToken();
    return user;
  } catch (err) {
    return console.log("Error from getUsers ", err);
  }
};

// Updating the account
export const updateUser = async (e: FormData) => {
  const name = e.get("name") as string;
  const email = e.get("email") as string;
  try {
    const user = await getUser();

    if (!user) throw new Error("Invalid request");
    await db.update(users).set({ name, email }).where(eq(users.id, user.id));

    revalidatePath("/my-profile");
  } catch (err) {
    return console.log("Error from updateUser ", err);
  }
};

// Deleting account (deleting user)
export const deleteUser = async (e: FormData) => {
  const password = e.get("password");

  try {
    const user = await getUserFromToken();

    if (user) {
      const verifyPassword = await bcrypt.compare(
        password as string,
        user.password,
      );

      if (!verifyPassword) throw new Error("Invalid password");

      // Deleting transactions and user
      await db.delete(transactions).where(eq(transactions.userId, user.id));
      await db.delete(users).where(eq(users.id, user.id));

      cookies().delete("token");
    }
  } catch (err) {
    return console.log("Error from deleteUser", err);
  }

  revalidatePath("/");
  redirect("/register");
};
