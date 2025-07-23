// function googleLoginCallback(res) {
//   console.,log(res);
// }
const client_id =
  "1095542063427-n6ii04rv6k0hp8u9uno1ir7j09jul1nf.apps.googleusercontent.com";
window.onload = function () {
  google.accounts.id.initialize({
    client_id: client_id,
    callback: (res) => {
      if (res.credential) {
        loginUserWithIdToken(res.credential);
      } else {
        console.log("Something went wrong");
      }
    },
  });
  google.accounts.id.renderButton(document.getElementById("google-login"), {});
  google.accounts.id.prompt();
};

async function loginUserWithIdToken(idToken) {
  const baseURL = "http://localhost:4000";
  const response = await fetch(`${baseURL}/auth/google`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });

  if (response.status === 200) {
    location.href = "/";
  }
}
