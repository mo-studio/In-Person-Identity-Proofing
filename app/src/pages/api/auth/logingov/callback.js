import passport from "passport";

import "../../../../lib/passport";

export default function (req, res) {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "login-gov",
      {
        scope: ["profile", "email"],
        session: false,
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
