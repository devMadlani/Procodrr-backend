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
    virtuals: {
      isAdult: {
        get() {
          return this.age >= 18;
        },
      },
      hobbiesStr: {
        get() {
          return this.hobbies.join(", ");
        },
        set(value) {
          this.hobbies = [...this.hobbies, ...value.split(",")];
        },
      },
    },
    methods: {
      getSummry() {
        return `${this.name} is ${this.age} years old.`;
      },
    },
  }
);

userSchema.methods.sayHi = function () {
  return `Hi, my name is ${this.name}`;
};
userSchema.virtual("emailDomain").get(function () {
  return this.email.split("@")[1];
});
const User = model("User", userSchema);

export default User;
