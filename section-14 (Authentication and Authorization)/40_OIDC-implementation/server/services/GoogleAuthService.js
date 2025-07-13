export async function fetchUser(code) {
  const clientId = process.env.CLIENT_ID;
  const redirectUrl = "http://localhost:4000/auth/google/callback";
  const clientSecret = process.env.CLIENT_SECRET;
  console.log(clientId, clientSecret);
  const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  const data = await response.json();
  console.log(data);
  const userToken = data.id_token.split(".")[1];
  const userData = JSON.parse(atob(userToken));

  return userData;
}
