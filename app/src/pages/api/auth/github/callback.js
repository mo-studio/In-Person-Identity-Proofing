import { setCookies } from "cookies-next";
import passport from "passport";

import "../../../../lib/passport";

export default async function (req, res, next) {
  passport.authenticate("github", (err, user, info) => {
    console.log("err", err);
    console.log("user", user);
    console.log("info", info);
    if (err || !user) res.redirect("http://localhost:3000/?status=auth_fail");

    // setCookies("token", info.token, { req, res });
    console.log("user", user);
    res.redirect("http://localhost:3000/?status=success");
  })(req, res, next);
}
