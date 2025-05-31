import { Db, MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db();

// const collection = await db.createCollection("users", {
//   validator: {
//     name: {
//       $type: "string",
//     },
//     age: {
//       $type: "int",
//       $gte: 18,
//       $lte: 80,
//     },
//   },
//   validationAction: "error",
//   validationLevel: "strict",
// });

// await db.command({
//   create: "users",
//   validator: {
//     name: {
//       $type: "string",
//     },
//     age: {
//       $type: "int",
//       $gte: 18,
//       $lte: 80,
//     },
//   },
//   validationAction: "error",
//   validationLevel: "strict",
// });

await db.command({
  collMod: "users",
  validator: {
    name: {
      $type: "string",
    },
    age: {
      $type: "int",
      $gte: 18,
      $lte: 80,
    },
  },
  validationAction: "warn",
  validationLevel: "off",
});

const collections = await db.listCollections().toArray();
console.log(collections[0].options);

// try {
//   await collection.insertOne({ age: 80 });
// } catch (err) {
//   console.log(err);
// }

client.close();
