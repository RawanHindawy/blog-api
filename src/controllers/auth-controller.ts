import type { Context } from "hono";
import * as AuthModel from "../models/auth-model";

export const register = async (c: Context) => {
  try {
    const { username, email, password } = await c.req.json();
    const result = await AuthModel.register(username, email, password);
    return c.json(result, 201);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
};

export const login = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();
    const result = await AuthModel.login(username, password);
    return c.json(result);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
};

export const logout = async (c: Context) => {
  const sessionToken = c.req.header("Authorization")?.split(" ")[1];
  if (sessionToken) {
    await AuthModel.logout(sessionToken);
  }
  return c.json({ message: "Logged out successfully" });
};
