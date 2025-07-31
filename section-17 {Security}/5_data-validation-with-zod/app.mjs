import * as z from "zod";

// const schema = z
//   .string("Please enter a valid string")
//   .min(3, "please enter atleast 3 characters")
//   .regex(/^\d{4}$/, "Please enter a valid 4 digit number");

const schema = z.object({
  name: z
    .string("Please enter a valid string")
    .min(3, "please enter atleast 3 characters")
    .max(50, "please enter at max 50 characters"),
  age: z
    .number("please enter a valid number")
    .gt(0, "Age must be positive")
    .lt(100, "Age can not greater than 1000"),
  email: z.email("Please enter a valid email").optional(),
});
const rawDrata = {
  name: "dev",
  age: 50,
  email: "dev",
};

const result = schema.safeParse(rawDrata);
if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error.issues);
}
