import { IntakeContextProvider } from "src/contexts/IntakeContext";
import { ProofingContextProvider } from "src/contexts/ProofingContext";

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "src/components/Layout";

import "src/assets/stylesheets/styles.scss";
import "src/assets/stylesheets/intake.scss";
import "src/styles/styles.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/logo.svg`}
        />
      </Head>

      <SessionProvider session={session}>
        <IntakeContextProvider>
          <ProofingContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProofingContextProvider>
        </IntakeContextProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
