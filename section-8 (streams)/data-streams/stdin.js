import { spawn } from "child_process";
// 1. stdin (Standard Input) is a readable stream in the parent process.
// It is used to receive user input (e.g., typing in the terminal).
// In a child process, stdin is writable from the parent process.

// As Readbale Stream in parent

process.stdin.on("data", (chunk) => {
  console.log("You typed:", chunk.toString());
});
