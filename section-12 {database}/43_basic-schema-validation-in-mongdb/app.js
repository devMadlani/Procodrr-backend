import { Db, MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db();
const collection = db.collection("users");

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

// $jsonSchema validator
// await db.command({
//   collMod: "users",
//   validator: {
//     $jsonSchema: {
//       required: ["name", "age"],
//       properties: {
//         _id: {
//           bsonType: "objectId",
//         },
//         name: {
//           bsonType: "string",
//           minLength: 3,
//           maxLength: 20,
//         },
//         age: {
//           bsonType: "int",
//           minimum: 18,
//           maximum: 80,
//         },
//       },
//       additionalProperties: false,
//     },
//   },
//   validationAction: "error",
//   validationLevel: "off",
// });

// const result = await db.command({
//   validate: "users",
// });

// console.log(result);

const collectionInfo = await db.listCollections({ name: "users" }).toArray();
const jsonSchema = collectionInfo[0]?.options?.validator.$jsonSchema;

const invalidDocuments = await collection
  .find({
    $nor: [
      {
        $jsonSchema: jsonSchema,
      },
    ],
  })
  .toArray();
console.log(invalidDocuments);

client.close();

// MongoSh
// db.users.find({
//   $nor: [
//     {
//       $jsonSchema: db.getCollectionInfos({ name: "users" })[0].options.validator
//         .$jsonSchema,
//     },
//   ],
// });
