import { createClient, SCHEMA_FIELD_TYPE } from "redis";

const redisClient = createClient();
await redisClient.connect();

const citySearch = await redisClient.ft.search("cityIdx", "@city:{Delhi}");
console.log(citySearch.documents);
redisClient.quit();
