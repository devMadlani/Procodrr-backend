import mongoose from "mongoose";
import User from "./UserModel.js";

const user = await User.create({
  name: "disha",
  age: 46,
  email: "disha@gmail.com",
});
