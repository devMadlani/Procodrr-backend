import User from "./UserModel.js";

const query = User.find();
query.select("name age").sort({ age: -1 });
console.log(await query);
