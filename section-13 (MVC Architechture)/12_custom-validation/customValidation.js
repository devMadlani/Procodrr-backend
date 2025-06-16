import mongoose from "mongoose";
import User from "./UserModel.js";

// const user = await User.create({
//   name: "disha",
//   age: 46,
//   email: "disha@gmail.com",
// });

// const user = await User.findById("684d7d88e08c5c44b1deadce").populate(
//   "parentId"
// );

// If we only need to populate selected fields then use this
const user = await User.findById("684d7d88e08c5c44b1deadce").populate({
  path: "parentId",
  select: "name age -_id",
});

console.log(user);
