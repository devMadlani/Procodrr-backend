import express from "express";

const app = express();
const port = 4000;

app.get(
  "/",
  // reqest handler middelware - 3 parama
  (req, res, next) => {
    console.log("Middleware 1");
    try {
      console.log(num);
      res.end("Hello World! 1");
    } catch (error) {
      next(error);
    }
  },
  // reqest handler middelware - 2 params
  //error handler middelware - 4 params

  (req, res) => {
    console.log("Middleware 2");
    res.write("Hello World! 2");
  }
);
app.use((err, req, res, next) => {
  console.log("error Middleware ");
  console.log({ error: err.message });
  res.end("error found");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
