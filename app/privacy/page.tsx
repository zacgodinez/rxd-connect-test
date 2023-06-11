import * as React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container">
      <div className="grid gap-4 py-10">
        <div className="grid grid-cols-3 items-start gap-4">
          <h1>Privacy</h1>
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
