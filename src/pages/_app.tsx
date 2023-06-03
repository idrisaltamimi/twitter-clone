import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";

import SideNav from "~/components/SideNav";
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="This is a twitter clone by Idris" />
        <link rel="icon" href="/twitter-icon.svg" />
      </Head>
      <div className="container mx-auto flex max-w-[1440px] items-start sm:pr-4">
        <SideNav />
        <div className="min-h-screen flex-grow border-x">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
