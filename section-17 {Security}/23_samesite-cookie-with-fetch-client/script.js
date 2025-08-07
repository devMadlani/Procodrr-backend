const form = document.querySelector(".login-form");
const username = document.querySelector(".name");
const email = document.querySelector(".email");
const userProfile = document.querySelector(".user-profile");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch("https://api.local.com/login", {
    method: "POST",
    credentials: "include",
  });
  fetchUser();
});

async function fetchUser() {
  const userRes = await fetch("https://api.local.com/user", {
    credentials: "include",
  });
  if (userRes.status === 200) {
    const userData = await userRes.json();
    username.textContent = userData.name;
    email.textContent = userData.email;
    form.classList.add("hidden");
    userProfile.classList.remove("hidden");
  } else {
    form.classList.remove("hidden");
    userProfile.classList.add("hidden");
  }
}

fetchUser();
