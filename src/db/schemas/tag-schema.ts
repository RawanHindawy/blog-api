import { pgTable, text, integer } from "drizzle-orm/pg-core";
// import { relations } from 'drizzle-orm';
// import { postsTags } from './post-tags-schema';

export const tags = pgTable("tags", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  description: text("description"),
  // userId: integer('user_id').notNull().references(() => users.id),
});

// export const tagsRelations = relations(tags, ({ many }) => ({
//   posts: many(postsTags)
// }));

// export const tagsRelations = relations(tags, ({ one, many }) => ({
//   user: one(users, {
//     fields: [tags.userId],
//     references: [users.id],
//   }),
//   posts: many(posts, {
//     through: postsToTags,
//     fields: [tags.id],
//     references: [postsToTags.tagId],
//   }),
// }));
