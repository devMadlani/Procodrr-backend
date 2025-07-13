const baseURL = "http://localhost:4000";

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const img = document.querySelector("#img");

const res = await fetch(`${baseURL}/profile`, {
  credentials: "include",
});
if (res.status === 401) {
  location.href = "./login";
}
const { data } = await res.json();
console.log(data.picture);
if (data) {
  name.textContent = data.name;
  email.textContent = data.email;
  img.src = data.picture;
}
