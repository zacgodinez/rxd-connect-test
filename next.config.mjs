
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import million from 'million/compiler';

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

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

export default million.next(nextConfig);
