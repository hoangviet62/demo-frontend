/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    publicRuntimeConfig: {
        baseUrl: 'https://still-scrubland-46691.herokuapp.com'
    }
}

module.exports = nextConfig
