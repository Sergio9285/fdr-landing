"use client";
import { useCountry } from "@/lib/CountryContext";

export default function CountrySwitcher() {
  const { country, setCountry } = useCountry();

  return (
    <div className="flex items-center gap-1 rounded-full p-1"
         style={{ background:"rgba(0,0,0,.15)", border:"1px solid rgba(255,255,255,.2)" }}>
      <button
        onClick={() => setCountry("EC")}
        title="Ecuador"
        aria-label="Cambiar a Ecuador"
        className="w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-lg transition-all duration-300"
        style={{
          background: country === "EC" ? "rgba(255,255,255,.25)" : "transparent",
          transform: country === "EC" ? "scale(1.15)" : "scale(0.9)",
          opacity: country === "EC" ? 1 : 0.5,
        }}>
        🇪🇨
      </button>
      <button
        onClick={() => setCountry("CO")}
        title="Colombia"
        aria-label="Cambiar a Colombia"
        className="w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-lg transition-all duration-300"
        style={{
          background: country === "CO" ? "rgba(255,255,255,.25)" : "transparent",
          transform: country === "CO" ? "scale(1.15)" : "scale(0.9)",
          opacity: country === "CO" ? 1 : 0.5,
        }}>
        🇨🇴
      </button>
    </div>
  );
}
