import { createReadStream } from "fs";
import http from "http";

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    const readStream = createReadStream("./public/index.html");
    readStream.pipe(res);
  } else {
    const readStream = createReadStream(`./public/${req.url}`);
    readStream.on("error", (err) => {
      console.log(err.message);
      res.end("Not Found!");
    });
    readStream.pipe(res);
  }
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
