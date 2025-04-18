import http from "http";
import fs from "fs/promises";
const server = http.createServer((req, res) => {
  req.on("data", (reqBody) => {
    console.log(reqBody);
    fs.writeFile("fromNetwork.txt", reqBody);
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end("Hello from Server");
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
