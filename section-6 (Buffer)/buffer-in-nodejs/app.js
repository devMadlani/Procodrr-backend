import { Buffer, constants } from "buffer";
console.log(constants.MAX_LENGTH);
// const nodeBuffer = Buffer.from(a);
const nodeBuffer = Buffer.alloc(4);
const nodeBuffer2 = Buffer.allocUnsafe(4);
const nodeBuffer3 = Buffer.from([2, 4, 5, 3]);
console.log(nodeBuffer.buffer.byteLength);
console.log(nodeBuffer.byteLength);

console.log(nodeBuffer2.buffer.byteLength);
console.log(nodeBuffer2.byteLength);
console.log(nodeBuffer3.buffer.byteLength);
console.log(nodeBuffer3.byteLength);
