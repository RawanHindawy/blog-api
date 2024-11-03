import { pgTable, integer, text ,timestamp} from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const users = pgTable("users", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
  });
  
export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull().unique(),
  description: text("description"),
});

export const comments = pgTable("comments", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    postId: integer("post_id"),
    userId: integer('user_id').notNull()
//   postId: integer("post_id").references(() => posts.id),
//   userId: integer('user_id').notNull().references(() => users.id)
  });

  export const posts = pgTable("posts", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    userId: integer('user_id').notNull(),
    categoryId: integer("category_id")
    // userId: integer('user_id').notNull().references(() => users.id),
   // categoryId: integer("category_id").references(() => categories.id),
  });

  export const tags = pgTable("tags", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    description: text("description")
    // userId: integer('user_id').notNull().references(() => users.id),
  });

//   export const postsToTags = pgTable('posts_to_tags', {
//     postId: integer('post_id').notNull().references(() => posts.id),
//     tagId: integer('tag_id').notNull().references(() => tags.id),
//     createdAt: timestamp('created_at').defaultNow(),
//     id: primaryKey({ columns: ['post_id', 'tag_id'] })
//   });

  export const commentsRelations = relations(comments, ({ one }) => ({
    user: one(users, {
      fields: [comments.userId],
      references: [users.id],
    }),
    post: one(posts, {
      fields: [comments.postId],
      references: [posts.id],
    }),
  }));

  export const postsRelations = relations(posts, ({ one, many }) => ({
    user: one(users, {
      fields: [posts.userId],
      references: [users.id],
    }),
    category: one(categories, {
      fields: [posts.categoryId],
      references: [categories.id],
    }),
    // comments: many(comments),
  //   tags: many(postsToTags, {
  //     through: postsToTags,
  //     fields: [posts.id],
  //     references: [postsToTags.postId],
  //   }),
  }));

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
