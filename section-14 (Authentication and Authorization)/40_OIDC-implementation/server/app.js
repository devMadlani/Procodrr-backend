import express from "express";
import cors from "cors";
import { fetchUser } from "./services/GoogleAuthService.js";
import { writeFile } from "fs/promises";
import users from "./userDB.json" with { type : "json"}
const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    credentials: true,
  })
);

app.use(express.json());

app.post("/auth/google/callback", async (req, res) => {
  const { code } = req.body;
  const { sub, email, name, picture } = await fetchUser(code);
  const newUer = { id: sub, email, name, picture };
  const existinUser = users.find(({ id }) => id === sub);
  if (existinUser) {
    return res.status(200).json(newUer);
  }
  users.push(newUer);
  await writeFile("./userDB.json", JSON.stringify(users, null, 2));
  res.status(200).json(newUer);
});

app.listen(PORT, () => {
  console.log("app is listing on port ", PORT);
});
