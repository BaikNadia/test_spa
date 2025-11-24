import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Включаем strict mode для TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint настройки теперь в отдельном файле eslint.config.mjs
  // Настройки для production
  output: 'standalone',
}

export default nextConfig
