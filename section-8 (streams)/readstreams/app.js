import fs, { ReadStream } from "fs";

const readStreams = fs.createReadStream("./chars.txt", {
  highWaterMark: 4,
});
readStreams.on("data", (chunks) => {
  fs.appendFileSync("test.txt", chunks);
  readStreams.pause();
  setTimeout(() => {
    readStreams.resume();
  }, 1000);
});
readStreams.on("end", () => {
  // readStreams.resume();
});
