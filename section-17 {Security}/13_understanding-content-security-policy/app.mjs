import express from "express";
import mongoose from "mongoose";
import { createHash } from "crypto";
import crypto from "crypto";
const app = express();
import { readFile } from "fs/promises";
app.use(express.json());

const hash = createHash("sha256")
  .update(`\n        console.log("hii");\n      `)
  .digest("base64");

// console.log(hash);

await mongoose.connect("mongodb://localhost:27017/socialApp");

const postSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Middleware

app.use(async (req, res, next) => {
  const nonce = crypto.randomBytes(16).toString("base64");
  if (req.headers.accept?.startsWith("text/html")) {
    res.setHeader(
      "Content-Security-Policy",
      `default-src 'self' ; \
      script-src  'self' 'nonce-${nonce}'  'report-sample'; \
      img-src 'self' https://images.unsplash.com; \
      style-src 'self' ; \
      connect-src 'self';  \
      report-uri /csp-violation`
    );
  }
  if (req.url === "/") {
    const indexHTMLFile = await readFile("./public/index.html", "utf-8");
    indexHTMLFile.replace("${nonce}", nonce);

    return res.end(indexHTMLFile.replace("${nonce}", nonce));
  }
  next();
});

app.use(express.static("./public"));

// Routes
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  // res.setHeader("Set-Cookie", "loginSecret=hdxhw7yrx.k;");
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const post = new Post({ content: req.body.content });
  await post.save();
  res.status(201).json(post);
});

app.post(
  "/csp-violation",
  express.json({ type: "application/csp-report" }),
  async (req, res) => {
    console.log(req.body);
    res.end();
  }
);
// Start server
app.listen(4000, () => console.log("Server running on http://localhost:4000"));
