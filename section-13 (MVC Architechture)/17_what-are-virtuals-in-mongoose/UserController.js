import mongoose from "mongoose";
import User from "./UserModel.js";

const user = await User.findOne({ email: "krishna@gmail.com" });

// user.hobbiesStr = "writing, sleeping, coding";

console.log(user.getSummry());
console.log(user.sayHi());
// console.log(user.toObject());
// console.log(user.emailDomain);
// console.log(user.isAdult);
// console.log(user.hobbies);
// console.log(user.schema.virtuals); // Shows all virtuals

// console.log(user.toJSON({ virtuals: true })); // Converts Document to normal js object without virtuals

await mongoose.disconnect();
