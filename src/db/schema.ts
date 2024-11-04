import { pgTable, integer, text, timestamp, primaryKey, foreignKey } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

// Users table 
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Relations definitions
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  tags: many(tags),
  categories: many(categories)
}));


// Categories table 
export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull().unique(),
  description: text("description"),
  userId: integer("user_id").notNull()
});

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  user: one(users, {
    fields: [categories.userId],
    references: [users.id],
  }),
  posts: many(posts)
}));

// Tags table 
export const tags = pgTable("tags", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull().unique(),
  description: text("description"),
  userId: integer("user_id").notNull()
});

export const tagsRelations = relations(tags, ({ one, many }) => ({
  user: one(users, {
    fields: [tags.userId],
    references: [users.id],
  }),
  posts: many(postTags)
}));

// Posts table
export const posts = pgTable("posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: integer("user_id").notNull(),
  categoryId: integer("category_id")
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
  comments: many(comments),
  tags: many(postTags)
}));

// Comments table
export const comments = pgTable("comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  postId: integer("post_id"),
  userId: integer("user_id").notNull()
});

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  })
}));

// Post Tags junction table
export const postTags = pgTable("post_to_tags", {
  postId: integer("post_id").notNull().references(() => posts.id),
  tagId: integer("tag_id").notNull().references(() => tags.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.postId, table.tagId] }),
  }
});


export const postsToTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  })
}));