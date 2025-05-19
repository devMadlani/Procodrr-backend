import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();

const db = client.db("todoApp");
const collection = db.collection("todos");

const data = await collection
  .find({}, { projection: { title: 1, _id: 0 } })
  .toArray();
console.log(data);

client.close();
