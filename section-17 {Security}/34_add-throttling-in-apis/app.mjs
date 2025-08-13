import express from "express";
import bcrypt from "bcrypt";
import { rateLimit } from "express-rate-limit";
import { slowDown } from "express-slow-down";

const app = express();
const PORT = 4000;

const limiter = rateLimit({
  windowMs: 20000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// const throttle = slowDown({
//   windowMs: 5000,
//   delayMs: (hits) => hits * 1000,
// });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function throttle(waitTime = 1000) {
  const throttleData = {};

  return (req, res, next) => {
    const now = Date.now();
    const { previousDelay, lastReqTime } = throttleData[req.ip] || {
      previousDelay: 0,
      lastReqTime: now - waitTime,
    };

    const timePassed = now - lastReqTime;
    const delay = Math.max(0, waitTime + previousDelay - timePassed);

    throttleData[req.ip] = {
      lastReqTime: now,
      previousDelay: delay,
    };
    setTimeout(next, delay);
  };
}
app.use(limiter);
app.use(throttle());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/register", async (req, res) => {
  bcrypt.hashSync("123456", 14);
  return res.json({ message: "Registered Successfully" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Visit http://localhost:${PORT}`);
});
