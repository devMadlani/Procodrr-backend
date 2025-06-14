import User from "./UserModel.js";

//when we add .lean() it will only return the data without virtuals
const user = await User.findOne({ email: "krishna@gmail.com" }).lean();
const users = await User.find().cursor().lean(); // if want data as cursor then use this

console.log(user);
console.log(users);
