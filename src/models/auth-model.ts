// import { redisClient } from "../config/redis";
import db from "../db";
import type { Session, User } from "../types/auth-type";
import {
    hashPassword,
    generateSalt,
    generateSessionToken,
    generateUserId,
    createSession,
    SESSION_EXPIRY_SECONDS
} from "../utils/auth-utils";
import { users, categories, tags, posts, comments } from "../db/schema";
import { eq } from "drizzle-orm";
import redisClient from "../config/redis";

// export const register = async (username: string, registrationRequest: { password: string }) => {

//     if (!username || !registrationRequest.password) {
//         throw new Error("Username and password are required");
//     }

//     if (registrationRequest.password.length < 8) {
//         throw new Error("Password must be at least 8 characters long");
//     }

//     const existingUser = await db.select().from(users).where(eq(users.username, username)).limit(1);
//     if (existingUser) {
//         throw new Error("Username already taken");
//     }

//     const salt = generateSalt();
//     const hashedPassword = hashPassword(registrationRequest.password, salt);

//     const user: User = {
//         id: generateUserId(),
//         username,
//         hashedPassword,
//         salt,
//         createdAt: Date.now()
//     };

//     await redisClient.set(`user:${username}`, JSON.stringify(user));

//     return { message: "User registered successfully" };
// };

export const login = async (username: string, password: string) => {

    if (!username || !password) {
        throw new Error("Username and password are required");
    }

    const userStr = await db.select().from(users)
        .where(eq(users.username, username) && eq(users.password, password)).limit(1);

    if (!userStr || userStr.length === 0) {
        throw new Error("Invalid credentials");
    }

    const dbUser = userStr[0];

    const sessionToken = generateSessionToken();
    const session = createSession(dbUser.id, dbUser.username);

    await redisClient.set(
        `session:${sessionToken}`,
        JSON.stringify(session)
    );

    const sessionStr = await redisClient.get(`session:${sessionToken}`);
    console.log(sessionStr)

    return {
        sessionToken,
    };
};

// export const logout = async (sessionToken: string) => {
//     await redisClient.del(`session:${sessionToken}`);
// };

// export const validateSession = async (sessionToken: string): Promise<Session | null> => {
//     const sessionStr = await redisClient.get(`session:${sessionToken}`);
//     if (!sessionStr) {
//         return null;
//     }

//     const session: Session = JSON.parse(sessionStr as string);
//     if (session.expiresAt < Date.now()) {
//         await redisClient.del(`session:${sessionToken}`);
//         return null;
//     }

//     return session;
// };

