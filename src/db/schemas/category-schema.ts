import { pgTable, integer, text } from "drizzle-orm/pg-core";
// import { relations } from 'drizzle-orm';
// import { posts } from './post-schema';

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull().unique(),
  description: text("description"),
  // userId: integer('user_id').notNull().references(() => users.id),
});

// export const categoriesRelations = relations(categories, ({ one, many }) => ({
//   user: one(users, {
//     fields: [categories.userId],
//     references: [users.id],
//   }),
//   posts: many(posts),
// }));