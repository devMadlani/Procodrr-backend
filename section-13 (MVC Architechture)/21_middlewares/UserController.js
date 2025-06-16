import User from "./UserModel.js";

const user = await User.create({
  name: "darshu",
  age: 30,
  email: "darshu@gmail.com",
});

user.save();
