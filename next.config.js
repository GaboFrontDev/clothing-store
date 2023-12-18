/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8081',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'store_strapi',
        port: '1337',
        pathname: '**',
      },

    ],
  },

}

module.exports = nextConfig
