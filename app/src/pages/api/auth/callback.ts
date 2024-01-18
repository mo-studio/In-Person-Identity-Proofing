import middleware from "middleware";
import passport from "passport";

import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res, next) => {
  const { provider } = req.query;

  passport.authenticate(provider, {
    failureRedirect: process.env.loginFailureURL,
    successRedirect: process.env.loginSuccessURL,
  })(req, res, next);
});
console.log("callback");

export default handler;
