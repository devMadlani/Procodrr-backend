import fs from "node:fs/promises";
setInterval(() => {
  const date = new Date().toLocaleTimeString();
  fs.writeFile("time.txt", date);
}, 500);
