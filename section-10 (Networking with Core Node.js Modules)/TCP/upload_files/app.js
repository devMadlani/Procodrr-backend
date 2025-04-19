import { createWriteStream } from "node:fs";
import { open } from "node:fs/promises";
import net from "node:net";

const server = net.createServer(async (socket) => {
  socket.write("HTTP/1.1 200 OK\n\n");
  const writeStram = createWriteStream("uploaded-file.txt");

  socket.on("data", (chunk) => {
    writeStram.write(chunk);
    if (/WebKitFormBoundary.+--/.test(chunk.toString())) {
      socket.end("File uploaded successfully");
    }
  });

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
