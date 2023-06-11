"use client";

import * as React from "react";
import { notFound } from "next/navigation";
// import { useLiveReload } from "next-contentlayer/hooks";
import { allDocs } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import Link from "next/link";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    null;
  }

  return doc;
}

export default function TermsPage() {
  // useLiveReload(); // this only runs during development and has no impact on production
  const doc = getDocFromParams({ params: { slug: ["terms"] } });

  if (!doc) {
    notFound();
  }

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
          <Mdx code={doc.body.code} />
        </div>
      </div>
    </div>
  );
}
