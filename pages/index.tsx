import React from "react";
import Head from "next/head";

import LogoTest from "@/components/logo-test";
import * as styles from "@/styles/page.css";

export default function App() {
  return (
    <>
      <Head>
        <title>
          iPhone 12 XS Max For Sale in Colorado - Big Discounts | Apple
        </title>
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
          key="desc"
        />
        <meta
          property="og:description"
          content="And a social description for our cool page"
        />
        <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        />
      </Head>
      <main className={styles.page}>
        <p>are we flicking</p>
        <h1>h1 test</h1>
        <div>
          <LogoTest />
        </div>
      </main>
    </>
  );
}
