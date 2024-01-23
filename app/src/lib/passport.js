import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

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
