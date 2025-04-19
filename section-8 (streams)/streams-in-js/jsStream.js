const input = document.querySelector("input");

input.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const readStream = file.stream();
  const reader = readStream.getReader();
  const result = await reader.read();
  console.log(result);
});
