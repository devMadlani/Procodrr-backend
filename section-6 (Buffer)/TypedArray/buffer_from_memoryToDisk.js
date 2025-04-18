import fs from "fs/promises";
const uintArray = new Uint8Array(3);

uintArray[0] = 0x44;
uintArray[1] = 0x65;
uintArray[2] = 0x76;

// console.log(uintArray);
// const decoder = new TextDecoder();
// console.log(decoder.decode(uintArray));

const view = new DataView(uintArray.buffer);

await fs.writeFile("buffer-text.txt", view);
// await fs.writeFile("buffer-text1.txt", uintArray);
