import type { Context, Next } from "hono";
import type { Session } from "../types/auth-type";
import redisClient from "../config/redis";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const sessionToken = c.req.header("Authorization")?.split(" ")[1];
    if (!sessionToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const sessionStr = await redisClient.get(`session:${sessionToken}`);

    if (!sessionStr) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const session = JSON.parse(sessionStr) as Session;

    if (!session || session.expiresAt < Date.now()) {
      if (session) {
        await redisClient.del(`session:${sessionToken}`);
      }
      return c.json({ error: "Session expired" }, 401);
    }
    c.set("user", session);
    await next();
  } catch {
    return c.json({ error: "Invalid session" }, 401);
  }
};
