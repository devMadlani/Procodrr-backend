import fs from "fs";

console.time();

const buff = Buffer.allocUnsafe(16 * 1024);

const fd2 = fs.readFileSync()
const fd = fs.openSync("./fdNumbers.txt", "w");

let totalBytesWrittenInBuffer = 0;
let remainingStr = "";

for (let i = 1; i <= 100000; i++) {
  let str = `${i}, `;
  str = remainingStr + str;

  const byteWritten = buff.write(str, totalBytesWrittenInBuffer);

  totalBytesWrittenInBuffer += byteWritten;

  remainingStr = "";
  let writtenByteDiff = str.length - byteWritten;

  if (writtenByteDiff !== 0) {
    remainingStr += str.slice(byteWritten);
  }

  if (totalBytesWrittenInBuffer === buff.byteLength) {
    fs.writeSync(fd, buff);
    totalBytesWrittenInBuffer = 0;
  }
  //   fs.writeSync(fd, `${i} `);
}

fs.writeSync(fd, buff.subarray(0, totalBytesWrittenInBuffer) + remainingStr);

fs.closeSync(fd);
console.timeEnd();
