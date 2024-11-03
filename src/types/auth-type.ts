// import { users } from "../db/schemas/user-schema.ts";

// export type User = typeof users.$inferSelect;
// export type NewUser = typeof users.$inferInsert;

// export type LoginCredentials = {
//   email: string;
//   password: string;
// };

// export type RegisterCredentials = LoginCredentials & {
//   username: string;
// };

// export type OpaqueToken = {
//   token: string;
//   userId: string;
//   expiresAt: Date;
// };

// export type AuthResponse = {
//   token: string;
//   user: User;
// };

export interface User {
  id: string;
  username: string;
  serverPublicKey: string;
  serverPrivateKey: string;
  verifier: string;
}

export interface Session {
  userId: string;
  sessionKey: string;
  expiresAt: number;
}
