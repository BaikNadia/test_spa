import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Включаем strict mode для TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  // Включаем ESLint проверку при сборке
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Настройки для деплоя
  output: 'standalone', // Оптимизация для production
}

export default nextConfig
