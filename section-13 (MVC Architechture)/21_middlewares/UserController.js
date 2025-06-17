import User from "./UserModel.js";

const user = await User.findOne({ name: "het" });
const use2 = await User.find({ name: "het" });

// console.log(user);
// console.log(use2);
