import passport from "passport";

import { withIronSession } from "next-iron-session";

import "../../../../lib/passport";

function handler(req, res) {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "login-gov",
      {
        scope: ["profile", "email"],
      },
      (err, user, info, status) => {
        if (err) {
          reject(err);
        } else {
          req.user = user;
          resolve();
        }
      }
    )(req, res, (err) => {
      if (err) {
        res.status(500).end(err.toString());
      } else {
        res.status(200).end("Success");
      }
    });
  });
}

export default withIronSession(handler, {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "login-gov-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
