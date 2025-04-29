import path from "node:path";

// console.log(path.join("src", "index.js"));
// console.log(path.join("src", ".////index.js", "b"));
// console.log(path.normalize("./src//dev////index.js///b"));
// console.log(path.normalize("/src//dev////index.js///b"));
// console.log(path.normalize("../../../../test"));
// console.log(path.normalize("/../../test"));

// console.log(path.join("///..//", "../../../../test"));

// console.log(process.cwd());
// console.log(path.resolve("dev"));

console.log(path.basename("/dev/test.js/test/dev"));
console.log(path.dirname("/dev/test.js/test/dev"));
