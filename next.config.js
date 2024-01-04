/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiHost: process.env.apiHost,
    protocol: process.env.protocol
  }
}

module.exports = nextConfig
