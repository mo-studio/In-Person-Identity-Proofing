import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Strategy as OpenIDStrategy } from "openid-client";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as OIDCStrategy } from "passport-openidconnect";

const { generators } = require("openid-client");
passport.initialize();
// Function to generate a secure nonce
const generateNonce = () => {
  let nonce = crypto.randomBytes(22).toString("base64");
  console.log("nonce", nonce);
  console.log("nonce", nonce.length);
  return nonce;
};

passport.use;
// Most of the configuration values live in the /.well-known/openid-configuration JSON:
// https://idp.int.identitysandbox.gov/.well-known/openid-configuration
// NOTE: this is just for sandbox, the production values are different
passport.use(
  "login-gov",
  new OIDCStrategy(
    {
      issuer: process.env.LOGINGOV_ISSUER,
      authorizationURL: process.env.LOGINGOV_AUTHORIZATION_URL,
      tokenURL: `${process.env.LOGINGOV_OIDC_API_URL}/token`,
      userInfoURL: `${process.env.LOGINGOV_OIDC_API_URL}/userinfo`,
      clientID: process.env.LOGINGOV_CLIENT_ID,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.LOGINGOV_CALLBACK_URL,
      scope: "openid+email",
      passReqToCallback: true,
      authorizationParams: {
        acr_values: "http://idmanagement.gov/ns/assurance/ial/1",
        nonce: generateNonce(),
      },

      // TODO
      // Redirect uri redirect_uri does not match registered redirect_uri
      // Acr values Please fill in this field.
      // Nonce Please fill in this field.
      // Nonce is too short (minimum is 22 characters)
      // Acr values No acceptable acr_values found
    },
    async function verify(issuer, profile, cb) {
      console.log("issuer", issuer);
      console.log("profile", profile);

      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
      return done(null, profile);
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // TODO: check if user exists in DB
        // const user = await User.findOne({ googleId: profile.id });
        // if (user) {
        //     return done(null, user);
        // }
        const userInfo = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.email,
          avatarUrl: profile.picture,
        };
        // const newUser = await User.create(userInfo);
        console.log(userInfo);
        const token = await jwt.sign(
          { id: 12345, created: Date.now().toString() },
          process.env.JWT_SECRET
        );
        console.log(token);
        // newUser.tokens.push(token);
        // await newUser.save()
        // return done(null, newUser, { message: "Successfully logged in" });
        return done(null, userInfo, {
          message: "Successfully logged in",
          token,
        });
      } catch (error) {
        console.error(error);
        return done(error, false, {
          message: "An error occurred while logging in",
        });
      }
    }
  )
);
