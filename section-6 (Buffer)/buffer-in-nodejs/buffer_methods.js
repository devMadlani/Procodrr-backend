import { Buffer } from "buffer";
import fs from "fs/promises";
const nodeBuffer = Buffer.from("Hello world", "utf-16le");
console.log(nodeBuffer);

fs.writeFile("text.txt", nodeBuffer.toString("utf-8"));
