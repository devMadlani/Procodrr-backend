import express from "express";
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  // res.setHeader("Content-Type", "application/json");
  // res.end(JSON.stringify({ message: "Hello Worlds" }));
  res.status(201).json({ message: "Hello Worlds" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
