"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Country = "EC" | "CO";

interface CountryCtx {
  country: Country;
  setCountry: (c: Country) => void;
  flag: string;
  label: string;
  currency: string;
  whatsapp: string;
  phone: string;
}

// Mapa centralizado — única fuente de verdad para datos por país
export const COUNTRY_MAP: Record<Country, Omit<CountryCtx, "country" | "setCountry">> = {
  EC: { flag: "🇪🇨", label: "Ecuador",  currency: "USD", whatsapp: "593939779707",  phone: "+593 93 977 9707" },
  CO: { flag: "🇨🇴", label: "Colombia", currency: "COP", whatsapp: "573213218412",   phone: "+57 321 321 8412" },
};

// Context creado con null para detectar uso fuera del Provider
const ctx = createContext<CountryCtx | null>(null);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<Country>("EC");
  return (
    <ctx.Provider value={{ country, setCountry, ...COUNTRY_MAP[country] }}>
      {children}
    </ctx.Provider>
  );
}

export function useCountry(): CountryCtx {
  const value = useContext(ctx);
  if (!value) {
    throw new Error("useCountry() debe usarse dentro de <CountryProvider>. Asegúrate de que app/layout.tsx tiene el Provider.");
  }
  return value;
}
