const a = new ArrayBuffer(8, { maxByteLength: 16 });
// const uint8Array = new Uint8Array(a);
// console.log(uint8Array);

// const uint8ArrayDirect = new Uint8Array(4);
// uint8ArrayDirect[0] = 0xef;
// uint8ArrayDirect[2] = 0x10;

// const uint8ArrayDirect = new Uint8Array([0xef, 0x00, 0x00, 0x10]);

// const uint8ArrayDirect = new Uint8Array(1.98 * 1024 * 1024 * 1024);

// for (let i = 0; i < uint8ArrayDirect.byteLength; i++) {
//   uint8ArrayDirect[i] = i + 1;
// }

a.resize(12);

console.log(a);
// console.log(uint8ArrayDirect.buffer);
