const { Worker } = require("worker_threads");

new Worker("./a.js");
new Worker("./b.js");
new Worker("./c.js");
// const a = require("./a");
// const b = require("./b");
// const c = require("./c");
