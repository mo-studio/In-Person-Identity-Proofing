import { Issuer } from "openid-client";

const loginGovIssuer = await Issuer.discover(
  "https://idp.int.identitysandbox.gov/.well-known/openid-configuration"
);
console.log(
  "Discovered issuer %s %O",
  loginGovIssuer.issuer,
  loginGovIssuer.metadata
);

const client = new loginGovIssuer.Client({
  client_id: process.env.LOGIN_GOV_CLIENT_ID,
  redirect_uris: ["http://localhost:3000/api/auth/callback"],
  response_types: ["code"],
});
