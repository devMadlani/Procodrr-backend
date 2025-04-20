import express from "express";
const app = express();
const port = 4000;
// app.get("/", (req, res) => {
//   res.send("Hello World");
//   //   res.setHeader("Content-Type", "text/html; charset=utf8");
//   //   res.end("Hello");
// });

app.listen(port, () => {
  console.log(`server started on part ${port}`);
});
