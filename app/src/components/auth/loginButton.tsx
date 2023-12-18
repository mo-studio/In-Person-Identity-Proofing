import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button
          onClick={() => signOut()}
          className="usa-button usa-button--outline"
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() => signIn()}
        className="usa-button usa-button--outline"
      >
        Sign in
      </button>
    </>
  );
}
