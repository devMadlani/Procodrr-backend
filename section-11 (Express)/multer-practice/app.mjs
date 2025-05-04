import express from "express";
import multer from "multer";
import path from "path";
const app = express();
const PORT = 4000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const id = crypto.randomUUID();
    const extension = path.extname(file.originalname);
    file.id = id;
    cb(null, `${id}${extension}`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Single File
// app.post("/upload", upload.single("profilePic"), (req, res) => {
//   console.log(req.file);
//   res.json({ message: "Data Sent!" });
// });

//Multiple File
app.post(
  "/upload",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "bg", maxCount: 2 },
  ]),
  (req, res) => {
    console.log(req.files);
    res.json(req.files);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
