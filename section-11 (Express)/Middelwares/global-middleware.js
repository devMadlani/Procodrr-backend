import express from "express";

const app = express();
const port = 4000;

app.use((req, res, next) => {
  console.log(req.headers);
  console.log(req.url);
  // res.send("Global Middleware");
  next();
});

app.get("/", (req, res) => {
  console.log(req.url);
  res.send("Home Get Route");
});

app.post("/", (req, res) => {
  console.log(req.url);
  res.send("Home POst Route");
});

app.put("/", (req, res) => {
  console.log(req.url);
  res.send("Home put Route");
});

app.patch("/", (req, res) => {
  console.log(req.url);
  res.send("Home Patch Route");
});
app.delete("/", (req, res) => {
  console.log(req.url);
  res.send("Home Delete Route");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
