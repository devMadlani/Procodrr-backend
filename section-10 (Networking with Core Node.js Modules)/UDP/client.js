import dgram from "dgram";

const socket = dgram.createSocket("udp4");

socket.on("message", (message) => {
  console.log(message.toString());
  socket.close();
});

socket.send("hello from Laptop", 4000, "192.168.192.182");
