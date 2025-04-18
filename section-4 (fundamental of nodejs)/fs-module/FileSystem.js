import fs from "fs/promises";
console.time();
let a = 0;
const timerId = setInterval(() => {
  console.log(a++);
  if (a == 15) {
    clearInterval(timerId);
    console.timeEnd();
  }
});

// const data = fs.readFile("./index.html", () => {
//   console.log("reading done");
// });

const data = await fs.readFile("./index.html");
console.log("reading done");
console.log("End");
