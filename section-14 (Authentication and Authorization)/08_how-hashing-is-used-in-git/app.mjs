import crypto from "node:crypto";
import { readFile } from "node:fs/promises";

const fileData = await readFile("./DirectoryView.jsx");

const newData = Buffer.from(`blob ${fileData.length}\0${fileData}`);

const hash = crypto.createHash("sha1").update(newData).digest("hex");

console.log(hash);
