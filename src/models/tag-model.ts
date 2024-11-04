import { eq } from "drizzle-orm";
import db from "../db";
import { tags } from "../db/schema";
import type { Tag, NewTag } from "../types/tag-type";
import { HTTPException } from "hono/http-exception"

export const getAllTags = async (queryParams: Record<string, string>): Promise<{ data: Tag[], pagination: { totalPages: number, currentPage: number } }> => {
  const page = parseInt(queryParams.page) || 1;
  const pageSize = parseInt(queryParams.pageSize) || 10;
  const skip = (page - 1) * pageSize;

  const tagsResult = await db.query.tags.findMany({
    with: {
      user: true
    },
    limit: pageSize,
    offset: skip
  });

  const tagsCount = await db.select({ count: tags.id }).from(tags).then(result => Number(result[0].count));

  return { data: tagsResult, pagination: { totalPages: Math.ceil(tagsCount / pageSize), currentPage: page } };
};

export const getTagById = async (id: number): Promise<Tag | undefined> => {
  const result = await db.query.tags.findFirst({
    where: eq(tags.id, id),
    with: {
      user: true
    }
  });

  return result;
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