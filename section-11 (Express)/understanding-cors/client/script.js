const response = await fetch("http://localhost:4000/api", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    // filename: "test.txt",
  },
});
const data = await response.json();

console.log(data);
