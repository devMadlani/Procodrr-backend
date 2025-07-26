import redisClient from "./redis.mjs";

// const result = await redisClient.setJSON("test", {
//   name: "dev",
//   age: 19,
// });

// const result = await redisClient.json.arrPop("user:1", {
//   path: "$.subjects",
//   index: 0,
// });

// await redisClient.json.set("user:1", "$.address", {
//   name: "dev",
// });

// const result = await redisClient.json.arrLen("user:1", {
//   path: "$.subjects",
// });

// const result = await redisClient.json.get("user:1", {
//   path: "$.subjects[*]",
// });

const result = await redisClient.json.get("user:1", {
  path: "$..name",
});

console.log(result);

redisClient.quit();
