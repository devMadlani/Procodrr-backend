import express from "express";
import cors from "cors";
import { fetchUser } from "./services/GoogleAuthService.js";
import { writeFile } from "fs/promises";
import cookieParser from "cookie-parser";
import users from "./userDB.json" with { type : "json"}
import sessions from "./sessionDB.json" with { type : "json"}
const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.post("/auth/google/callback", async (req, res) => {
  const { sid } = req.cookies;
  const existinSession = sessions.find(({ sessionID }) => sessionID === sid);
  if (existinSession) {
    return res.json({ message: "Already logged in" });
  }
  const { code } = req.body;
  const { sub, email, name, picture } = await fetchUser(code);
  const newUer = { id: sub, email, name, picture };
  const existinUser = users.find(({ id }) => id === sub);
  if (existinUser) {
    const existingSessionIndex = sessions.findIndex(
      ({ userId }) => userId === sub
    );
    const sessionID = crypto.randomUUID();

    if (existingSessionIndex === -1) {
      sessions.push({ sessionID, userId: sub });
    }
    else{
      sessions[existingSessionIndex].sessionID = sessionID;
    }
    await writeFile("./sessionDB.json", JSON.stringify(sessions, null, 2));
    res.cookie("sid", sessionID, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    return res.status(200).json(newUer);
  }
  users.push(newUer);
  await writeFile("./userDB.json", JSON.stringify(users, null, 2));
  const sessionID = crypto.randomUUID();
  sessions.push({ sessionID, userId: sub });
  await writeFile("./sessionDB.json", JSON.stringify(sessions, null, 2));
  res.cookie("sid", sessionID, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.status(200).json(newUer);
});

app.get("/profile", (req, res) => {
  const { sid } = req.cookies;
  const existinSession = sessions.find(({ sessionID }) => sessionID === sid);
  if (!existinSession) {
    return res.status(401).json({ message: "Not logged in" });
  }
  const existinUser = users.find(({ id }) => id === existinSession.userId);
  if (!existinUser) {
    return res.status(404).json({ message: "User not founds" });
  }
  return res.status(200).json({ data: existinUser });
});

app.post("/logout", async (req, res) => {
  const { sid } = req.cookies;
  const sessionIndex = sessions.findIndex(({ sessionID }) => sid === sessionID);
  sessions.splice(sessionIndex, 1);
  await writeFile("./sessionDB.json", JSON.stringify(sessions, null, 2));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log("app is listing on port ", PORT);
});
