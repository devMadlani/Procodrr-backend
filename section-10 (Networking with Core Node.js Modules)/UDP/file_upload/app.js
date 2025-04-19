import dgram from "dgram";
import { createWriteStream } from "fs";
import { writeFile } from "fs/promises";

const socket = dgram.createSocket("udp4");

const writeStream = createWriteStream("./numBig.txt");

socket.on("message", async (message, remoteAddress) => {
  //   await writeFile("./num.txt", message.toString());
  if (message.toString() === "EOF") {
    socket.send(
      "File Data recieved Successfully",
      remoteAddress.port,
      remoteAddress.address
    );
  } else {
    writeStream.write(message);
  }
  //   socket.send("Message Recieved", remoteAddress.port, remoteAddress.address);
});

// socket.send("hello from Laptop", 2000, "192.168.192.182");
socket.bind(4000, () => {
  console.log("192.168.192.182");
  console.log("running right not on port 4000");
});
