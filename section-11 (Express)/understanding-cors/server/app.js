// Cross-Origin Resource Sharing (CORS)
// The preflight request is sent when the request is not a simple request

import express from "express";
import cors from "cors";
const app = express();
const PORT = 4000;

app.use(express.static("public"));
app.use(
  cors({
    allowedHeaders: "Content-Type",
    methods: ["DELETE", "PUT"],
    origin: "*",
  })
);
// app.use((req, res, next) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Methods", "PUT,DELETE");
//   next();
// });

app.get("/api", (req, res) => {
  res.json({ message: "Hello, world get!" });
});

app.post("/api", (req, res) => {
  res.json({ message: "Hello, world post!" });
});

app.put("/api", (req, res) => {
  res.json({ message: "Hello, world put!" });
});

app.delete("/api", (req, res) => {
  res.json({ message: "Hello, world delete!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
