// Phase 10 — Next.js App Router demo config.
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Workspace TS paketleri (helpers) pre-build olmadan çalışsın.
  transpilePackages: ['@blakfy/accessibility-widget-next', '@blakfy/a11y-core'],
  // Demo, root flat ESLint config'ini kullanır (TS parser kurulu değil).
  // Production lint'i monorepo seviyesinde çalışır; demo build'i bloklamaz.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
