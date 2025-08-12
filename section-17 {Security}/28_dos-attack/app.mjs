import express from "express";
import bcrypt from "bcrypt";

const app = express();
const PORT = 4000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

const rateLimitStore = {};

function rateLimiter({ windowSize, numOfRequest }) {
  return function (req, res, next) {
    const currentTime = Date.now();
    if (!rateLimitStore[req.ip]) {
      rateLimitStore[req.ip] = {
        startTime: currentTime,
        count: 1,
      };
      return next();
    }
    if (currentTime - rateLimitStore[req.ip].startTime > windowSize) {
      rateLimitStore[req.ip] = {
        startTime: currentTime,
        count: 1,
      };
    } else {
      rateLimitStore[req.ip].count++;
      if (rateLimitStore[req.ip].count > numOfRequest) {
        return res.status(429).json({ error: "Too many request" });
      }
    }
    console.log(rateLimitStore);
    next();
  };
}

app.get(
  "/register",
  rateLimiter({ windowSize: 100000, numOfRequest: 10 }),
  async (req, res) => {
    bcrypt.hashSync("123456", 14);
    return res.json({ message: "Registered Successfully" });
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Visit http://localhost:${PORT}`);
});
