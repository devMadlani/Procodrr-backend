const clientId =
  "1095542063427-n6ii04rv6k0hp8u9uno1ir7j09jul1nf.apps.googleusercontent.com";
const redirectUrl = "http://localhost:5500/callback.html";
const clientSecret = "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";

export async function fetchUser(code) {
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

  return userData;
}
