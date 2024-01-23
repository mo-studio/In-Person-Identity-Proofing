import passport from "passport";

import "../../../../lib/passport";

export default async function (req, res, next) {
  console.log("req", req);
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
}
