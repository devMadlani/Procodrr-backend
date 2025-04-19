import { spawn } from "child_process";
// In Node.js, stdout is a duplex concept, meaning:
// 1️⃣ In a child process, stdout is readable from the parent’s perspective.
// 2️⃣ In the main process, process.stdout is writable.

// Example

const child = spawn("cat", ["output.txt"]);

// Read from child process's stdout (Readable)  :--> here is acts as a readable stream
child.stdout.on("data", (chunk) => {
  process.stdout.write("Child Output: " + chunk.toString()); // here acts as a writable stream
});
