"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCountry } from "@/lib/CountryContext";

const brandLogos = [
  { file: "/opt/marcas/9.webp", name: "Chevrolet" },
  { file: "/opt/marcas/4.webp", name: "Hino" },
  { file: "/opt/marcas/5.webp", name: "Kenworth" },
  { file: "/opt/marcas/3.webp", name: "Mack" },
  { file: "/opt/marcas/8.webp", name: "International" },
  { file: "/opt/marcas/7.webp", name: "Foton" },
  { file: "/opt/marcas/marcas-5.webp", name: "Hyundai" },
  { file: "/opt/marcas/marcas-8.webp", name: "Ford" },
  { file: "/opt/marcas/marcas-4.webp", name: "Kia" },
  { file: "/opt/marcas/marcas-7.webp", name: "Isuzu" },
  { file: "/opt/marcas/6.webp", name: "JAC" },
  { file: "/opt/marcas/marcas-9.webp", name: "Scania" },
  { file: "/opt/marcas/marcas-2.webp", name: "Dodge" },
  { file: "/opt/marcas/marcas-3.webp", name: "Agrale" },
  { file: "/opt/marcas/marcas-6.webp", name: "Sinotruk" },
];

export default function Brands() {
  const { whatsapp } = useCountry();
  return (
    <section className="py-14 relative" style={{ background:"#ffffff" }}>
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1"
           style={{ background:"linear-gradient(90deg,#003A8C,#E30613,#003A8C)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color:"#E30613" }}>
            Compatibilidad
          </p>
          <p className="text-lg font-black" style={{ color:"#001020" }}>
            Fabricamos para la línea pesada de estas marcas
          </p>
        </div>

        {/* Logo grid — sin recuadros, logos flotando */}
        <motion.div
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once:true, amount:0.2 }}
          variants={{ hidden:{}, visible:{ transition:{ staggerChildren:.06 } } }}>
          {brandLogos.map((brand) => (
            <motion.div
              key={brand.name}
              className="flex items-center justify-center group"
              title={brand.name}
              variants={{ hidden:{ opacity:0, scale:.7 }, visible:{ opacity:1, scale:1, transition:{ ease:[.23,1,.32,1], duration:.4 } } }}
              whileHover={{ scale:1.15, transition:{ duration:.15 } }}>
              <div className="relative w-full h-14">
                <Image
                  src={brand.file}
                  alt={brand.name}
                  fill
                  sizes="(max-width:640px) 80px, 110px"
                  className="object-contain transition-all duration-300 group-hover:brightness-110"
                />
              </div>
            </motion.div>
          ))}
          {/* Extra brands */}
          <motion.div className="flex items-center justify-center"
            variants={{ hidden:{ opacity:0 }, visible:{ opacity:1, transition:{ duration:.4 } } }}>
            <span className="text-sm font-black" style={{ color:"#003A8C" }}>+10 más</span>
          </motion.div>
        </motion.div>

        <div className="text-center mt-8">
          <p className="text-sm" style={{ color:"#6b7280" }}>¿No encuentras tu marca?</p>
          <a
            href={`https://wa.me/${whatsapp}?text=Hola%20FDR,%20busco%20repuestos%20para%20mi%20vehículo`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center mt-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
            style={{ color:"#E30613", background:"rgba(227,6,19,.06)", border:"1.5px solid rgba(227,6,19,.25)" }}
          >
            Consúltanos →
          </a>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1"
           style={{ background:"linear-gradient(90deg,#003A8C,#E30613,#003A8C)" }} />
    </section>
  );
}
