/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets the dev server's JS/HMR load when the app is opened from another
  // device on the LAN (e.g. testing on a phone), not just localhost.
  allowedDevOrigins: ['192.168.1.192'],
  experimental: {
    serverActions: {
      // Receipt uploads (multiple phone photos / PDFs per submission) easily
      // exceed the 1 MB default Server Action body limit.
      bodySizeLimit: '20mb',
    },
  },
};

export default nextConfig;
