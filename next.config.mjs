/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    // Réduire le niveau de journalisation
    config.infrastructureLogging = {
      level: "error",
    };

    // Désactiver le cache en mode développement
    if (dev) {
      config.cache = false;
    }

    return config;
  },
};

export default nextConfig;
