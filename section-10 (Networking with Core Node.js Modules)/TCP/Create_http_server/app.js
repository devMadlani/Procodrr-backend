import { createReadStream } from "node:fs";
import net from "node:net";

const server = net.createServer((socket) => {
  socket.write("HTTP/1.1\n\n");
  //   const readStream = createReadStream(
  //     "C:\\Users\\madla\\OneDrive\\Desktop\\example.mp4"
  //   );
  //   const readStream = createReadStream("num.txt");
  const readStream = createReadStream("numbers.txt");
  readStream.pipe(socket);
  readStream.on("end", () => {
    console.log("File ended");
  });

  //   const writeStream = createWriteStream("story.mp4");
  //   socket.pipe(writeStream);
  // socket.on("data", (chunk) => {
  //   writeStream.write(chunk);
  //   console.log("got data");
  // });

  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client disconnected");
  });

  socket.on("error", () => {
    console.log("Client Lost");
  });
  console.log("Client Connected", socket.remoteAddress);
});

server.listen(4000, "0.0.0.0", () => {
  console.log("Server started on port 4000");
});
