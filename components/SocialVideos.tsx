"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const IG = "https://www.instagram.com/fdr.suspension/";
const FB = "https://www.facebook.com/profile.php?id=61576369366374";
const TT = "https://www.tiktok.com/@fdr.parts";

/* ────────────────────────────────────────────────────────────────
   REELS — se reproducen DENTRO de la página y rotan al azar.

   Para agregar más, pega solo el ID/código del enlace:
   · TikTok    https://www.tiktok.com/@fdr.parts/video/7536755928624811269
                                                      └──── este es el id ────┘
   · Instagram https://www.instagram.com/reel/C8xYzAbCdEf/
                                              └── este es el id ──┘
   `cover` es opcional (portada local mientras no se toca el video).
   ──────────────────────────────────────────────────────────────── */
type Reel = { net: "TikTok" | "Instagram"; id: string; label: string; cover?: string };

const REELS: Reel[] = [
  // TikTok — miniatura y título tomados del video real
  { net: "TikTok", id: "7536755928624811269", label: "Dentro de la planta",   cover: "/opt/reels/tt-7536755928624811269.webp" },
  { net: "TikTok", id: "7523429669677452550", label: "Visitamos Villavicencio", cover: "/opt/reels/tt-7523429669677452550.webp" },
  { net: "TikTok", id: "7521932851315576070", label: "Quienes están detrás",  cover: "/opt/reels/tt-7521932851315576070.webp" },
  { net: "TikTok", id: "7565726195057315080", label: "Tecnología de punta",   cover: "/opt/reels/tt-7565726195057315080.webp" },
  { net: "TikTok", id: "7644381069663341844", label: "Ser camionero",         cover: "/opt/reels/tt-7644381069663341844.webp" },
  { net: "TikTok", id: "7615812014098697493", label: "Precisión CNC",         cover: "/opt/reels/tt-7615812014098697493.webp" },
  { net: "TikTok", id: "7541964037467147525", label: "Tips de carretera",     cover: "/opt/reels/tt-7541964037467147525.webp" },
  // Instagram — no permite descargar la miniatura, se usa una portada propia.
  // El video real se ve al tocar la tarjeta.
  { net: "Instagram", id: "DNI2yUpNFZY", label: "Reel FDR", cover: "/opt/terminal-caja-fdr.webp" },
  { net: "Instagram", id: "DVTW_vuDXI7", label: "Reel FDR", cover: "/opt/king-pin-cajas-fdr.webp" },
  { net: "Instagram", id: "DQfuUiajpid", label: "Reel FDR", cover: "/opt/cliente-distribuidor.webp" },
  { net: "Instagram", id: "DLmq5BJSchD", label: "Reel FDR", cover: "/opt/galeria-2.webp" },
];

/* Portadas de respaldo: solo se usan si algún día faltan reels. */
const FALLBACKS = [
  { net: "Instagram" as const, cover: "/opt/terminal-caja-fdr.webp",    label: "Terminales en acción",       href: IG },
  { net: "TikTok"    as const, cover: "/opt/king-pin-cajas-fdr.webp",   label: "Pines y bocines Heavy Duty", href: TT },
  { net: "Instagram" as const, cover: "/opt/cliente-distribuidor.webp", label: "Clientes FDR",               href: IG },
  { net: "TikTok"    as const, cover: "/opt/galeria-4.webp",            label: "Fabricación FDR",            href: TT },
];

const SLOTS = 4;

const openSrc = (r: Reel) =>
  r.net === "TikTok"
    ? `https://www.tiktok.com/@fdr.parts/video/${r.id}`
    : `https://www.instagram.com/reel/${r.id}/`;

const NET_COLOR: Record<string, string> = { Instagram: "#E1306C", TikTok: "#00f2ea", Facebook: "#1877F2" };

