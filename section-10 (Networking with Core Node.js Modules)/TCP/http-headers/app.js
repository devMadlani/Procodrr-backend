import { createReadStream, read } from "node:fs";
import { open } from "node:fs/promises";
import net from "node:net";

const server = net.createServer(async (socket) => {
  // socket.write(
  //   `HTTP/1.1 200 ok
  //   Access-Control-Allow-Origin:*
  //   Access-control-expose-headers:*
  //   \n\nhiii`
  // );

  // const fileHandler = await open("test.pdf");
  const fileHandler = await open("numbers.txt");
  const readStream = fileHandler.createReadStream({ highWaterMark: 32 });
  const { size } = await fileHandler.stat();

  socket.write("HTTP/1.1 200 ok\n");
  socket.write("Access-Control-Allow-Origin:*\n");
  socket.write("Access-control-expose-headers:*\n");

  // ------------------- Important Headers -------------------------------
  // socket.write("Content-Type: application/pdf\n");
  // socket.write("Content-Type: image/webp\n");
  // socket.write("Content-Type: application/json\n");
  // socket.write("Content-Type: text/txt; charset=utf-8 \n");
  // socket.write("Content-Type: video/mp4\n");
  // socket.write("Content-Disposition: attachment; filename=dev.mp4\n"); // if want to start download the pdf
  socket.write(`Content-length: ${size} \n\n`); // automatically end socket connection when specified length data will get
  // ---------------------------------------------------------------------

  // socket.write(`Content-length: 3\n`);
  // socket.write(`123`);
  // socket.write("\n\nhii");
  // socket.end();

  // const readStream = createReadStream("../Send_Files/ep-5.mp4");
  // const readStream = createReadStream("river.webp");
  // const readStream = createReadStream("numbers.txt");
  // const readStream = createReadStream("num.txt");
  // const readStream = createReadStream(
  //   "C:\\Users\\anura\\OneDrive\\Desktop\\4k-video.MP4"
  // );

  // readStream.pipe(socket);
  readStream.on("data", (chunk) => {
    socket.write(chunk);
    readStream.pause();
    setTimeout(() => {
      readStream.resume(); // slowing the data transfer
    }, 100);
  });

  readStream.on("end", () => {
    console.log("File ended");
  });

  socket.on("data", (chunk) => {
    console.log(chunk.toString());
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
