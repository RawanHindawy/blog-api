import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users, categories, tags, posts, comments, postTags } from "./schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.development" });

if (!("DATABASE_URL" in process.env))
    throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
    const client = new Pool({
        connectionString: process.env.DATABASE_URL,
    });
    const db = drizzle(client);

    console.log("Seed start");

    // empty database
    await db.delete(comments).execute();
    await db.delete(postTags).execute();
    await db.delete(tags).execute();
    await db.delete(posts).execute();
    await db.delete(users).execute();
    await db.delete(categories).execute();

    // 1. Create Users
    const userData = Array.from({ length: 10 }, () => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }));
    const createdUsers = await db.insert(users).values(userData).returning();

    // 2. Create Categories
    const categoryData = [
        { name: "Technology", description: "Tech related posts", userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id },
        { name: "Travel", description: "Travel experiences", userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id },
        { name: "Food", description: "Cooking and restaurants", userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id },
    ];
    const createdCategories = await db.insert(categories).values(categoryData).returning();

    // 3. Create Tags
    const tagData = [
        { name: "JavaScript", description: "JS related", userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id },
        { name: "Python", description: "Python related", userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id },
        { name: "Travel Tips", description: "Travel advice", userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id },
    ];
    const createdTags = await db.insert(tags).values(tagData).returning();

    // 4. Create Posts
    const postData = Array.from({ length: 20 }, () => ({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
        categoryId: createdCategories[Math.floor(Math.random() * createdCategories.length)].id,
    }));
    const createdPosts = await db.insert(posts).values(postData).returning();

    // 5. Create Comments
    const commentData = Array.from({ length: 50 }, () => ({
        content: faker.lorem.paragraph(),
        postId: createdPosts[Math.floor(Math.random() * createdPosts.length)].id,
        userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
    }));
    await db.insert(comments).values(commentData);

    // 6. Create Post Tags
    const postTagData = createdPosts.flatMap(post => 
        createdTags
            .slice(0, Math.floor(Math.random() * 3) + 1) // Random 1-3 tags per post
            .map(tag => ({
                postId: post.id,
                tagId: tag.id,
            }))
    );
    await db.insert(postTags).values(postTagData);

    console.log("Seed done");
    await client.end();
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});