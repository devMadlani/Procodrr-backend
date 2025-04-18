import EventEmitter from "events";

const emitter = new EventEmitter();

emitter.on("dev", () => {
  console.log("dev");
});
emitter.on("dev", () => {
  console.log("dev2");
});
emitter.once("krishna", () => {
  console.log("once 1");
});
// emitter.once("krishna", () => {
//   console.log("once 2");
// });
emitter.emit("dev");
emitter.emit("krishna");
emitter.emit("krishna");
console.log("end");
