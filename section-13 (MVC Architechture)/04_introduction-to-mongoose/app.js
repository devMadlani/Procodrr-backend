import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost");

mongoose.set("autoCreate", false); // disable auto collection creation

const UserModel = mongoose.model("User", { name: String, age: Number });

const data = await UserModel.insertOne({ name: "dev", age: 22 });
console.log(data);

console.log("Database connected");
