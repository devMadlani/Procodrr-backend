import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req, res) => {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("Content-Type", "text/plain");
  // res.setHeader("Content-Type", "video/mp4");
  // res.setHeader("Content-disposition", "attachment; filename=video.mp4");
  const fileHandle = await fs.open("./text.txt");
  const { size } = await fileHandle.stat();
  res.setHeader("Content-Length", size);
  const readStream = fileHandle.createReadStream({
    highWaterMark: 1,
  });

  readStream.on("data", (chunk) => {
    res.write(chunk);
    readStream.pause();
    setTimeout(() => {
      readStream.resume();
    }, 10);
  });

  readStream.on("end", () => {
    res.end();
  });
});

server.listen(4000, "localhost", () => {
  console.log("Server Started");
});
