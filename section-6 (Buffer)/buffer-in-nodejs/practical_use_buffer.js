import fs from "fs/promises";

const a = await fs.readFile("text.txt");

console.log(a);
