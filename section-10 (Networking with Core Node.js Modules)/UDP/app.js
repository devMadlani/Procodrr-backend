import dgram from "dgram";

const socket = dgram.createSocket("udp4");

socket.on("message", (message, remoteAddress) => {
  console.log(message.toString());
  console.log(remoteAddress);
  socket.send("Message Recieved", remoteAddress.port, remoteAddress.address);
});

// socket.send("hello from Laptop", 2000, "192.168.192.182");
socket.bind(4000, () => {
  console.log("running right not on port 4000");
});
