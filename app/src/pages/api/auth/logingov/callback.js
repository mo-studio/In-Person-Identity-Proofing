import passport from "passport";

import "../../../../lib/passport";

export default async function (req, res, next) {
  passport.authenticate("login-gov", {
    // failureRedirect: "/login"
    scope: ["profile", "email"],
    session: false,
  })(req, res, next);
}
