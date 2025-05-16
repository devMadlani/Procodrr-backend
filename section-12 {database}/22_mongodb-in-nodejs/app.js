import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();

const admin = client.db().admin();
const dbList = await admin.listDatabases();
console.log(dbList);

// const db = client.db("todoApp");
// console.log(db.namespace);

// const collection = db.collection("todos");
// const result = await collection.find().toArray();

// console.log(result);

client.close();
