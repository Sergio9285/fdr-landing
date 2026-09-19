"use client";
import { useState } from "react";
import { useCountry } from "@/lib/CountryContext";

export default function Contact() {
  const { country, whatsapp, phone, flag, label } = useCountry();
  const [form, setForm] = useState({ name:"", phone:"", email:"", city:"", vehicle:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const ch = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const msg = `Hola FDR, consulta desde la web (${label}):\n\n👤 ${form.name}\n📱 ${form.phone}\n📧 ${form.email}\n📍 ${form.city}\n🚛 ${form.vehicle}\n💬 ${form.message}`;
    setTimeout(() => {
      setLoading(false); setSent(true);
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    }, 700);
  };

  const cities = country === "CO"
    ? ["Bogotá","Madrid","Medellín","Cali","Barranquilla","Bucaramanga","Cúcuta","Otra"]
    : ["Quito","Guayaquil","Cuenca","Ambato","Santo Domingo","Manta","Machala","Otra"];

  const channels = [
    { label:"WhatsApp", value:phone, href:`https://wa.me/${whatsapp}`, c:"#25D366",
      icon:<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487 2.981 1.287 2.981.858 3.518.804.537-.054 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>, fill:true },
    { label:"Teléfono", value:phone, href:`tel:${phone.replace(/\s/g,"")}`, c:"#0064ff",
      icon:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /> },
    { label:"Email", value:"ventas@tiendafdr.com", href:"mailto:ventas@tiendafdr.com", c:"#E30613",
      icon:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
    // Tienda online solo en Colombia (en Ecuador todo va por WhatsApp)
    ...(country === "CO" ? [{ label:"Tienda online", value:"tiendafdr.com", href:"https://www.tiendafdr.com", c:"#ffc800",
      icon:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /> }] : []),
  ];

  const inputCls = "w-full px-4 py-3 rounded-xl outline-none text-sm transition-all";
  const inputStyle = { background:"#ffffff", border:"1.5px solid #d1daf5", color:"#001020" };

  return (
    <section id="contacto" className="py-16 lg:py-24 relative" style={{ background:"#ffffff" }}>
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1"
           style={{ background:"linear-gradient(90deg,#003A8C,#E30613,#003A8C)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:"linear-gradient(rgba(0,58,140,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,58,140,.03) 1px,transparent 1px)",
        backgroundSize:"50px 50px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-divider" />
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3" style={{ color:"#E30613" }}>Contacto</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color:"#001020" }}>
            Contáctanos y <span style={{ color:"#25D366" }}>cotiza gratis</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color:"#6b7280" }}>
            Estás atendiendo desde <strong style={{ color:"#001020" }}>{flag} {label}</strong>. Te respondemos en menos de 1 hora hábil.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — channels */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl p-6" style={{ background:"#f0f4ff", border:"1.5px solid #d1daf5" }}>
              <h3 className="text-lg font-black mb-5" style={{ color:"#001020" }}>Canales de contacto</h3>
              <div className="space-y-3">
                {channels.map(c => (
                  <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-4 p-3.5 rounded-xl transition-all group hover:shadow-md"
                     style={{ background:"#ffffff", border:"1px solid #e0e8ff" }}
                     onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = c.c}
                     onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e0e8ff"}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                         style={{ background:`${c.c}18`, border:`1.5px solid ${c.c}44` }}>
                      <svg className="w-5 h-5" style={{ color:c.c }} fill={c.fill?"currentColor":"none"} stroke={c.fill?"none":"currentColor"} viewBox="0 0 24 24">{c.icon}</svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color:"#9ca3af" }}>{c.label}</p>
                      <p className="font-bold text-sm" style={{ color:"#001020" }}>{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Horarios */}
            <div className="rounded-2xl p-6" style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)", border:"none" }}>
              <h3 className="text-lg font-black text-white mb-4">Horario de atención</h3>
              <div className="space-y-2.5 text-sm">
                {[{d:"Lunes – Viernes",h:"8:00 – 18:00"},{d:"Sábados",h:"8:00 – 14:00"},{d:"Domingos",h:"Cerrado"}].map(x => (
                  <div key={x.d} className="flex justify-between items-center pb-2" style={{ borderBottom:"1px solid rgba(255,255,255,.15)" }}>
                    <span style={{ color:"rgba(255,255,255,.7)" }}>{x.d}</span>
                    <span className="font-bold" style={{ color:x.h==="Cerrado"?"#fca5a5":"#86efac" }}>{x.h}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4" style={{ color:"rgba(255,255,255,.4)" }}>* WhatsApp disponible fuera de horario para urgencias</p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="h-full flex items-center justify-center rounded-2xl py-20"
                   style={{ background:"#f0fff4", border:"1.5px solid #86efac" }}>
                <div className="text-center px-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                       style={{ background:"rgba(37,211,102,.12)", border:"2px solid #25D366" }}>
                    <svg className="w-10 h-10" style={{ color:"#25D366" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black mb-2" style={{ color:"#001020" }}>¡Mensaje enviado!</h3>
                  <p className="mb-6" style={{ color:"#6b7280" }}>Te contactamos en menos de 1 hora hábil.</p>
                  <button onClick={() => { setSent(false); setForm({name:"",phone:"",email:"",city:"",vehicle:"",message:""}); }}
                          className="text-sm font-bold" style={{ color:"#25D366" }}>Enviar otra consulta</button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-2xl p-6 lg:p-8 space-y-4"
                    style={{ background:"#f8faff", border:"1.5px solid #d1daf5" }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color:"#374151" }}>Nombre completo *</label>
                    <input name="name" value={form.name} onChange={ch} required placeholder="Tu nombre" className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color:"#374151" }}>WhatsApp *</label>
                    <input name="phone" value={form.phone} onChange={ch} required placeholder={phone} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color:"#374151" }}>Correo</label>
                    <input type="email" name="email" value={form.email} onChange={ch} placeholder="tu@email.com" className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color:"#374151" }}>Ciudad</label>
                    <select name="city" value={form.city} onChange={ch} className={inputCls} style={{ ...inputStyle, cursor:"pointer" }}>
                      <option value="">Selecciona</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:"#374151" }}>Vehículo (marca, modelo, año)</label>
                  <input name="vehicle" value={form.vehicle} onChange={ch} placeholder="Ej: Chevrolet NPR 2018" className={inputCls} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:"#374151" }}>¿Qué necesitas? *</label>
                  <textarea name="message" value={form.message} onChange={ch} required rows={4} placeholder="Describe los repuestos, códigos o cantidad..." className={inputCls + " resize-none"} style={inputStyle} />
                </div>
                <button type="submit" disabled={loading} className="btn-green w-full justify-center py-4 text-base disabled:opacity-60">
                  {loading ? (
                    <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Enviando...</>
                  ) : (
                    <><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487 2.981 1.287 2.981.858 3.518.804.537-.054 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>Enviar por WhatsApp</>
                  )}
                </button>
                <p className="text-xs text-center" style={{ color:"#9ca3af" }}>Serás redirigido a WhatsApp con tu consulta pre-cargada.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
