import User from "./UserModel.js";

// Method 1
const data1 = await User.insertOne({
  name: "krishna",
  age: 13,
  email: "krishna@gmail.com",
  hobbies: ["coding", "sleeping"],
  parentId: "684cd69af56955db9c79d9e8",
});

// Method 2
1;
const data2 = await User.create([
  {
    name: "krishna",
    age: 23,
    email: "krishna@gmail.com",
    hobbies: ["coding", "sleeping"],
  },
  {
    name: "dev",
    age: 23,
    email: "dev@gmail.com",
    hobbies: ["coding", "sleeping"],
  },
]);

const user = await User({
  name: "vikas",
  age: 13,
  email: "vikas@gmail.com",
  hobbies: ["coding", "sleeping"],
  parentId: "684cd69af56955db9c79d9e8",
});

user.age = 22;
user.parentId = null;

await user.save();

console.log(data1);
console.log(data2);
