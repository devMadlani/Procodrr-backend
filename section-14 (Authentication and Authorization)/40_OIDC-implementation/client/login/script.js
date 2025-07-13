const button = document.querySelector("button");
const baseURL = "http://localhost:4000";

button.addEventListener("click", () => {
  window.open(`${baseURL}/auth/google`, "auth-popup", "width=500,height=600");
});

// let hasFetchedToken = false;
window.addEventListener("message", async ({ data }) => {
  if (data.message === "success") {
    location.href = "/";
  }
});
