import net from "node:net";

const server = net.createServer();

server.listen(4000, "0.0.0.0", () => {
  console.log("Listening on port 4000");
});

server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    console.log(chunk.toString());
    socket.write("HTTP\n\nMessage Received Successfully");
    // socket.end();
  });
  socket.on("error", () => {
    console.error("Client Lost");
  });
  socket.on("close", () => {
    console.log(socket.remoteAddress, "Client is disconnected");
  });

  console.log("Client is Connected", socket.remoteAddress);
});
