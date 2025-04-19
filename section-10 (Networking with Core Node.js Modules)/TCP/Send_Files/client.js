import { createReadStream, createWriteStream } from "node:fs";
import net from "node:net";

process.stdin.on("data", (input) => {
  const inputStr = input.toString().trim();
  console.log(inputStr);
  //One type of Uploading
  if (inputStr === "send") {
    const readStream = createReadStream(
      "C:\\Users\\madla\\OneDrive\\Desktop\\example.mp4"
    );
    readStream.pipe(socket);
  }
});
const socket = net.createConnection({ port: 4000, host: "192.168.192.182" });

// One type of Downloading
// const writeStream = createWriteStream(
//   "C:\\Users\\madla\\OneDrive\\Desktop\\download.mp4"
// );
// socket.on("data", (chunk) => {
// writeStream.write(chunk);
// });

socket.on("error", () => {
  console.log("Server Lost");
  socket.end();
});
