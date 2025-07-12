const button = document.querySelector("button");
const baseURL = "http://localhost:4000";
const clientId =
  "1095542063427-n6ii04rv6k0hp8u9uno1ir7j09jul1nf.apps.googleusercontent.com";
const redirectUrl = "http://localhost:5500/callback.html";
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`;

button.addEventListener("click", () => {
  window.open(authUrl, "auth-popup", "width=500,height=600");
});

// let hasFetchedToken = false;
window.addEventListener("message", async ({ data }) => {
  if (data.code) {
    const res = await fetch(`${baseURL}/auth/google/callback`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();
    console.log(resData);
  }
});
