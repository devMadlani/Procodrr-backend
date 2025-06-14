import User from "./UserModel.js";
// method 1
// const user = await User.findOne({ email: "krishna@gmail.com" });

// user.age = 30;
// await user.save();

// console.log(user);

// method 2
const user = await User.findOneAndUpdate(
  { email: "krishna@gmail.com" },
  { age: 22 },
  {
    new: true, // if we want update value in return
    runValidators: true, // if want to run validations
  }
);

console.log(user);
