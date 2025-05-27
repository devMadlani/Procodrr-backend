import { MongoClient, ObjectId } from "mongodb";

const oid1 = new ObjectId("682754e07da2dc1a759de78b");
const oid2 = new ObjectId("682754e07da2dc1a759de78b");
console.log(oid1.equals(oid2));
// const client = new MongoClient("mongodb://127.0.0.1:27017/storageApp");

// await client.connect();

// const db = client.db();
// const collection = db.collection("users");
// const data = await collection.insertOne();
// console.log(data);
// client.close();
