import net from "node:net";

const socket = net.createConnection(
  { port: 4000, host: "192.168.192.182" },
  () => {
    console.log("connected");
  }
);

socket.on("error", () => {
  console.log("Server Lost");
});
socket.on("data", (chunk) => {
  console.log(chunk.toString());
});

socket.write("dev");
