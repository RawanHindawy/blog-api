import db from "../db";
import { generateSessionToken, createSession } from "../utils/auth-utils";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import redisClient from "../config/redis";

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  if (!username || !email || !password) {
    throw new Error("Username, email and password are required");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);
  if (existingUser && existingUser.length > 0) {
    throw new Error("Username already taken");
  }

  const dbUser = await db
    .insert(users)
    .values({
      username,
      email,
      password,
    })
    .returning();

  const sessionToken = generateSessionToken();
  const session = createSession(dbUser[0].id, dbUser[0].username);
  await redisClient.set(`session:${sessionToken}`, JSON.stringify(session));

  return {
    sessionToken,
    message: "user registered successsfully",
  };
};

export const login = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const userStr = await db
    .select()
    .from(users)
    .where(eq(users.username, username) && eq(users.password, password))
    .limit(1);

  if (!userStr || userStr.length === 0) {
    throw new Error("Invalid credentials");
  }

  const dbUser = userStr[0];

  const sessionToken = generateSessionToken();
  const session = createSession(dbUser.id, dbUser.username);

  await redisClient.set(`session:${sessionToken}`, JSON.stringify(session));

  return {
    sessionToken,
  };
};

export const logout = async (sessionToken: string) => {
  await redisClient.del(`session:${sessionToken}`);
};
