import { eq } from "drizzle-orm";
import db from "../db";
import { posts } from "../db/schema";
import type { Post, NewPost } from "../types/post-type";
import { HTTPException } from "hono/http-exception";

export const getAllPosts = async (
  queryParams: Record<string, string>
): Promise<{
  data: Post[];
  pagination: { totalPages: number; currentPage: number };
}> => {
  const page = parseInt(queryParams.page) || 1;
  const pageSize = parseInt(queryParams.pageSize) || 10;
  const skip = (page - 1) * pageSize;

  const postsResult = await db.query.posts.findMany({
    with: {
      user: true,
      category: true,
      tags: true,
    },
    limit: pageSize,
    offset: skip,
  });

  const postsCount = await db
    .select({ count: posts.id })
    .from(posts)
    .then((result) => Number(result[0].count));

  return {
    data: postsResult,
    pagination: {
      totalPages: Math.ceil(postsCount / pageSize),
      currentPage: page,
    },
  };
};

export const getPostById = async (id: string): Promise<Post | undefined> => {
  const result = await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(id)),
    with: {
      user: true,
      category: true,
      tags: true,
    },
  });

  return result;
};

export const createPost = async (
  data: NewPost,
  userId: number
): Promise<Post> => {
  const result = await db
    .insert(posts)
    .values({ ...data, userId })
    .returning();

  return result[0];
};

export const updatePost = async (
  id: string,
  userId: number,
  data: Partial<NewPost>
): Promise<Post | undefined> => {
  const post = await getPostById(id);

  if (post) {
    if (post.userId !== userId) {
      throw new HTTPException(403, {
        message: "You are not authorized to update this post",
      });
    }

    const result = await db
      .update(posts)
      .set(data)
      .where(eq(posts.id, parseInt(id)))
      .returning();

    return result[0];
  } else {
    throw new HTTPException(404, { message: "Post not found" });
  }
};

export const deletePost = async (
  id: string,
  userId: number
): Promise<boolean> => {
  const post = await getPostById(id);

  if (post) {
    if (post.userId !== userId)
      throw new HTTPException(403, {
        message: "You are not authorized to delete this post",
      });

    await db
      .delete(posts)
      .where(eq(posts.id, parseInt(id)))
      .returning();

    return true;
  } else {
    throw new HTTPException(404, { message: "Post not found" });
  }
};
