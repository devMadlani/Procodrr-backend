import User from "./UserModel.js";

const result = await User.insertMany([
  {
    name: "het",
    age: 44,
    email: "het@gmail.com",
  },
  {
    name: "vikas",
    age: 44,
    email: "vikas@gmail.com",
  },
]);

// console.log(result);
