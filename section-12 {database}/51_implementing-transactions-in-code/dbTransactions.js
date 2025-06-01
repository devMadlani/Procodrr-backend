import { MongoClient } from "mongodb";

export const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();
console.log("Database Connected");

const db = client.db();
const directories = db.collection("directories");
const users = db.collection("user");

const session = client.startSession();
session.startTransaction();
try {
  await directories.insertOne({ name: "db", userName: "AS" }, { session });
  await users.insertOne({ name: "as", rooDirName: "db" }, { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  console.log(err);
}

await client.close();
console.log("database disconnected");
