/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    publicRuntimeConfig: {
        baseUrl: process.env.BASE_URL || 'https://still-scrubland-46691.herokuapp.com'
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/"
                    }
                }
            ]
        });

        return config;
    },
}

module.exports = nextConfig
