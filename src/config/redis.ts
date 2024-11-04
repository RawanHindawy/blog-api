import { config } from "./environment";
import { createClient } from "redis";

const redisClient = createClient({
    url: config.REDIS_URL,
});

redisClient.on('error', (err) => {
    console.log('Redis Client Error', err)
})

await redisClient.connect();

export default redisClient;
// // // Helper functions for caching
// // export async function getCache<T>(key: string): Promise<T | null> {
// //   const data = await redisClient.get<T>(key)
// //   return data
// // }

// // export async function setCache(key: string, value: any, expireInSeconds?: number): Promise<void> {
// //   if (expireInSeconds) {
// //     await redisClient.set(key, value, { ex: expireInSeconds })
// //   } else {
// //     await redisClient.set(key, value)
// //   }
// // }

// // export async function deleteCache(key: string): Promise<void> {
// //   await redisClient.del(key)
// // }
