/* eslint-disable */
import React from "react";
import NextLink from "next/link";

export default function Settings(props: any) {
  return (
    <div>
      <p>hello, this is the settings</p>
      <pre>{props}</pre>
      <NextLink href="/">Home</NextLink>
    </div>
  );
}

export const getStaticProps = () => {
  const pageSeo = {
    test: "hello",
  };

  return {
    props: {
      pageSeo,
    },
  };
};
