import fs from "fs/promises";

const fileHandle = await fs.open("text.txt", "r+");

const { buffer, bytesRead } = await fileHandle.read({
  buffer: Buffer.alloc(10),
  position: 0,
});

const { buffer: wrtiebuffer, bytesWritten } = await fileHandle.write(
  Buffer.from("hii")
);
console.log(wrtiebuffer, bytesWritten);

fileHandle.close()
