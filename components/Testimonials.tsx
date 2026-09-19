"use client";
import { useCountry } from "@/lib/CountryContext";

const testimonials = [
  {
    name: "Carlos Andrade",
    role: "Dueño de Taller Mecánico — Quito",
    text: "Llevo 3 años comprando a FDR y jamás me han fallado. Los precios son los mejores del mercado y siempre tienen stock de lo que necesito. El servicio es excelente.",
    stars: 5,
    initials: "CA",
    color: "bg-[#003A8C]",
  },
  {
    name: "María Soledad Vega",
    role: "Distribuidora de Autopartes — Guayaquil",
    text: "Lo que más valoro es la rapidez. Pido en la mañana y al día siguiente ya tengo los productos en Guayaquil. Calidad garantizada y muy buen precio mayorista.",
    stars: 5,
    initials: "MV",
    color: "bg-[#E30613]",
  },
  {
    name: "Roberto Espinoza",
    role: "Mecánico Independiente — Cuenca",
    text: "FDR me salvó cuando buscaba piezas para un Toyota Land Cruiser antiguo. Las consiguieron en 2 días. Recomendados 100%, muy profesionales y honestos.",
    stars: 5,
    initials: "RE",
    color: "bg-slate-700",
  },
  {
    name: "Luis Chiriboga",
    role: "Dueño de Taller — Ambato",
    text: "Probé otras distribuidoras antes pero siempre había problemas de calidad. Con FDR nunca he tenido devoluciones. Los productos duran y los clientes quedan satisfechos.",
    stars: 5,
    initials: "LC",
    color: "bg-[#003A8C]",
  },
  {
    name: "Ana Torres",
    role: "Gerente de Flota — Empresa Logística",
    text: "Manejamos una flota de 40 vehículos y FDR es nuestro proveedor exclusivo de suspensión. Precios corporativos, facturación impecable y entrega puntual.",
    stars: 5,
    initials: "AT",
    color: "bg-[#E30613]",
  },
  {
    name: "Patricio Mena",
    role: "Mecánico — Santo Domingo",
    text: "El asesoramiento técnico es increíble. Cuando tengo dudas sobre qué pieza necesito, me ayudan a identificarla sin costo. Eso marca la diferencia.",
    stars: 5,
    initials: "PM",
    color: "bg-slate-600",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { whatsapp } = useCountry();
  return (
    <section id="testimonios" className="py-24 bg-[#F5F7FA] relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#003A8C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E30613]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-divider" />
          <span className="text-[#E30613] text-sm font-bold tracking-widest uppercase mb-3 block">
            Testimonios
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#003A8C] mb-4">
            Lo que dicen nuestros <span className="text-[#E30613]">clientes</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Más de 500 talleres y distribuidores en todo Ecuador confían en FDR.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card">
              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Text */}
              <p className="text-gray-700 leading-relaxed mt-4 mb-6 text-sm italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className={`w-10 h-10 rounded-full ${t.color} text-white text-sm font-black flex items-center justify-center flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="text-center bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-2xl font-black text-[#003A8C]">¿Listo para unirte a nuestros clientes?</h3>
              <p className="text-gray-600 mt-1">Contacta ahora y recibe tu primera cotización sin costo.</p>
            </div>
            <a
              href={`https://wa.me/${whatsapp}?text=Hola%20FDR,%20me%20interesa%20conocer%20sus%20productos`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex-shrink-0 px-8 text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
