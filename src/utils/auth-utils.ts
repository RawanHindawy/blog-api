import { v4 as uuidv4 } from "uuid";
import type { Session } from "../types/auth-type";

export const generateSessionToken = (): string => {
  return uuidv4();
};

export const createSession = (userId: number, username: string): Session => {
  return {
    userId,
    username,
    createdAt: Date.now(),
    expiresAt: Date.now() + 12 * 60 * 60 * 1000, // 12 hours
  };
};

export const SESSION_EXPIRY_SECONDS = 12 * 60 * 60; // 12 hours in seconds
