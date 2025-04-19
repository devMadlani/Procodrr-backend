import fs, { read, write } from "fs";
import { pipeline } from "stream";
console.time();
const readStreams = fs.createReadStream(
  "C:\\Users\\madla\\OneDrive\\Desktop\\Episode 04 - Talk is cheap, show me the code!.mp4",
  {
    highWaterMark: 1 * 1024 * 1024,
  }
);
const writeStreams = fs.createWriteStream(
  "C:\\Users\\madla\\OneDrive\\Desktop\\streams.mp4"
);

// backpressure handle manually
// readStreams.on("data", (chunks) => {
//   if (!writeStreams.write(chunks)) {
//     readStreams.pause();
//   }
// });

// writeStreams.on("drain", () => {
//   readStreams.resume();
// });

//backpressure handle automatically with pipe
// readStreams.pipe(writeStreams);
// readStreams.on("error", (err) => {
//   console.log(err);
// });

// error handle using pipeline
pipeline(readStreams, writeStreams, (err) => {
  if (err) {
    console.log(err);
  }
});

readStreams.on("end", () => {
  console.timeEnd();
});
