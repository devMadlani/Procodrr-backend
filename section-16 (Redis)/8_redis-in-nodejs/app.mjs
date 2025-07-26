import { createClient } from "redis";

const redisClient = await createClient().connect();

const result = await redisClient.set("name", "dev");

console.log(result);

redisClient.quit();
