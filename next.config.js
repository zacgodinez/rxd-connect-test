
// import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
// import million from 'million/compiler';
// import { withContentlayer } from 'next-contentlayer'
const million = require("million/compiler");
const { withContentlayer } = require("next-contentlayer");
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};


const nextConfig = withVanillaExtract(config);

module.exports = withContentlayer(million.next(nextConfig));
