import fs from "fs/promises";

// const fileHandle = await fs.open("text.txt", "r+");

// ----- ReadStream -----

// const readStream = fileHandle.createReadStream({ highWaterMark: 4 });
// readStream.setEncoding("utf-8");
// readStream.on("data", (chunk) => {
//   console.log(chunk);
// });

// ----- WriteStream -----

// const writeStream = fileHandle.createWriteStream();

// writeStream.write("hii");

// practice

const readFileHandle = await fs.open(
  "C:\\Users\\madla\\OneDrive\\Desktop\\ep-4.mp4"
);

const writeHandle = await fs.open("stream.mp4", "w");

const readStream = readFileHandle.createReadStream();
const writeStream = writeHandle.createWriteStream();


readStream.pipe(writeStream);
