import mongoose from "mongoose";
import User from "./UserModel.js";

const user1 = new User();
user1.age = 17;
console.log(user1);
console.log(user1.isModified());
console.log(user1 instanceof mongoose.Document);
console.log(user1 instanceof User);

const user = await User.findById("684cd6ae3929d1925539b116");
// user.updateOne({ age: 20 }).exec();
const json = user.toJSON();

console.log(json);
