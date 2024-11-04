import { pgTable, integer, text, timestamp, primaryKey, foreignKey } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

// Users table (1st - no dependencies)
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Categories table (2nd - no dependencies)
export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull().unique(),
  description: text("description")
});

// Tags table (3rd - no dependencies)
export const tags = pgTable("tags", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull().unique(),
  description: text("description")
});

// Posts table
export const posts = pgTable("posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: integer("user_id").notNull(),
  categoryId: integer("category_id")
}, (table) => {
  return {
    userFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'posts_user_id_fk'
    }),
    categoryFk: foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: 'posts_category_id_fk'
    })
  }
});

// Comments table
export const comments = pgTable("comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  postId: integer("post_id").notNull(),
  userId: integer("user_id").notNull()
}, (table) => {
  return {
    userFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'comments_user_id_fk'
    }),
    postFk: foreignKey({
      columns: [table.postId],
      foreignColumns: [posts.id],
      name: 'comments_post_id_fk'
    })
  }
});

// Post Tags junction table
export const postTags = pgTable("post_tags", {
  postId: integer("post_id").notNull(),
  tagId: integer("tag_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.postId, table.tagId] }),
    postFk: foreignKey({
      columns: [table.postId],
      foreignColumns: [posts.id],
      name: 'post_tags_post_id_fk'
    }),
    tagFk: foreignKey({
      columns: [table.tagId],
      foreignColumns: [tags.id],
      name: 'post_tags_tag_id_fk'
    })
  }
});

// Relations definitions
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments)
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts)
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
  comments: many(comments),
  tags: many(postTags)
}));

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

export const tagsRelations = relations(tags, ({ many }) => ({
  posts: many(postTags)
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  })
}));