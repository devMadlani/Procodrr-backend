// Cross-Origin Resource Sharing (CORS)

import express from "express";
import cors from "cors";
const app = express();
const PORT = 4000;

app.use(express.static("public"));
app.use(cors());
// app.use((req, res, next) => {
//   const allowdOrigins = ["http://127.0.0.1:5500", "http://localhost:5500"];
//   if (allowdOrigins.includes(req.headers.origin)) {
//     res.set("Access-Control-Allow-Origin", req.headers.origin);
//   }
//   // res.set("Access-Control-Allow-Origin", "*"); // allow all origins
//   next();
// });

app.get("/api", (req, res) => {
  res.json({ message: "Hello, world get!" });
});

app.post("/api", (req, res) => {
  res.json({ message: "Hello, world post!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
