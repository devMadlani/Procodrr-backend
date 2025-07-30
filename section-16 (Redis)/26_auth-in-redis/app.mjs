import { createClient } from "redis";

const redisClient = createClient({
  password: "123123",
});
await redisClient.connect();

const result = await redisClient.ping();
console.log(result);

await redisClient.quit();
