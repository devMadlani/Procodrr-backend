import { spawn } from "child_process";
import { createWriteStream } from "fs";

const child = spawn("node", ["child.js"]);

const writeStream = createWriteStream("./mp4.mp4");

child.stdout.pipe(writeStream);

// child.stdout.on("data", (chunk) => {
//   writeStream.write(chunk);
// });
