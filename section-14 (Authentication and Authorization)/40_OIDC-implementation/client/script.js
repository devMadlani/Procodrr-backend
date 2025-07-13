const baseURL = "http://localhost:4000";

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const img = document.querySelector("#img");
const logutBtn = document.querySelector("button");

logutBtn.addEventListener("click", async () => {
  const res = await fetch(`${baseURL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  console.log(res.status === 204);
  if (res.status === 204) {
    location.href = "/login";
  }
});

const res = await fetch(`${baseURL}/profile`, {
  credentials: "include",
});

if (res.status === 401) {
  location.href = "./login";
}

const { data } = await res.json();
if (data) {
  name.textContent = data.name;
  email.textContent = data.email;
  img.src = data.picture;
}
