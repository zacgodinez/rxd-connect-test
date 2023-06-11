import * as React from "react";
// import { compareDesc, format, parseISO } from "date-fns";
// import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";

export default function TermsPage() {
  // const posts = allPosts.sort((a, b) =>
  //   compareDesc(new Date(a.date), new Date(b.date))
  // );

  // console.log(999, posts);

  return (
    <div className="container">
      <div className="grid gap-4 py-10">
        <div className="grid grid-cols-3 items-start gap-4">
          <h1>Terms</h1>
          <p className="text-sm font-medium leading-none">
            You can customize the theme using{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">
              CSS variables
            </code>
            .{" "}
            <Link
              href="/"
              className="font-medium text-primary underline underline-offset-4"
            >
              Click here
            </Link>{" "}
            to learn more.
          </p>
        </div>
      </div>
    </div>
  );
}
