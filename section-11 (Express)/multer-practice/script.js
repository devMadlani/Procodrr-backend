const form = document.querySelector("form");
const p = document.querySelector("p");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:4000/upload", true);
  xhr.responseType = "json";
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
  });
  xhr.upload.addEventListener("progress", (e) => {
    const percent = Math.round((e.loaded / e.total) * 100);
    p.innerText = `Progress: ${percent}%`;
  });
  xhr.send(formData);
});
