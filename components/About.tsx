"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCountry } from "@/lib/CountryContext";

const milestones = [
  { year: "Hace 23 años", title: "El origen", text: "Frente a las exigentes rutas de Colombia, nació la visión: el transporte pesado no puede permitirse el lujo de detenerse." },
  { year: "Fabricación propia", title: "Alta ingeniería", text: "Analizamos la fatiga del acero en el terreno y perfeccionamos cada pieza con forja y mecanizado de precisión." },
  { year: "Innovación", title: "Terminales intercambiables", text: "Un sistema que permite reemplazar solo el componente afectado, reduciendo costos y horas muertas en taller." },
  { year: "Hoy", title: "Expansión internacional", text: "23 años de solidez en Colombia inician un nuevo capítulo: llevamos nuestra tecnología a Ecuador y la región." },
];

export default function About() {
  const { whatsapp, country } = useCountry();
  return (
    <section id="nosotros" className="py-16 lg:py-28 relative overflow-hidden"
             style={{ background: "linear-gradient(180deg, #002060 0%, #001f5c 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(0,58,140,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,58,140,.06) 1px,transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background:"radial-gradient(circle,rgba(255,255,255,.06) 0%,transparent 70%)", transform:"translate(-30%,0)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-20">
          <div className="section-divider-3d" />
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3" style={{ color:"#E30613" }}>
            Nuestra Historia
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Más de dos décadas de{" "}
            <span style={{ background:"linear-gradient(135deg,#ff4444,#E30613,#ff6644)", backgroundSize:"200% auto",
                           WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                           animation:"shimmer 3s linear infinite" }}>
              ingeniería en movimiento
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
            Fabricantes expertos e importadores directos. Control absoluto sobre cada pieza que sale de
            nuestra planta hacia las flotas más exigentes de la región.
          </p>
        </div>

        {/* Story block */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-24">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]"
                 style={{ border:"1px solid rgba(0,80,200,.3)", boxShadow:"0 30px 60px rgba(0,0,0,.5)" }}>
              <Image src="/opt/operario-cnc.webp" alt="Planta de fabricación FDR" fill className="object-cover" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,13,26,.6), transparent 60%)" }} />
              <div className="absolute bottom-6 left-6 px-6 py-4 rounded-2xl"
                   style={{ background:"rgba(0,40,120,.9)", border:"1px solid rgba(0,100,200,.4)", backdropFilter:"blur(8px)" }}>
                <p className="text-4xl font-black text-white">23+</p>
                <p className="text-sm text-white/70 font-medium">años de experiencia</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl hidden lg:block"
                 style={{ background:"linear-gradient(135deg,#E30613,#B80010)", boxShadow:"0 10px 30px rgba(227,6,19,.4)" }}>
              <p className="text-2xl font-black text-white">500+</p>
              <p className="text-xs text-white/90 font-medium">referencias en catálogo</p>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            {/* Título con acento rojo */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background:"#E30613" }} />
              <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight">
                Calidad que resiste las rutas más exigentes de América
              </h3>
            </div>

            <p className="text-white/75 leading-relaxed">
              Hace más de 23 años, frente a las implacables rutas de Colombia, nació una visión inquebrantable.
              Desde el primer día nos consolidamos como{" "}
              <span className="font-black" style={{ color:"#E30613" }}>fabricantes de calidad superior</span>
              {" "}— cada pieza pasa por control riguroso antes de llegar a tu flota.
            </p>

            {/* 3 pilares de calidad */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon:"⚙️", label:"Forja propia", desc:"Acero de alta resistencia" },
                { icon:"🔬", label:"Control CNC", desc:"Tolerancias milimétricas" },
                { icon:"✅", label:"Garantía real", desc:"Respaldo directo de fábrica" },
              ].map(p => (
                <div key={p.label} className="rounded-xl p-3 text-center"
                     style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.12)" }}>
                  <span className="text-2xl">{p.icon}</span>
                  <p className="text-white font-black text-xs mt-1">{p.label}</p>
                  <p className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,.45)" }}>{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Differentiator — con borde rojo y fondo más visible */}
            <div className="rounded-2xl p-5"
                 style={{ background:"linear-gradient(135deg,rgba(227,6,19,.12),rgba(0,40,120,.4))",
                          border:"1.5px solid rgba(227,6,19,.35)" }}>
              <h4 className="font-black text-white mb-2 flex items-center gap-2 text-sm">
                <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                      style={{ background:"#E30613" }}>★</span>
                Innovación: Terminales Intercambiables
              </h4>
              <p className="text-sm leading-relaxed" style={{ color:"rgba(255,255,255,.65)" }}>
                Reemplaza solo el componente desgastado, no la barra completa.{" "}
                <strong className="text-white">Ajuste milimétrico garantizado</strong>, menos costos
                y cero horas muertas en taller.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href={`https://wa.me/${whatsapp}?text=Hola%20FDR,%20quiero%20más%20información`}
                 target="_blank" rel="noopener noreferrer" className="btn-green">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hablar con un asesor
              </a>
              {country === "CO" && (
                <a href="https://www.tiendafdr.com" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Ver catálogo completo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial="hidden" whileInView="visible"
          viewport={{ once:true, amount:0.15 }}
          variants={{ hidden:{}, visible:{ transition:{ staggerChildren:.1 } } }}>
          {milestones.map((m, i) => (
            <motion.div key={m.title} className="relative"
              variants={{ hidden:{ opacity:0, y:30 }, visible:{ opacity:1, y:0, transition:{ ease:[.23,1,.32,1], duration:.55 } } }}>
              {i < milestones.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full h-0.5 z-0"
                     style={{ background:"linear-gradient(90deg,#003A8C,#E30613)", width:"calc(100% - 2rem)" }} />
              )}
              <motion.div className="rounded-2xl p-6 relative z-10 h-full"
                   whileHover={{ y:-8, rotateY: i%2===0 ? 4 : -4, rotateX:2, scale:1.03, transition:{ duration:.25, ease:[.23,1,.32,1] } }}
                   style={i % 2 === 0
                     ? { background:"rgba(255,255,255,.97)", border:"1.5px solid #d1daf5",
                         boxShadow:"0 8px 32px rgba(0,58,140,.15), inset 0 1px 0 rgba(255,255,255,.9)",
                         transformStyle:"preserve-3d" }
                     : { background:"rgba(0,40,120,.5)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
                         border:"1px solid rgba(255,255,255,.18)",
                         boxShadow:"0 8px 32px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.1)",
                         transformStyle:"preserve-3d" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg mb-4 text-white"
                     style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)",
                              boxShadow:"0 4px 16px rgba(0,58,140,.5), 0 2px 4px rgba(0,0,0,.3)" }}>
                  {i + 1}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color:"#E30613" }}>{m.year}</span>
                <h4 className="font-black mt-1 mb-2" style={{ color: i % 2 === 0 ? "#001020" : "#ffffff" }}>{m.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: i % 2 === 0 ? "#4b5563" : "rgba(255,255,255,.55)" }}>{m.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats banner */}
        <div className="rounded-3xl overflow-hidden"
             style={{ border:"1.5px solid rgba(255,255,255,.18)",
                      background:"rgba(0,20,70,.4)",
                      backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
                      boxShadow:"0 20px 60px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.12)" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value:"23+",  label:"Años de experiencia", c:"#25D366", bg:"rgba(37,211,102,.1)" },
              { value:"500+", label:"Referencias",          c:"#E30613", bg:"rgba(227,6,19,.1)" },
              { value:"25+",  label:"Marcas pesadas",       c:"#4da6ff", bg:"rgba(77,166,255,.1)" },
              { value:"2",    label:"Países: COL & ECU",    c:"#ffc800", bg:"rgba(255,200,0,.1)" },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-8 px-4 text-center"
                   style={{ background:s.bg,
                            borderRight: i < 3 ? "1px solid rgba(255,255,255,.08)" : "none",
                            borderBottom: i < 2 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
                <p className="text-4xl sm:text-5xl font-black mb-1" style={{ color:s.c }}>{s.value}</p>
                <p className="font-semibold text-sm" style={{ color:"rgba(255,255,255,.55)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
