import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Oculta el indicador circular de Next.js (la "N") que aparece en desarrollo.
  // En producción nunca se muestra; esto solo limpia la vista local.
  devIndicators: false,
};

export default nextConfig;
