import { OAuth2Client } from "google-auth-library";
import { config } from "../config.js";

const clientId = config.clientId;
const clientSecret = config.clientSecret;
const redirectUrl = "http://localhost:4000/auth/google/callback";
const client = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: redirectUrl,
});

export async function fetchUser(code) {
  const { tokens } = await client.getToken(code);

  const loginTicket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientId,
  });

  const userData = loginTicket.getPayload();

  return userData;
}

export async function verifyIdToken(idToken) {
  const loginTicket = await client.verifyIdToken({
    idToken: idToken,
    audience: clientId,
  });

  const userData = loginTicket.getPayload();

  return userData;
}

export function generateGoogleAuthUrl() {
  return client.generateAuthUrl({
    scope: ["email", "profile", "openid"],
    // prompt: "consent", //prompt the user for consent
    // login_hint: "madlanidev@gmail.com", //don't show popup if match this email
  });
}
