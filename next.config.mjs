/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ['src'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false },
                  },
                },
              ],
            },
            titleProp: true,
          },
        },
      ],
    })

    config.externals.push('pino-pretty', 'lokijs', 'encoding')

    return config
  },
  async rewrites() {
    return [
      {
        source: '/prices', // Matches any request starting with /api/
        destination: 'https://bear-protocol-ux.s3.ap-northeast-1.amazonaws.com/daily_prices_for_jesus.csv',
      },
    ]
  },
}

export default nextConfig
