import crypto from "node:crypto";
import { createWriteStream } from "node:fs";
import { readFile } from "node:fs/promises";

const fileData = await readFile("./loan-agreement.md");
const mySecretKey = "my-super-secret-key";

const signature = crypto
  .createHash("sha256")
  .update(fileData)
  .update(mySecretKey)
  .digest("base64url");

const writeStream = createWriteStream("loan-agreement-signed.md");
writeStream.write(fileData);
writeStream.end(signature);
