// import { users } from "../db/schema";

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

export type User = {
  id: number;
  username: string;
  hashedPassword: string;
  salt: string;
  createdAt: number;
}

export type Session = {
  userId: number;
  username: string;
  createdAt: number;
  expiresAt: number;
};
