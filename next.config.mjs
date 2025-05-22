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
  env: {
    NEXT_PRIVATE_KEY: process.env.NEXT_PRIVATE_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/live',
        destination: process.env.NEXT_PUBLIC_LIVE_PRICES,
      },
      // {
      //   source: '/static',
      //   destination: '/daily_prices_for_jesus.csv',
      // },
    ]
  },
  async headers() {
    const headers = []

    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
      headers.push({
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      })
    }

    return headers
  },
}

export default nextConfig
