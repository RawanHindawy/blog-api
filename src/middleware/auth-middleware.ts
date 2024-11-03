// import type { Context, Next } from "hono";
// import { redisClient } from "../config/redis";
// import type { Session } from "../types/auth-type";

// export const authMiddleware = async (c: Context, next: Next) => {
//   try {
//     const sessionToken = c.req.header("Authorization")?.split(" ")[1];
//     if (!sessionToken) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }

//     const session: Session | null = await redisClient.get(
//       `session:${sessionToken}`
//     );
//     if (!session || session.expiresAt < Date.now()) {
//       if (session) {
//         await redisClient.del(`session:${sessionToken}`);
//       }
//       return c.json({ error: "Session expired" }, 401);
//     }

//     const user = await redisClient.get(`user:${session.userId}`);
//     if (!user) {
//       return c.json({ error: "User not found" }, 401);
//     }

//     c.set("user", user);
//     await next();
//   } catch {
//     return c.json({ error: "Invalid session" }, 401);
//   }
// };
