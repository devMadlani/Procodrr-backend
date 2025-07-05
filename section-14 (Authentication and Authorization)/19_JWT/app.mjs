import jwt from "jsonwebtoken";
import crypto from "crypto";
const token = jwt.sign({ name: "dev" }, "devmadlani", {
  algorithm: "HS256",
  expiresIn: 10,
});

//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGV2IiwiaWF0IjoxNzUxNTU0NjM0fQ.mxJXZeocSvvUaNhTUAronWwQwK5uEr0LtkFqjqlUG1g",

const decode = jwt.decode(token);
console.log(decode);
// console.log(
//   jwt.verify(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGV2IiwiaWF0IjoxNzUxNTU0NjM0fQ.mxJXZeocSvvUaNhTUAronWwQwK5uEr0LtkFqjqlUG1g",
//     "devmadlani"
//   )
// );
// console.log(token);
// console.log(
//   Buffer.from(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGV2IiwiaWF0IjoxNzUxNTU0NjM0fQ",
//     "base64url"
//   ).toString()
// );

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGV2IiwiaWF0IjoxNzUxNTU0NjM0fQ.mxJXZeocSvvUaNhTUAronWwQwK5uEr0LtkFqjqlUG1g";

// const signature = crypto
//   .createHmac("sha256", "devmadlani")
//   .update(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGV2IiwiaWF0IjoxNzUxNTU0NjM0fQ"
//   )
//   .digest("base64url");

// console.log(signature);
