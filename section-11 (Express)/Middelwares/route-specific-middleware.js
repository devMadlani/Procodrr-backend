import express from "express";

const app = express();
const port = 4000;
app.use(express.json());

app.use("/admin", (req, res, next) => {
  if (req.body.password === "secret") {
    next();
  } else {
    res.end("Unauthorized");
  }
});

app.post("/admin", (req, res) => {
  res.send("Hello Admin");
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
