import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 4000;
app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.cookies, "cookies");
  console.log(req.headers.cookie);
  // res.set({
  //   "Set-Cookie": [
  //     "name=John;SameSite=None;secure",
  //     "age=25;SameSite=None;secure",
  //   ],
  // });
  res.cookie("name", "John", {
    sameSite: "none",
    secure: true,
    maxAge: 60 * 1000,
  });
  res.cookie("age", "25", {
    sameSite: "none",
    secure: true,
    maxAge: 60 * 1000,
  });
  res.json("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
