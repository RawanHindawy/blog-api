// import type { Context } from "hono";
// import * as AuthModel from "../models/auth-model";

// export const register = async (c: Context) => {
//   const { username, registrationRequest } = await c.req.json();
//   const result = await AuthModel.register(username, registrationRequest);
//   return c.json(result, 201);
// };

// export const login = async (c: Context) => {
//   const { username, loginRequest } = await c.req.json();
//   const result = await AuthModel.login(username, loginRequest);
//   return c.json(result);
// };

// export const logout = async (c: Context) => {
//   const sessionToken = c.req.header("Authorization")?.split(" ")[1];
//   if (sessionToken) {
//     await AuthModel.logout(sessionToken);
//   }
//   return c.json({ message: "Logged out successfully" });
// };
