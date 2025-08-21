
import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com', 'i.pravatar.cc'],
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)