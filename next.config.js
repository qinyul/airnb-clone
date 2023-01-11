/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com"],
  },
  env: {
    mapbox_key:
      "pk.eyJ1IjoiYmFycWkiLCJhIjoiY2t0aWc2MXV6MTF1ZTJ2cGkxNWRzNDhqcSJ9.jCbv5NIBBUXPfala_IMebg",
  },
};

module.exports = nextConfig;
