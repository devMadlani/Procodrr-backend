import fs from "fs/promises";

const ImgData = await fs.readFile("./saturoGojo.jpg");

await fs.writeFile("newImg.png", ImgData);
