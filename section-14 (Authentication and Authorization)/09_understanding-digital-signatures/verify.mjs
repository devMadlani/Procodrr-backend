import crypto from "node:crypto";
import { readFile } from "node:fs/promises";

const signedFileConent = await readFile("./loan-agreement-signed.md", "utf-8");
const [fileContent, signature] = signedFileConent.split("हस्ताक्षर:- ");

const mySecretKey = "my-super-secret-key";

const newSignature = crypto
  .createHash("sha256")
  .update(fileContent + "हस्ताक्षर:- ")
  .update(mySecretKey)
  .digest("base64url");

console.log(newSignature);
console.log(signature);

if (newSignature === signature) {
  console.log("The letter is valid");
} else {
  console.log("The letter is not valid");
}
