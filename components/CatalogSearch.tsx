"use client";
import { useState, useMemo, useEffect } from "react";
import { useCountry } from "@/lib/CountryContext";
import catalogo from "@/lib/catalogo.json";
import { fetchInventory, type InvItem } from "@/lib/inventory";

// Respaldo local (sin precios) por si el inventario en vivo no responde.
const FALLBACK: InvItem[] = (catalogo.items as { code:string; desc:string; cat:string; brand:string }[])
  .map(it => ({ code: it.code, desc: it.desc, cat: it.cat, brand: it.brand, img: null, oem: null, aplicaciones: null }));

const PAGE = 18;

export default function CatalogSearch() {
  const { whatsapp, country } = useCountry();
  const [items, setItems] = useState<InvItem[] | null>(null); // null = cargando
  const [q, setQ]       = useState("");
  const [cat, setCat]   = useState<string>("Todas");
  const [brand, setBrand] = useState<string>("Todas");
  const [limit, setLimit] = useState(PAGE);

  // Inventario en vivo de la app — se refresca en cada carga (siempre coincide con el inventario).
  useEffect(() => {
    let alive = true;
    fetchInventory().then(inv => { if (alive) setItems(inv.length ? inv : FALLBACK); });
    return () => { alive = false; };
  }, []);

  const loading = items === null;
  const ITEMS   = items ?? [];
  const CATS    = useMemo(() => Array.from(new Set(ITEMS.map(i => i.cat).filter(Boolean))).sort(), [items]);
  const BRANDS  = useMemo(() => Array.from(new Set(ITEMS.map(i => i.brand).filter(Boolean))).sort(), [items]);

  const results = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return ITEMS.filter(it => {
      if (cat !== "Todas" && it.cat !== cat) return false;
      if (brand !== "Todas" && it.brand !== brand) return false;
      if (qq && !(`${it.code} ${it.desc} ${it.brand}`.toLowerCase().includes(qq))) return false;
      return true;
    });
  }, [q, cat, brand, items]);

  const shown = results.slice(0, limit);

  const reset = () => { setQ(""); setCat("Todas"); setBrand("Todas"); setLimit(PAGE); };

  const WA = (it: InvItem) =>
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hola FDR, me interesa: ${it.code} - ${it.desc}. ¿Precio y disponibilidad?`)}`;

  return (
    <section id="catalogo" className="py-16 lg:py-24 relative" style={{ background:"#f4f7fd" }}>
      <div className="absolute top-0 left-0 right-0 h-1"
           style={{ background:"linear-gradient(90deg,#003A8C,#E30613,#003A8C)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-divider" />
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3" style={{ color:"#E30613" }}>
            Buscador de Catálogo
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color:"#001020" }}>
            Encuentra tu repuesto en{" "}
            <span style={{ background:"linear-gradient(135deg,#003A8C,#0064ff,#003A8C)", backgroundSize:"200% auto",
                           WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                           animation:"shimmer 4s linear infinite" }}>
              segundos
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color:"#6b7280" }}>
            Catálogo sincronizado con nuestro inventario — cotiza al instante por WhatsApp.
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color:"#9aa5bd" }}
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={q}
              onChange={e => { setQ(e.target.value); setLimit(PAGE); }}
              placeholder="Buscar código, nombre o marca..."
              className="w-full pl-12 pr-10 py-3.5 rounded-xl outline-none text-sm"
              style={{ background:"#ffffff", border:"1.5px solid #dde4f2", color:"#001020" }}
            />
            {q && (
              <button onClick={() => setQ("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70" style={{ color:"#9ca3af" }}>✕</button>
            )}
          </div>
          <select value={brand} onChange={e => { setBrand(e.target.value); setLimit(PAGE); }}
                  className="px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer sm:w-56"
                  style={{ background:"#ffffff", border:"1.5px solid #dde4f2", color:"#001020" }}>
            <option value="Todas">Todas las marcas</option>
            {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Contador tipo pestaña */}
        <div className="mb-4">
          <div className="w-full px-5 py-3 rounded-xl text-sm font-bold text-center"
               style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)", color:"#fff" }}>
            Todos los productos ({loading ? "…" : results.length})
          </div>
        </div>

        {/* Chips de categoría */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Todas", ...CATS].map(c => (
            <button key={c} onClick={() => { setCat(c); setLimit(PAGE); }}
                    className="px-4 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95"
                    style={{
                      background: cat===c ? "linear-gradient(135deg,#003A8C,#0050C8)" : "#ffffff",
                      color: cat===c ? "#fff" : "#4b5563",
                      border: `1.5px solid ${cat===c ? "#003A8C" : "#dde4f2"}`,
                    }}>
              {c}
            </button>
          ))}
          {(q || cat!=="Todas" || brand!=="Todas") && (
            <button onClick={reset} className="px-4 py-2 rounded-full text-xs font-bold transition-colors"
                    style={{ color:"#E30613", border:"1.5px solid rgba(227,6,19,.3)", background:"rgba(227,6,19,.05)" }}>
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Resultados */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-white animate-pulse"
                   style={{ border:"1.5px solid #e6ecf7" }}>
                <div className="w-full aspect-square" style={{ background:"#eef2fa" }} />
                <div className="p-3 space-y-2">
                  <div className="h-2.5 rounded" style={{ background:"#e6ecf7", width:"40%" }} />
                  <div className="h-3.5 rounded" style={{ background:"#e6ecf7", width:"85%" }} />
                  <div className="h-2.5 rounded" style={{ background:"#eef2fa", width:"55%" }} />
                  <div className="h-9 rounded-lg" style={{ background:"#eef2fa" }} />
                </div>
              </div>
            ))}
          </div>
        ) : shown.length === 0 ? (
          <div className="text-center py-20 rounded-2xl"
               style={{ background:"#ffffff", border:"1.5px solid #e6ecf7" }}>
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-bold text-lg mb-1" style={{ color:"#001020" }}>No encontramos esa referencia</p>
            <p className="text-sm mb-6" style={{ color:"#6b7280" }}>Escríbenos y la conseguimos para ti</p>
            <a href={`https://wa.me/${whatsapp}?text=Hola%20FDR,%20busco%20la%20referencia:%20${encodeURIComponent(q)}`}
               target="_blank" rel="noopener noreferrer" className="btn-green text-sm">
              Consultar por WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {shown.map((it, i) => (
              <div key={it.code+i} className="rounded-xl overflow-hidden transition-all duration-300 group bg-white flex flex-col"
                   style={{ border:"1.5px solid #e6ecf7", boxShadow:"0 1px 4px rgba(0,58,140,.05)" }}
                   onMouseEnter={e => { const el=e.currentTarget as HTMLDivElement;
                     el.style.borderColor="#003A8C"; el.style.transform="translateY(-3px)";
                     el.style.boxShadow="0 10px 28px rgba(0,58,140,.14)"; }}
                   onMouseLeave={e => { const el=e.currentTarget as HTMLDivElement;
                     el.style.borderColor="#e6ecf7"; el.style.transform="translateY(0)";
                     el.style.boxShadow="0 1px 4px rgba(0,58,140,.05)"; }}>

                {/* Imagen cuadrada — foto real del inventario o marcador.
                    Se pinta como fondo CSS para que el clic derecho no ofrezca guardarla. */}
                <div data-protected
                     className="relative w-full aspect-square flex items-center justify-center overflow-hidden select-none"
                     style={{ background:"#fbfcfe", borderBottom:"1px solid #eef2fa" }}>
                  {it.img ? (
                    <div role="img" aria-label={it.desc}
                         className="absolute inset-3 transition-transform duration-300 group-hover:scale-105"
                         style={{ backgroundImage:`url("${it.img}")`, backgroundSize:"contain",
                                  backgroundPosition:"center", backgroundRepeat:"no-repeat" }} />
                  ) : (
                    <svg className="w-12 h-12" style={{ color:"#dfe6f4" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )}
                </div>

                {/* Cuerpo */}
                <div className="p-3 flex flex-col flex-1">
                  <p className="text-[11px] font-black mb-0.5" style={{ color:"#E30613" }}>{it.code}</p>
                  <h3 className="font-bold text-sm leading-snug mb-1 line-clamp-2" style={{ color:"#001020" }}>
                    {it.desc}
                  </h3>
                  <p className="text-xs mb-3" style={{ color:"#8b93a7" }}>{it.brand}</p>

                  <a href={WA(it)} target="_blank" rel="noopener noreferrer"
                     className="mt-auto w-full flex items-center justify-center gap-1.5 text-xs font-bold py-3 rounded-lg transition-all hover:brightness-110 active:scale-95"
                     style={{ background:"linear-gradient(135deg,#25D366,#1ea752)", color:"#fff" }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                    Cotizar
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ver más */}
        {!loading && limit < results.length && (
          <div className="text-center mt-10">
            <button onClick={() => setLimit(l => l + PAGE)}
                    className="px-8 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                    style={{ background:"#ffffff", border:"1.5px solid #003A8C", color:"#003A8C", boxShadow:"0 2px 8px rgba(0,58,140,.1)" }}>
              Ver más ({results.length - limit} restantes) ↓
            </button>
          </div>
        )}

        {/* Nota */}
        <p className="text-center text-xs mt-8" style={{ color:"#9ca3af" }}>
          Catálogo sincronizado en vivo con nuestro inventario. Consulta precio y disponibilidad al instante por WhatsApp.
          {country === "CO" && (
            <>
              {" "}Compra online en{" "}
              <a href="https://www.tiendafdr.com" target="_blank" rel="noopener noreferrer"
                 className="font-semibold hover:underline" style={{ color:"#003A8C" }}>tiendafdr.com</a>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
