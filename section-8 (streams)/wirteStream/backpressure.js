import fs from "fs";

const writeStreams = fs.createWriteStream("file.txt", { highWaterMark: 4 });

console.log(writeStreams.writableLength);
console.log(writeStreams.write("hel"));
console.log(writeStreams.write("hel"));
writeStreams.once("drain", () => {
  writeStreams.write("hell");
});
