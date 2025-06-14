import mongoose, { Schema } from "mongoose";
// If we don't want to ignore the extra field want error then use new Schema({})
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 12,
      // max: 90,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
      lowerCase: true,
      trim: true,
    },
    hobbies: {
      type: [String],
    },
    parentId: {
      type: Schema.Types.ObjectId,
      required: function () {
        return this.age < 16;
      },
      default: null,
    },
  },
  {
    strict: "throw",
    timestamps: true,
    // versionKey: false,
    // collection: "test"
  }
);
const User = mongoose.model("User", userSchema);

// const data = await User.insertOne({
//   name: "krishna",
//   age: 13,
//   email: "krishna@gmail.com",
//   hobbies: ["coding", "sleeping"],
//   parentId: "684cd69af56955db9c79d9e8",
// });
// console.log(data);

// console.log("running UserModel.js");

export default User;
