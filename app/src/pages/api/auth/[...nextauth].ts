import crypto from "crypto";

import NextAuth from "next-auth";

// import GitHubProvider from "next-auth/providers/github";

// Function to generate a secure nonce
const generateNonce = () => {
  return crypto.randomBytes(16).toString("base64");
};

export const authOptions = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID ?? "",
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    // }),
    {
      id: "logingov",
      name: "Login.gov",
      type: "oauth",
      wellKnown:
        "https://idp.int.identitysandbox.gov/.well-known/openid-configuration",
      token: {
        url: "https://idp.int.identitysandbox.gov/api/openid_connect/token",
        auth: { method: "none" }, // Explicitly set the authentication method to 'none'
      },
      clientId: process.env.LOGINGOV_CLIENT_ID ?? "",
      clientSecret: null,
      client: {
        token_endpoint_auth_method: "private_key_jwt",
      },
      nonce: generateNonce(),
      authorization: {
        params: {
          scope: "openid email", // Adjust the scope as needed
          acr_values: "http://idmanagement.gov/ns/assurance/ial/1", // Adjust the acr_values as per Login.gov requirements
          nonce: generateNonce(),
        },
      },
    },
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback", { token, user, session });
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
