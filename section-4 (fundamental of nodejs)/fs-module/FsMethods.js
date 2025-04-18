import fs from "node:fs/promises";

// fs.rename("./copy.png", "./copy-2.png"
// );
// fs.copyFile("./copy-2.png", "./src/copy-3.png");
// fs.cp("./src", "./dist", { recursive: true });

// --- To move -----
// fs.rename("src/copy.png", "./rename-move.png");

// fs.copyFile("./rename-move.png", "delete.png");

// fs.unlink("/dist/ss.png");
fs.rmdir("./test", { recursive: true });
