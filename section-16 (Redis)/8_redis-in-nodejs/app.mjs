import redisClient from "./redis.mjs";

// const result = await redisClient.setJSON("test", {
//   name: "dev",
//   age: 19,
// });

const result = await redisClient.getJSON("test");
console.log(result);

redisClient.quit();
