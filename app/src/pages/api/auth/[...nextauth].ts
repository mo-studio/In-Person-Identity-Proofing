import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    {
      id: "logingov",
      name: "Login.gov",
      type: "oauth",
      wellKnown:
        "https://idp.int.identitysandbox.gov/.well-known/openid-configuration",
      token: {
        url: "https://idp.int.identitysandbox.gov/api/openid_connect/token",
        params: { some: "param" },
      },
      clientId: process.env.LOGINGOV_CLIENT_ID ?? "",
      acrValues: "http://idmanagement.gov/ns/assurance/ial/1",
      nonce: "kbyv83qiqz41bgr32xj407d8by3qbyxl9ox8kohs9572u7p78aa",
    },
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
