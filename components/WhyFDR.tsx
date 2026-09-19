const reasons = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Fabricación Propia",
    description: "Producimos nuestras partes en nuestra planta del Parque Industrial San Gregorio, Colombia. Control de calidad desde el origen.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Entrega Rápida",
    description: "Despachos en 24 horas a nivel nacional. Trabajamos con las principales empresas de mensajería del Ecuador.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Precios de Fábrica",
    description: "Sin intermediarios. Al fabricar directamente, te ofrecemos precios de fábrica competitivos para Ecuador y Colombia.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "+390 Referencias",
    description: "Terminales, brazos de dirección, cañas y partes de trailer para más de 25 marcas de vehículos. Todo disponible en bodega.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Asesoría Técnica",
    description: "Nuestro equipo técnico te orienta para encontrar la pieza correcta. Sin error, sin devoluciones innecesarias.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: "Facturación Legal",
    description: "Emitimos facturas con validez tributaria. Trabajamos en regla con el SRI para que tu negocio esté tranquilo.",
  },
];

const stats = [
  { value: "390+", label: "Referencias en catálogo" },
  { value: "25+", label: "Marcas atendidas" },
  { value: "2", label: "Países: ECU & COL" },
  { value: "24h", label: "Tiempo de entrega" },
];

export default function WhyFDR() {
  return (
    <section id="nosotros" className="py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-divider" />
          <span className="text-[#E30613] text-sm font-bold tracking-widest uppercase mb-3 block">
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#003A8C] mb-4">
            La diferencia <span className="text-[#E30613]">FDR</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Fabricamos nuestras propias partes de dirección y suspensión en nuestra planta
            en Colombia, garantizando calidad desde el origen hasta tu taller.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="card-hover bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#003A8C]/10 flex items-center justify-center text-[#003A8C] mb-5">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="fdr-gradient rounded-3xl p-10 hex-pattern">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <p className="text-4xl sm:text-5xl font-black text-white mb-2">{stat.value}</p>
                <p className="text-white/70 font-semibold text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
