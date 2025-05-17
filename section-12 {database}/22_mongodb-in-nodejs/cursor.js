import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();

const db = client.db("todoApp");
const collection = db.collection("todos");
// const collection = db.collection("users");

// const data = [];

// for (let i = 1; i <= 25; i++) {
//   data.push({ title: `task ${i}`, completed: i % 2 === 0 });
// }

// await collection.insertMany(data);

// console.log(await collection.countDocuments());

// Cursor

const cursor = collection.find();

console.log(await cursor.hasNext());

let count = 0;
while (await cursor.hasNext()) {
  count++;
  console.log(await cursor.next());
  if (count === 5) break;
}

console.log(await cursor.hasNext());

const moreData = await cursor.toArray();

console.log(moreData);

// for await (const doc of cursor) {
//   console.log(doc);
// }

client.close();
