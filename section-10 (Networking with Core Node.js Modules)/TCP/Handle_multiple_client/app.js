import net from "node:net";

const server = net.createServer();

const clientList = [];

process.stdin.on("data", (input) => {
  const inputStr = input.toString().trim();
  const [index, ...messagePart] = inputStr.split(" ");
  const targetIndex = parseInt(index);
  const message = messagePart.join(" ");

  if (!isNaN(targetIndex) && clientList[targetIndex]) {
    clientList[targetIndex].write(message);
  } else {
    clientList.forEach((client) => {
      client.write(input);
    });
  }
});

server.on("connection", (socket) => {
  clientList.push(socket);
  console.log(clientList.length);

  socket.on("data", (chunk) => {
    console.log(chunk.toString());
    clientList.forEach((s) => {
      if (!(socket === s)) {
        s.write(chunk);
      }
    });
  });

  console.log("Client is Connected", socket.remoteAddress);

  socket.on("error", () => {
    console.error("Client Lost");
  });
  socket.on("close", () => {
    console.log(socket.remoteAddress, "Client is disconnected");
  });
});

server.listen(4000, "0.0.0.0", () => {
  console.log("Listening on port 4000");
});
