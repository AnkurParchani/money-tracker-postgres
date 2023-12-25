import jwt, { JwtPayload } from "jsonwebtoken";

import { cookies } from "next/headers";
import { db } from "../../dbConnect";

export const getUserFromToken = async () => {
  const token = cookies().get("token")?.value;
  if (!token) return undefined;

  const verifyToken: string | JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
  );

  const userId = (verifyToken as JwtPayload).userId;

  if (!userId) return undefined;

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
    with: {
      transactions: true,
    },
  });

  return user;
};
