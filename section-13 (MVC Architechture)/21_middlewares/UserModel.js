import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name field is required. Please enter the name."],
      minLength: [3, "Kripaya 3 letters ka naam type kariye"],
      trim: true,
      // alias: "fullName", //create a virtual field so we can access name as fullName
    },
    age: {
      type: Number,
      required: [true, "age field is required. Please enter the age."],
      min: 12,
      validate: {
        validator() {
          return this.age % 2 === 0;
        },
        message: "age must be even...",
      },
    },
    email: {
      type: String,
      required: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email",
      ],
      lowercase: true,
      trim: true,
    },
    password: String,
    hobbies: [String],
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.age < 16;
      },
      default: null,
    },
  },
  {
    strict: "throw",
    timestamps: true,

    optimisticConcurrency: true, // It tells mongoose that in our project we concurrently update the document so need to check the verson on every field update not just for array
  }
);

// Document Middleware
// userSchema.pre("save", function () {
//   this.password = this.name + this.age;
// });

// userSchema.post("save", function (doc) {
//   console.log(
//     `Your account is created successfully and your password is ${doc.password}`
//   );
// });

// Query Middleware
// userSchema.pre(["find", "findOne"], function () {
//   this.find({ age: { $gte: 40 } }).select("name");
// });

// userSchema.pre(/^find/, function () {
//   this.find({ age: { $gte: 40 } }).select("name");
// });

// userSchema.post(/^find/, function (doc) {
//   console.log(doc);
//   console.log("hii");
// });

//Model Middleware
userSchema.pre("insertMany", function (next, docs) {
  for (const doc of docs) {
    doc.password = doc.name + doc.age;
  }
  console.log(docs);
  next();
});

const User = model("User", userSchema);

export default User;
