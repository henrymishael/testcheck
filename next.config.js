/** @type {import('next').NextConfig} */
const nextConfig = {}
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

module.exports = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
            pathname: '/t/p/w500/**',
          },
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
            pathname:  '/t/p/original/**',
          },
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
            pathname:  '/t/p/w1280/**',
          },
        ],
      },

  
}

