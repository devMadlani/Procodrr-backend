import dgram from "dgram";
import { createReadStream } from "fs";
import { readFile } from "fs/promises";

const socket = dgram.createSocket("udp4");

socket.on("message", (message) => {
  console.log(message.toString());
  socket.close();
});

const readStream = createReadStream("./number.txt", { highWaterMark: 1000 });

readStream.on("data", (chunk) => {
  socket.send(chunk, 4000, "192.168.192.182");
});

readStream.on("end", () => {
  socket.send("EOF", 4000, "192.168.192.182");
});

// const content = await readFile("./simple.txt", "utf-8");