const socials = [
  { name:"Instagram", handle:"@fdr.suspension", href:IG, grad:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
    icon:<><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
  { name:"Facebook", handle:"FDR Suspension Parts", href:FB, grad:"linear-gradient(135deg,#1877F2,#0a52c4)",
    icon:<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/> },
  { name:"TikTok", handle:"@fdr.parts", href:TT, grad:"linear-gradient(135deg,#00f2ea,#ff0050)",
    icon:<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/> },
];

export default function SocialVideos() {
  // Orden inicial estable (evita desajuste con el HTML del servidor);
  // al montar en el navegador se baraja al azar.
  const [reels, setReels] = useState<Reel[]>(() => REELS.slice(0, SLOTS));
  const [fills, setFills] = useState(() => FALLBACKS.slice(0, Math.max(0, SLOTS - REELS.length)));

  useEffect(() => {
    const shuffle = <T,>(a: T[]) => {
      const c = [...a];
      for (let i = c.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [c[i], c[j]] = [c[j], c[i]];
      }
      return c;
    };
    const picked = shuffle(REELS).slice(0, SLOTS);
    setReels(picked);
    setFills(shuffle(FALLBACKS).slice(0, Math.max(0, SLOTS - picked.length)));
  }, []);

  return (
    <section className="py-16 lg:py-28 relative" style={{ background:"linear-gradient(180deg,#002060 0%,#001f5c 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:"linear-gradient(rgba(0,58,140,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,58,140,.05) 1px,transparent 1px)",
        backgroundSize:"60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-14">
          <div className="section-divider" />
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3" style={{ color:"#E30613" }}>
            Síguenos en redes
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            FDR en{" "}
            <span style={{ background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", backgroundSize:"200% auto",
                           WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                           animation:"shimmer 4s linear infinite" }}>
              movimiento
            </span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Mira nuestros productos en acción y el proceso de fabricación. Toca un video para verlo en TikTok o Instagram.
          </p>
        </div>

        {/* Reels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 lg:mb-14">
          {/* Reels — la tarjeta completa abre el video en su red */}
          {reels.map(r => (
            <a key={`${r.net}-${r.id}`}
               href={openSrc(r)} target="_blank" rel="noopener noreferrer"
               aria-label={`Ver ${r.label} en ${r.net}`}
               className="relative rounded-2xl overflow-hidden group bg-black"
               style={{ aspectRatio:"9/16", border:"1px solid rgba(0,58,140,.3)" }}>
              {r.cover && (
                <Image src={r.cover} alt={r.label} fill sizes="(max-width:1024px) 50vw, 25vw"
                       className="object-cover group-hover:scale-110 transition-transform duration-700" />
              )}
              <span className="absolute inset-0 block" style={{ background:"linear-gradient(to top, rgba(0,5,15,.9) 0%, transparent 50%, rgba(0,5,15,.3) 100%)" }} />

              {/* Botón de play */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background:"rgba(255,255,255,.15)", backdropFilter:"blur(8px)", border:"2px solid rgba(255,255,255,.4)" }}>
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>

              {/* Red */}
              <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background:"rgba(0,5,15,.7)", border:`1px solid ${NET_COLOR[r.net]}66` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background:NET_COLOR[r.net] }} />
                {r.net}
              </span>

              {/* Etiqueta */}
              <span className="absolute bottom-0 left-0 right-0 p-4 block">
                <span className="text-white font-bold text-sm leading-tight block">{r.label}</span>
                <span className="text-white/60 text-xs mt-1 flex items-center gap-1">
                  Ver en {r.net}
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </span>
            </a>
          ))}

          {/* Portadas de respaldo mientras falten reels */}
          {fills.map((v, i) => (
            <a key={`f-${i}`} href={v.href} target="_blank" rel="noopener noreferrer"
               className="relative rounded-2xl overflow-hidden group"
               style={{ aspectRatio:"9/16", border:"1px solid rgba(0,58,140,.3)" }}>
              <Image src={v.cover} alt={v.label} fill
                     className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,5,15,.9) 0%, transparent 50%, rgba(0,5,15,.3) 100%)" }} />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                     style={{ background:"rgba(255,255,255,.15)", backdropFilter:"blur(8px)", border:"2px solid rgba(255,255,255,.4)" }}>
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                   style={{ background:"rgba(0,5,15,.7)", border:`1px solid ${NET_COLOR[v.net]}66` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background:NET_COLOR[v.net] }} />
                {v.net}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-sm leading-tight">{v.label}</p>
                <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
                  Ver en {v.net}
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Social buttons */}
        <div className="grid sm:grid-cols-3 gap-4">
          {socials.map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-105 group"
               style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                   style={{ background:s.grad }}>
                <svg className="w-6 h-6 text-white" fill={s.name==="Facebook"||s.name==="TikTok"?"currentColor":"none"}
                     stroke={s.name==="Instagram"?"currentColor":"none"} strokeWidth={2}
                     strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  {s.icon}
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-black text-sm">{s.name}</p>
                <p className="text-white/50 text-xs truncate">{s.handle}</p>
              </div>
              <svg className="w-5 h-5 text-white/30 group-hover:text-white transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
