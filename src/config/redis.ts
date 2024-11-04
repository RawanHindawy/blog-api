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
