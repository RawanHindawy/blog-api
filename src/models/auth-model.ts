// import { OpaqueServer } from "@opaque-js/server";
// import { randomBytes } from "crypto";
// import { redisClient } from "../config/redis";
// import type { User, Session } from "../types/auth-type";

// const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// export const register = async (
//   username: string,
//   registrationRequest: any
// ): Promise<{ registrationResponse: any }> => {
//   const existingUser = await redisClient.get(`username:${username}`);
//   if (existingUser) {
//     throw new Error("Username already exists");
//   }

//   const opaque = new OpaqueServer();
//   const { publicKey, privateKey, verifier } =
//     await opaque.registerInit(registrationRequest);

//   const user: User = {
//     id: randomBytes(16).toString("hex"),
//     username,
//     serverPublicKey: publicKey,
//     serverPrivateKey: privateKey,
//     verifier,
//   };

//   await redisClient.set(`user:${user.id}`, JSON.stringify(user));
//   await redisClient.set(`username:${username}`, user.id);

//   return { registrationResponse: await opaque.registerComplete(verifier) };
// };

// export const login = async (
//   username: string,
//   loginRequest: any
// ): Promise<{ loginResponse: any; sessionToken: string }> => {
//   const userId = await redisClient.get(`username:${username}`);
//   if (!userId) {
//     throw new Error("Invalid credentials");
//   }

//   const user: User = JSON.parse(await redisClient.get(`user:${userId}`));
//   const opaque = new OpaqueServer();

//   const { loginResponse, sessionKey } = await opaque.login({
//     loginRequest,
//     serverPrivateKey: user.serverPrivateKey,
//     verifier: user.verifier,
//   });

//   const sessionToken = randomBytes(32).toString("hex");
//   const session: Session = {
//     userId: user.id,
//     sessionKey,
//     expiresAt: Date.now() + SESSION_DURATION,
//   };

//   await redisClient.set(`session:${sessionToken}`, JSON.stringify(session));

//   return { loginResponse, sessionToken };
// };

// export const logout = async (sessionToken: string): Promise<void> => {
//   if (!sessionToken) {
//     throw new Error("Invalid session token");
//   }
//   await redisClient.del(`session:${sessionToken}`);
// };
