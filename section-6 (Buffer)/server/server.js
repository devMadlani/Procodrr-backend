import http from "http";

const a = new ArrayBuffer(3);
const uint8Array = new Uint8Array(a);

uint8Array[0] = 0x44;
uint8Array[1] = 0x65;
uint8Array[2] = 0x76;
startServer(uint8Array);

function startServer(responseData) {
  const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/txt; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url === "/favicon.ico") {
      res.end();
      return;
    }
    res.end(responseData);
  });

  server.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
  });
}
