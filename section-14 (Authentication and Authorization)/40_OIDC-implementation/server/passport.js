import passport from "passport";
import { Strategy as GoogleStragy } from "passport-google-oauth20";
import { config } from "./config.js";
passport.use(
  new GoogleStragy(
    {
      clientID: config.clientId,
      clientSecret: config.clientSecret,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);
