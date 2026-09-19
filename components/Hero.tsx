"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCountry } from "@/lib/CountryContext";

// Nombres dinámicos por país se inyectan en el componente
const BASE_PRODUCTS = [
  { img: "/opt/brazo-nobg.webp",            nameEC: "Brazo de Dirección",        nameCO: "Brazo de Dirección",        desc: "Línea pesada · Acero forjado alta resistencia",   color: "#E30613" },
  { img: "/opt/terminal-brazo-nobg.webp",   nameEC: "Terminal de Dirección",     nameCO: "Terminal de Dirección",     desc: "NPR · Hino 500 · Kenworth · Fabricación propia",  color: "#0064ff" },
  { img: "/opt/splinder-kit-nobg.webp",     nameEC: "Pines y Bocines",           nameCO: "Splinder / King Pin Rueda", desc: "Kit completo · Heavy Duty · Alta durabilidad",    color: "#25D366" },
  { img: "/opt/pernos-rin-nobg.webp",       nameEC: "Pernos de Rin",             nameCO: "Pernos de Rin",             desc: "Tratamiento térmico especializado · Alta resistencia", color: "#ffc800" },
];

export default function Hero() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { whatsapp, country, flag } = useCountry();

  // Nombres dinámicos según país
  const products = BASE_PRODUCTS.map(p => ({
    ...p,
    name: country === "CO" ? p.nameCO : p.nameEC,
  }));

  // Auto-rotate products
  useEffect(() => {
    const len = products.length;
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive(p => (p + 1) % len);
        setAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(t);
  }, [products.length]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = canvas.width  = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const pts: { x:number; y:number; vx:number; vy:number; r:number; a:number }[] = [];
    for (let i = 0; i < 70; i++)
      pts.push({ x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35, r:Math.random()*1.5+.5, a:Math.random()*Math.PI*2 });
    let raf: number | undefined;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += .004;
        if (p.x<0||p.x>w) p.vx*=-1; if (p.y<0||p.y>h) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,80,200,${.25+.2*Math.sin(p.a)})`; ctx.fill();
      });
      for (let i=0;i<pts.length;i++) for (let j=i+1;j<pts.length;j++) {
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if (d<130) { ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=`rgba(0,80,200,${.12*(1-d/130)})`; ctx.lineWidth=.5; ctx.stroke(); }
      }
      raf=requestAnimationFrame(draw);
    };
    draw();
    return () => { if (raf !== undefined) cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const cur = products[active];

  // Ambos países usan la portada azul. El diferenciador es el acento por país.
  const light = false;
  const T = {
    heroBg:     "linear-gradient(135deg, #001f5c 0%, #002d7a 40%, #003A8C 100%)",
    headText:   "#ffffff",
    bodyText:   "rgba(255,255,255,.75)",
    bodyStrong: "#ffffff",
    subtle:     "rgba(255,255,255,.4)",
    dotInactive:"rgba(255,255,255,.2)",
    numberGrad: "linear-gradient(160deg,#fff 0%,rgba(180,210,255,.9) 40%,rgba(100,160,255,.7) 70%,#fff 100%)",
  };

  // Diferenciador Ecuador vs Colombia: acento de color + etiqueta de país
  const isEC     = country === "EC";
  const accent   = isEC ? "#FFC800" : "#E30613";              // Ecuador: dorado (bandera) · Colombia: rojo FDR
  const accentBg = isEC ? "rgba(255,200,0,.16)" : "rgba(227,6,19,.18)";
  const badge    = isEC ? "Ahora en Ecuador" : "Fabricación propia · Colombia";

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden"
             style={{ background: T.heroBg, transition:"background .6s ease" }}>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(0,58,140,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,58,140,.07) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background:"radial-gradient(circle,rgba(255,255,255,.08) 0%,transparent 70%)", transform:"translate(20%,-20%)" }} />
      {/* Glow inferior = acento por país (Ecuador dorado · Colombia rojo) */}
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none transition-all duration-700"
           style={{ background:`radial-gradient(circle,${accentBg} 0%,transparent 70%)`, transform:"translate(-20%,20%)" }} />
      {/* Halo de acento superior derecho, refuerza el color del país */}
      <div className="absolute top-1/4 right-0 w-[420px] h-[420px] rounded-full pointer-events-none transition-all duration-700"
           style={{ background:`radial-gradient(circle,${accentBg} 0%,transparent 68%)`, transform:"translate(30%,-20%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 sm:pt-32 lg:pt-24 pb-14 sm:pb-16">


        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* ── LEFT ── */}
          <div className="space-y-5 lg:space-y-7">
            {/* Etiqueta de país — diferenciador Ecuador / Colombia */}
            <motion.div
              key={country}
              initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:.5, ease:[.23,1,.32,1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background:accentBg, border:`1px solid ${accent}55`,
                       boxShadow:`0 0 24px ${accent}22` }}>
              <span className="text-lg leading-none">{flag}</span>
              <span className="text-xs font-black uppercase tracking-[0.12em]" style={{ color:"#ffffff" }}>{badge}</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background:accent, boxShadow:`0 0 8px ${accent}` }} />
            </motion.div>

            {/* 23+ HUGE */}
            <motion.div className="flex items-end gap-3"
              initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:.7, delay:.1, ease:[.23,1,.32,1] }}>
              <div>
                <div className="number-3d text-[6rem] sm:text-[8rem] lg:text-[11rem] font-black leading-none"
                     style={{ background:T.numberGrad,
                              backgroundSize:"200% auto", WebkitBackgroundClip:"text",
                              WebkitTextFillColor:"transparent", backgroundClip:"text",
                              animation:"shimmer 4s linear infinite" }}>
                  23
                </div>
              </div>
              <div className="pb-3 lg:pb-5">
                <p className="font-black text-3xl lg:text-5xl leading-[0.95] tracking-tight" style={{ color:T.headText }}>años de<br />ingeniería</p>
                <p className="text-sm lg:text-lg font-black uppercase tracking-[0.18em] mt-2" style={{ color:"#E30613" }}>en movimiento</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:.7, delay:.25, ease:[.23,1,.32,1] }}>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight mb-4 h1-shadow" style={{ color:T.headText }}>
                Fabricamos la fuerza<br />
                <span className="red-glow-text" style={{ background:"linear-gradient(135deg,#ff6060,#E30613,#ff4444)",
                               backgroundSize:"200% auto", WebkitBackgroundClip:"text",
                               WebkitTextFillColor:"transparent", backgroundClip:"text",
                               animation:"shimmer 3s linear infinite" }}>
                  que mueve tu flota
                </span>
              </h1>
              <p className="text-base lg:text-lg leading-relaxed max-w-lg" style={{ color:T.bodyText }}>
                Desde las implacables rutas de Colombia, forjamos una visión clara:{" "}
                <span className="font-bold" style={{ color:T.bodyStrong }}>entregar seguridad, calidad y garantía</span>{" "}
                a cada transportista. Somos <strong style={{ color:light ? "#003A8C" : "#fff", textShadow:light ? "none" : "0 0 16px rgba(100,160,255,.4)" }}>fabricantes e importadores directos</strong> —
                sin intermediarios, comprometidos con la calidad.
              </p>
            </motion.div>

            {/* Mobile product image */}
            <div className={`lg:hidden relative flex flex-col items-center gap-3 transition-all duration-400
                            ${animating?"opacity-0 scale-95":"opacity-100 scale-100"}`}
                 style={{ transition:"opacity .35s, transform .35s" }}>
              <div className="relative w-72 h-72"
                   style={{ filter:`drop-shadow(0 0 50px ${cur.color}88)` }}>
                <Image src={cur.img} alt={cur.name} fill className="object-contain animate-float" sizes="224px" />
              </div>
              <div className="text-center px-6 py-3 rounded-xl w-full max-w-xs"
                   style={{ background:"rgba(255,255,255,.95)", border:`2px solid ${cur.color}` }}>
                <p className="font-black text-base" style={{ color:"#001020" }}>{cur.name}</p>
                <p className="text-xs mt-1 font-semibold" style={{ color:cur.color }}>{cur.desc}</p>
              </div>
              <div className="flex gap-1">
                {products.map((p,i) => (
                  <button key={i} disabled={animating}
                          aria-label={`Ver ${p.name}`}
                          onClick={() => { if (animating) return; setAnimating(true); setTimeout(()=>{setActive(i);setAnimating(false)},400); }}
                          className="flex items-center justify-center min-h-[44px] min-w-[32px] disabled:cursor-not-allowed">
                    <span className="block transition-all duration-300 rounded-full"
                          style={{ width:i===active?26:9, height:9,
                                   background:i===active?cur.color:T.dotInactive }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div className="flex gap-3 sm:gap-6"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:.6, delay:.45, ease:[.23,1,.32,1] }}>
              {[
                { v:"500+", l:"Productos",  c:"#E30613" },
                { v:"25+",  l:"Marcas",     c:"#0064ff" },
                { v:"23+",  l:"Años",       c:"#25D366" },
              ].map((s, i) => (
                <motion.div key={s.l} className="card-3d flex-1 text-center px-2 sm:px-4 py-4 rounded-2xl float-3d"
                  style={{ background:"rgba(255,255,255,.97)",
                           border: light ? "1.5px solid #d1daf5" : "none",
                           boxShadow: light
                             ? "0 8px 28px rgba(0,58,140,.14), inset 0 1px 0 rgba(255,255,255,.9)"
                             : "0 8px 32px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.9), inset 0 -1px 0 rgba(0,0,0,.05)" }}
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:.5, delay:.45 + i*.1, ease:[.23,1,.32,1] }}>
                  <p className="text-2xl sm:text-3xl font-black" style={{ color:s.c, textShadow:`0 2px 8px ${s.c}55` }}>{s.v}</p>
                  <p className="text-xs font-bold mt-1" style={{ color:"#374151" }}>{s.l}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:.6, delay:.6, ease:[.23,1,.32,1] }}>
              <a href={`https://wa.me/${whatsapp}?text=Hola%20FDR,%20quiero%20cotizar%20repuestos`}
                 target="_blank" rel="noopener noreferrer"
                 className="btn-green text-sm sm:text-base pulse-green">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Cotizar ahora — Gratis
              </a>
              {country === "CO" && (
                <a href="https://www.tiendafdr.com" target="_blank" rel="noopener noreferrer"
                   className="btn-outline text-sm sm:text-base">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Comprar online
                </a>
              )}
            </motion.div>

          </div>

          {/* ── RIGHT — rotating product showcase (desktop only) ── */}
          <motion.div className="hidden lg:flex flex-col items-center gap-4"
            initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:.8, delay:.2, ease:[.23,1,.32,1] }}>

            {/* Main stage — imagen grande sin nada encima */}
            <div className="relative w-full max-w-2xl" style={{ height: 620 }}>
              {/* Rotating rings behind */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] rounded-full border animate-spin-slow"
                     style={{ borderColor:`${cur.color}18`, borderStyle:"dashed" }} />
                <div className="absolute w-80 h-80 rounded-full border animate-spin-rev"
                     style={{ borderColor:`${cur.color}12` }} />
                <div className="absolute w-64 h-64 rounded-full opacity-15 transition-colors duration-700"
                     style={{ background:`radial-gradient(circle,${cur.color}66 0%,transparent 70%)` }} />
              </div>

              {/* ── PRODUCTO ── */}
              <div className={`absolute inset-0 flex items-center justify-center
                              transition-all duration-400
                              ${animating ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
                   style={{ transition:"opacity .35s, transform .35s" }}>
                <div className="relative w-full h-full">
                  <Image src={cur.img} alt={cur.name} fill sizes="(max-width:1024px) 0px, 640px" className="object-contain animate-float"
                         style={{ filter:`drop-shadow(0 0 60px ${cur.color}88)` }} />
                </div>
              </div>

            </div>

            {/* Etiqueta del producto — DEBAJO de la imagen, fuera del contenedor */}
            <div className={`text-center px-8 py-4 rounded-2xl w-full max-w-sm transition-all duration-400
                            ${animating?"opacity-0":"opacity-100"}`}
                 style={{ background:"rgba(255,255,255,.97)", border:`2px solid ${cur.color}`,
                          boxShadow:`0 0 25px ${cur.color}22` }}>
              <p className="font-black text-xl tracking-tight" style={{ color:"#001020" }}>{cur.name}</p>
              <p className="text-sm mt-1 font-semibold" style={{ color:cur.color }}>{cur.desc}</p>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-1 mt-1">
              {products.map((p,i) => (
                <button key={i} disabled={animating}
                        aria-label={`Ver ${p.name}`}
                        onClick={() => { if (animating) return; setAnimating(true); setTimeout(()=>{setActive(i);setAnimating(false)},400); }}
                        className="flex items-center justify-center min-h-[44px] min-w-[34px] disabled:cursor-not-allowed">
                  <span className="block transition-all duration-300 rounded-full"
                        style={{ width:i===active?28:9, height:9,
                                 background:i===active?cur.color:T.dotInactive }} />
                </button>
              ))}
            </div>

            {/* Mini thumbnails */}
            <div className="flex gap-3">
              {products.map((p,i) => (
                <button key={i} disabled={animating}
                        onClick={() => { if (animating) return; setAnimating(true); setTimeout(()=>{setActive(i);setAnimating(false)},400); }}
                        className="relative w-16 h-16 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{ background:i===active?`${p.color}22`:"rgba(0,20,50,.5)",
                                 border:`1px solid ${i===active?p.color+"66":"rgba(255,255,255,.08)"}`,
                                 transform:i===active?"scale(1.15)":"scale(1)" }}>
                  <Image src={p.img} alt={p.name} fill sizes="64px" className="object-contain p-1.5" />
                </button>
              ))}
            </div>

            {/* CTA — tienda (solo Colombia) o WhatsApp (Ecuador) */}
            {country === "CO" ? (
              <a href="https://www.tiendafdr.com" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:scale-105"
                 style={{ background:"rgba(37,211,102,.15)", border:"1px solid rgba(37,211,102,.4)", color:"#25D366" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Ver todos los productos en tiendafdr.com →
              </a>
            ) : (
              <a href={`https://wa.me/${whatsapp}?text=Hola%20FDR,%20quiero%20ver%20el%20cat%C3%A1logo%20completo`}
                 target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:scale-105"
                 style={{ background:"rgba(37,211,102,.15)", border:"1px solid rgba(37,211,102,.4)", color:"#25D366" }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                Ver catálogo por WhatsApp →
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
           style={{ background:"linear-gradient(transparent,#001f5c)" }} />
    </section>
  );
}
