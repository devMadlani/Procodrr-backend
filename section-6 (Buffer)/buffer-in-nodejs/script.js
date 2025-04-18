// Buffer  in networking
fetch("http://localhost:3000", {
  method: "POST",
  body: "dev",
})
  .then((res) => res.text())
  .then((data) => console.log(data));
