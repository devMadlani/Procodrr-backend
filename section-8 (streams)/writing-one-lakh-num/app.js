import fs from "fs";

console.time();

// 1. ---------------------

for (let i = 1; i <= 100000; i++) {
  if (i == 1) {
    fs.writeFileSync("number.txt", `${i}, `);
  } else {
    fs.appendFileSync("number.txt", `${i}, `);
  }
}
console.timeEnd();

// 2. ---------------------
// const writeStream = fs.createWriteStream("streamNuber.txt");

// for (let i = 0; i <= 100000; i++) {
//   writeStream.write(`${i}, `);
// }

// writeStream.end();
// writeStream.on("finish", () => {
//   console.timeEnd();
// });

// 3. ---------------------

// const fd = fs.openSync("fdNumbers.txt", "w");

// for (let i = 0; i <= 100000; i++) {
//   fs.writeSync(fd, `${i}, `);
// }

// fs.closeSync(fd);
// console.timeEnd();
