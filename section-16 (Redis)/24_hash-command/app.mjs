// Import the official Redis module
import { createClient } from "redis";

// Create and connect Redis client
const redisClient = createClient();
await redisClient.connect();

// 1. HSET â€“ Set field(s) in a hash
await redisClient.hSet("userHash", "name", "Alice");
await redisClient.hSet("userHash", "age", "25");

await redisClient.hSet("userHash2", { name: "Bob", age: "30" });

// 2. HGET â€“ Get the value of a field
const name = await redisClient.hGet("userHash", "name");
console.log(name); // "Alice"

// 3. HGETALL â€“ Get all fields and values
const allFields = await redisClient.hGetAll("userHash");
console.log(allFields);

// 4. HMGET â€“ Get values for multiple fields
const [nameVal, ageVal] = await redisClient.hmGet("userHash", ["name", "age"]);
console.log(nameVal, ageVal);

// 5. HDEL â€“ Delete one or more fields
await redisClient.hDel("userHash", "age");

// 6. HEXISTS â€“ Check if a field exists
const exists = await redisClient.hExists("userHash", "name");
console.log(exists); // true or false

// 7. HLEN â€“ Number of fields in the hash
const len = await redisClient.hLen("userHash");
console.log(len);

// 8. HKEYS â€“ Get all field names
const keys = await redisClient.hKeys("userHash");
console.log(keys);

// 9. HVALS â€“ Get all field values
const values = await redisClient.hVals("userHash");
console.log(values);

// 10. HINCRBY â€“ Increment a numeric field
await redisClient.hSet("userHash", "counter", "5");
await redisClient.hIncrBy("userHash", "counter", 1);
