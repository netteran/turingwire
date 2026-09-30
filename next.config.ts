import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Jekyll served every page with a trailing slash; keeping that avoids a
  // redirect hop on every indexed URL.
  trailingSlash: true,

  async redirects() {
    return [
      // Old paginated index: /page/2/ -> /news/?page=2 is lossy, so send the
      // handful of indexed pagination URLs to the homepage.
      { source: "/page/:num", destination: "/", permanent: true },
      // The companies index was folded into the /publications/ filter.
      { source: "/companies/", destination: "/publications/", permanent: true },
      // The conference-calendar ("Events") page was retired outright.
      { source: "/calendar/", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
