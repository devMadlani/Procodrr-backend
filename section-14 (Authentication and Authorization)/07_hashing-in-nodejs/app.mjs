import crypto from "crypto";
import { readFileSync } from "fs";
const fileData = readFileSync(
  "C:\\Users\\madla\\Downloads\\VSCodeUserSetup-x64-1.101.1.exe"
);

const hash = crypto.createHash("sha256").update(fileData).digest("hex");
console.log(hash);
