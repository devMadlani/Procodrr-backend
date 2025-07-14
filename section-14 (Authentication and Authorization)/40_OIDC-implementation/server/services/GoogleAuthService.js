import { OAuth2Client } from "google-auth-library";

export async function fetchUser(code) {
  const clientId = process.env.CLIENT_ID;
  const redirectUrl = "http://localhost:4000/auth/google/callback";
  const clientSecret = process.env.CLIENT_SECRET;

  const client = new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri: redirectUrl,
  });
  const { tokens } = await client.getToken(code);

  const loginTicket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientId,
  });

  const userData = loginTicket.getPayload();

  return userData;
}
