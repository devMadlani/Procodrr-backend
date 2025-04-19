import { createReadStream } from "fs";

const readStreams = createReadStream(
  "C:\\Users\\madla\\OneDrive\\Desktop\\ep-4.mp4"
);

readStreams.pipe(process.stdout);

// readStreams.on("data", (chunk) => {
//   process.stdout.write(chunk);
// });
