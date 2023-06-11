"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { fontSans } from "@/lib/fonts";

import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <style jsx global>{`
        :root {
          --font-inter: ${fontSans.style.fontFamily};
        }
      `}</style>

      {children}
    </NextThemesProvider>
  );
}
