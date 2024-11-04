import { eq } from "drizzle-orm";
import db from "../db";
import { tags } from "../db/schema";
import type { Tag, NewTag } from "../types/tag-type";
import { HTTPException } from "hono/http-exception";
// import { postsTags } from '../db/schemas/post-tags-schema';
// import { posts } from '../db/schemas/post-schema';

export const getAllTags = async (): Promise<Tag[]> => {
  return await db.select().from(tags);
};

export const getTagById = async (id: number): Promise<Tag | undefined> => {
  const result = await db.select().from(tags).where(eq(tags.id, id)).limit(1);

  return result[0];
};

export const createTag = async (tagData: NewTag,userId:number): Promise<Tag> => {
  const result = await db.insert(tags).values({...tagData,userId}).returning();

  return result[0];
};

export const updateTag = async (
  id: number,
  userId:number,
  tagData: Partial<NewTag>
): Promise<Tag | undefined> => {

  const tag = await getTagById(id);

  if (tag){
    if (tag.userId !== userId) {
      throw new HTTPException(403, { message: "You are not authorized to update this tag" });
    }
  
    const result = await db
      .update(tags)
      .set(tagData)
      .where(eq(tags.id, id))
      .returning();

    return result[0];
  }else{
    throw new HTTPException(404, { message: "Tag not found" });
  }
};

export const deleteTag = async (id: number, userId: number): Promise<boolean> => {
  const tag = await getTagById(id);

  if (tag){

    if (tag.userId !== userId) {
      throw new HTTPException(403, { message: "You are not authorized to delete this tag" });
    }

    await db.delete(tags).where(eq(tags.id, id)).returning();
    return true;

  }else{
    throw new HTTPException(404, { message: "Tag not found" });
  }
};