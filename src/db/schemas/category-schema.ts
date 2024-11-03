import { pgTable, integer, text } from "drizzle-orm/pg-core";
// import { relations } from 'drizzle-orm';
// import { posts } from './post-schema';
// import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
// import { z } from 'zod';

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

// // Create base schemas
// export const insertCategorySchema = createInsertSchema(categories);
// export const selectCategorySchema = createSelectSchema(categories);

// // Create refined insert schema with additional validation
// export const insertCategorySchemaRefined = createInsertSchema(categories, {
//   name: (schema) => schema.name.min(2).max(50), // Add length validation
//   description: (schema) => schema.description.nullable().optional(), // Make description optional
// });

// // Example of creating a partial schema for specific operations
// export const updateCategorySchema = insertCategorySchemaRefined.partial();
