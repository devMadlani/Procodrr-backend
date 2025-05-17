import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();

const db = client.db("school");
// console.log(await db.listCollections().toArray());

const studentsCollection = db.collection("students");
const teachersCollection = db.collection("teachers");

//create
// const result1 = await studentsCollection.insertOne({
//   name: "Dev Madlani",
//   age: 22,
// });
// const result2 = await teachersCollection.insertMany([
//   { name: "Disha Madlani", age: 23 },
//   { name: "Darshu Madlani", age: 24 },
// ]);

//delete
// console.log(studentsCollection.drop());

// const a = await teachersCollection.deleteOne({
//   _id: new ObjectId("682754e07da2dc1a759de78b"),
// });

// await teachersCollection.updateOne(
//   { _id: new ObjectId("682754e07da2dc1a759de78b") },
//   { $unset: { name: "" } }
// );

// await db.dropDatabase();

//update

const updateResult = await studentsCollection.updateOne(
  { name: "Dev Madlani" },
  { $set: { age: 25 } }
);

// const updateResult = await studentsCollection.replaceOne(
//   { age: 23 },
//   { name: "Dev Madlani" }
// );

client.close();
