import type { NextConfig } from "next";

/**
 * GitHub Pages serves this repo at https://typesofplays.github.io/WEBLOOM,
 * so the production build needs a base path and a fully static export.
 * `GITHUB_PAGES=true` is set by the deploy workflow only — local `npm run dev`
 * and `npm run build` stay at the root path.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "/WEBLOOM";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isPages ? repo : "",
  assetPrefix: isPages ? repo : undefined,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? repo : "" },
};

export default nextConfig;
