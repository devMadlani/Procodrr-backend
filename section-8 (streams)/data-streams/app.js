import fs from "fs";
import { spawn } from "child_process";

// const writeStreams = fs.createWriteStream("text.txt");

// process.stdin.on("data", (chunk) => {
//   writeStreams.write(chunk);
// });

const child_process = spawn("cat", ["output.txt"]);

// Here we are listen to the stdout of child process
// child_process.stdout.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

// here we are pipe the child_process's stdout to  parent's stdout
child_process.stdout.pipe(process.stdout);



