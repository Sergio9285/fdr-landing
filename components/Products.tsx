"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCountry } from "@/lib/CountryContext";

const HEAVY_EC = ["Chevrolet NPR","Hino 500","Kenworth T800","Freightliner","Mercedes-Benz","International","Mack","Volvo","Scania"];
const HEAVY_CO = ["Kenworth T800","Freightliner","Mack","Volvo FH","Scania R","Mercedes Actros","International","Hino 500","JAC"];

export default function Products() {
  const { country, whatsapp } = useCountry();
  const WA = `https://wa.me/${whatsapp}?text=Hola%20FDR,%20necesito%20información%20sobre%20`;
  const brands = country === "CO" ? HEAVY_CO : HEAVY_EC;

  const cats = [
    {
      img:   "/opt/terminal-nobg.webp",
      bg:    "/opt/terminal-caja-fdr.webp",
      title: "Terminales de Dirección",
      count: "350+",
      desc:  "Terminales derecho e izquierdo de acero forjado. La línea más completa del mercado para vehículo pesado, fabricación 100% propia.",
      brands,
      tag:   "Más vendido",
      color: "#0064ff",
    },
    {
      img:   "/opt/brazo-nobg.webp",
      bg:    "/opt/king-pin-cajas-fdr.webp",
      title: "Brazos de Dirección",
      count: "130+",
      desc:  "Brazos y barras de dirección con y sin terminales para tractocamiones, buses y carga pesada. Forja y mecanizado de precisión.",
      brands,
      tag:   "⭐ Producto estrella",
      color: "#E30613",
    },
    {
      img:   "/opt/splinder-kit-nobg.webp",
      bg:    "/opt/producto-contexto-1.webp",
      title: country === "CO" ? "Splinder / King Pin de Rueda" : "Pines y Bocines",
      count: "Kit completo",
      desc:  country === "CO"
        ? "Splinder y King Pin de rueda con kit completo: bocines, rodamientos a aguja, pasadores, arandelas y tapas. Heavy Duty."
        : "Pines y bocines de rueda con kit completo: bocines, rodamientos a aguja, pasadores, arandelas y tapas. Línea pesada.",
      brands,
      tag:   country === "CO" ? "🇨🇴 Splinder" : "🇪🇨 Pines y Bocines",
      color: "#25D366",
    },
    {
      img:   "/opt/pernos-rin-nobg.webp",
      bg:    "/opt/galeria-4.webp",
      title: "Pernos de Rin",
      count: "Heavy Duty",
      desc:  "Pernos de rin con tratamiento térmico especializado. Máxima resistencia y durabilidad para las cargas más exigentes.",
      brands,
      tag:   "🔥 Tratamiento térmico",
      color: "#0064ff",
    },
  ];

  return (
    <section id="productos" className="py-16 lg:py-28 relative"
             style={{ background: "linear-gradient(180deg, #001f5c 0%, #002060 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(0,58,140,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,58,140,.07) 1px,transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 lg:mb-20">
          <div className="section-divider" />
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#E30613" }}>
            Catálogo · Línea Pesada
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Más de 700{" "}
            <span style={{ background:"linear-gradient(135deg,#ff4444,#E30613,#ff6644)", backgroundSize:"200% auto",
                           WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                           backgroundClip:"text", animation:"shimmer 3s linear infinite" }}>
              referencias en stock
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-2">
            Exclusivo para <strong className="text-white/80">línea pesada</strong> — Chevrolet NPR, Hino 500, Kenworth T800,
            Freightliner, Mercedes-Benz, Volvo, Scania y más.
          </p>
          {country === "CO" ? (
            <a href="https://www.tiendafdr.com" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
               style={{ background:"rgba(0,58,140,.25)", border:"1px solid rgba(0,100,200,.5)", color:"rgba(150,200,255,.95)" }}>
              Ver catálogo completo en tiendafdr.com →
            </a>
          ) : (
            <a href={`https://wa.me/${whatsapp}?text=Hola%20FDR,%20quiero%20ver%20el%20cat%C3%A1logo%20completo`}
               target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
               style={{ background:"rgba(37,211,102,.18)", border:"1px solid rgba(37,211,102,.5)", color:"rgba(150,255,190,.95)" }}>
              Ver catálogo completo por WhatsApp →
            </a>
          )}
        </div>

        {/* Grid */}
        <motion.div className="grid lg:grid-cols-2 gap-6 mb-16"
          initial="hidden" whileInView="visible"
          viewport={{ once:true, amount:0.1 }}
          variants={{ hidden:{}, visible:{ transition:{ staggerChildren:.12 } } }}>
          {cats.map((c, idx) => {
            const isNumeric = /^\d/.test(c.count);
            return (
            <motion.div key={`cat-${idx}-${c.color}`}
              variants={{ hidden:{ opacity:0, y:40 }, visible:{ opacity:1, y:0, transition:{ ease:[.23,1,.32,1], duration:.6 } } }}
                 className="relative rounded-2xl overflow-hidden group cursor-pointer"
                 style={{ background:"rgba(0,25,80,.65)",
                          backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
                          border:"1px solid rgba(255,255,255,.18)",
                          boxShadow:"0 8px 32px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.12)" }}
                 whileHover={{
                   y: -10,
                   rotateY: idx % 2 === 0 ? -4 : 4,
                   rotateX: 2,
                   scale: 1.02,
                   boxShadow: `0 30px 70px rgba(0,0,0,.4), 0 0 0 1px ${c.color}55, 0 0 40px ${c.color}22`,
                   transition:{ duration:.3, ease:[.23,1,.32,1] }
                 }}>

              {/* BG dimmed */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                <Image src={c.bg} alt="" fill className="object-cover" />
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
                   style={{ background:`radial-gradient(circle, ${c.color} 0%, transparent 70%)`, transform:"translate(30%,-30%)" }} />

              <div className="relative z-10 flex flex-col">
                {/* Imagen centrada arriba */}
                <div className="flex items-center justify-center h-52 p-6"
                     style={{ background:"linear-gradient(135deg,rgba(0,20,60,.5),rgba(0,10,30,.3))",
                              borderBottom:"1px solid rgba(255,255,255,.08)" }}>
                  <div className="relative w-44 h-44 group-hover:scale-110 transition-transform duration-500">
                    <Image src={c.img} alt={c.title} fill sizes="176px" className="object-contain"
                           style={{ filter:`drop-shadow(0 0 35px ${c.color}99)` }} />
                  </div>
                </div>

                {/* Contenido abajo */}
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {c.tag && (
                        <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2"
                              style={{ background:`${c.color}22`, color:c.color, border:`1px solid ${c.color}44` }}>
                          {c.tag}
                        </span>
                      )}
                      <h3 className="text-xl font-black text-white leading-tight">{c.title}</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {isNumeric ? (
                        <>
                          <p className="text-4xl font-black leading-none" style={{ color:c.color }}>{c.count}</p>
                          <p className="text-xs text-white/40 mt-1">referencias</p>
                        </>
                      ) : (
                        <span className="inline-block text-sm font-black px-3 py-1.5 rounded-xl"
                              style={{ background:`${c.color}22`, color:c.color, border:`1px solid ${c.color}44` }}>
                          {c.count}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed">{c.desc}</p>

                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-2 font-semibold">Línea pesada compatible</p>
                    <div className="flex flex-wrap gap-1">
                      {c.brands.slice(0, 5).map(b => (
                        <span key={b} className="text-xs px-2 py-0.5 rounded-lg font-medium"
                              style={{ background:"rgba(255,255,255,.06)", color:"rgba(255,255,255,.6)",
                                       border:"1px solid rgba(255,255,255,.1)" }}>
                          {b}
                        </span>
                      ))}
                      {c.brands.length > 5 && (
                        <span className="text-xs px-2 py-0.5 rounded-lg" style={{ color:"rgba(255,255,255,.3)" }}>
                          +{c.brands.length - 5} más
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <a href={`${WA}${encodeURIComponent(c.title)}`} target="_blank" rel="noopener noreferrer"
                       className="flex-1 flex items-center justify-center gap-2 text-sm font-bold px-3 py-2.5 rounded-xl transition-all hover:scale-105"
                       style={{ background:"linear-gradient(135deg,#25D366,#1ea752)", color:"#fff" }}>
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                      </svg>
                      WhatsApp
                    </a>
                    {country === "CO" && (
                      <a href="https://www.tiendafdr.com" target="_blank" rel="noopener noreferrer"
                         className="flex items-center text-sm font-bold px-4 py-2.5 rounded-xl transition-all hover:scale-105 whitespace-nowrap"
                         style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.2)", color:"rgba(255,255,255,.9)" }}>
                        Ver tienda
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="rounded-2xl p-10 text-center"
             style={{ background:"linear-gradient(135deg,rgba(0,40,120,.8),rgba(0,25,80,.9))",
                      border:"1px solid rgba(255,255,255,.2)" }}>
          <p className="text-2xl font-black text-white mb-2">
            ¿Buscas una referencia específica para tu vehículo?
          </p>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Dinos la marca, modelo y año — conseguimos exactamente lo que necesitas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${whatsapp}?text=Hola%20FDR,%20busco%20repuestos%20para%20mi%20vehículo%20pesado`}
               target="_blank" rel="noopener noreferrer" className="btn-green text-base">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar por WhatsApp
            </a>
            {country === "CO" && (
              <a href="https://www.tiendafdr.com" target="_blank" rel="noopener noreferrer" className="btn-outline text-base">
                Ver tiendafdr.com
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
