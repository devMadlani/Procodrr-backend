import express from "express";
import cookieParser from "cookie-parser";
import https from "https";
import { readFileSync } from "fs";
const app = express();
const PORT = 443;

app.use(cookieParser());

const authMiddleware = (req, res, next) => {
  if (req.cookies.sid || req.url === "/login") {
    return next();
  }
  return res.status(401).json({ error: "Not Logged in" });
};
app.use(express.urlencoded({ extended: false }));
app.use(authMiddleware, express.static("./public"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://local.com:5500");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const sslOptions = {
  key: readFileSync("./key.pem"),
  cert: readFileSync("./cert.pem"),
};

app.get("/user", authMiddleware, (req, res) => {
  res.json({
    name: "dev",
    email: "dev@gmail.com",
  });
});

app.post("/login", (req, res) => {
  res.cookie("sid", "12345", {
    sameSite: "none",
    secure: true,
  });
  res.json({ message: "Logged in Successfully" });
});

// app.listen(PORT, "127.0.0.2", () => {
//   console.log(`🚀 Visit http://localhost:${PORT}`);
// });

https.createServer(sslOptions, app).listen(PORT, "127.0.0.2", () => {
  console.log(`🚀 HTTPS server running at https://127.0.0.2:${PORT}`);
});
