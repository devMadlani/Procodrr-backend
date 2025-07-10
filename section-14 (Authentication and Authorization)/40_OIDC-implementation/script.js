const code = new URLSearchParams(location.search).get("code");

const clientId =
  "1095542063427-n6ii04rv6k0hp8u9uno1ir7j09jul1nf.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUrl = "http://localhost:5500";

if (code) {
  fetchIdToken();
}

async function fetchIdToken() {
  const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  const data = await response.json();
  const userToken = data.id_token.split(".")[1];
  const userData = JSON.parse(atob(userToken));
  console.log(data);
  console.log(userData);
}
