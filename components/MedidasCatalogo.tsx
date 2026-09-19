"use client";
import { useCountry } from "@/lib/CountryContext";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import medidas from "@/lib/medidas.json";

type Terminal  = { raw_code:string; desc:string; diam_mayor:string; diam_menor:string; diam_rosca:string; paso:string; long_vastago:string };
type Fundicion = { raw_code:string; desc:string; diam_mayor:string; diam_menor:string; diam_rosca:string; long_roscada:string; long_total:string };
type Brazo     = { code:string; desc:string; long_espigos:string; terminal:string; abrazadera:string; cana:string };
type KingPin   = { code:string; desc:string; largo_mm:string; dist_cono:string; diam_menor:string; diam_mayor:string; distancia:string; rosca:string };
type Punta     = { code:string; desc:string; diam_buje:string; diam_mayor:string; diam_menor:string; rosca:string };

const TERMINALES  = medidas.terminales       as Terminal[];
const FUNDICIONES = medidas.fundiciones      as Fundicion[];
const BRAZOS      = medidas.brazos           as Brazo[];
const KING_PINS   = medidas.king_pins        as KingPin[];
const PUNTAS      = (medidas as any).puntas_tensoras as Punta[];

// Agrupar filas que comparten el mismo código base R/L
function groupRL<T extends { raw_code: string }>(items: T[]) {
  const map = new Map<string, T[]>();
  items.forEach(t => {
    // "FD-2061 R/62 L" → "FD-2061 R/62 L" (usamos raw_code como key del grupo)
    const key = t.raw_code.trim();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(t);
  });
  return Array.from(map.entries()).map(([key, variants]) => ({ key, variants }));
}

const termGruposAll  = groupRL(TERMINALES);
const fundGruposAll  = groupRL(FUNDICIONES);

const TABS = [
  { id:"terminales",  label:"Terminales",  count: termGruposAll.length },
  { id:"fundiciones", label:"Fundiciones", count: fundGruposAll.length },
  { id:"brazos",      label:"Brazos",      count: BRAZOS.length },
  { id:"kingpin",     label:"King Pin",    count: KING_PINS.length },
  { id:"punta",       label:"Punta Tensora", count: PUNTAS?.length || 0 },
];

const TH = "px-3 py-3 text-left text-white font-bold text-xs uppercase tracking-wide";
const TD = "px-3 py-3 text-sm";

export default function MedidasCatalogo() {
  const { whatsapp } = useCountry();
  const [open, setOpen] = useState(false);
  const [tab, setTab]   = useState("terminales");
  const [q, setQ]       = useState("");
  const qq = q.trim().toLowerCase();

  const termGrupos = useMemo(() =>
    !qq ? termGruposAll : termGruposAll.filter(g =>
      g.key.toLowerCase().includes(qq) || (g.variants[0]?.desc || "").toLowerCase().includes(qq)
    ), [qq]);

  const fundGrupos = useMemo(() =>
    !qq ? fundGruposAll : fundGruposAll.filter(g =>
      g.key.toLowerCase().includes(qq) || (g.variants[0]?.desc || "").toLowerCase().includes(qq)
    ), [qq]);

  const filtBrazos = useMemo(() =>
    !qq ? BRAZOS : BRAZOS.filter(b =>
      b.code.toLowerCase().includes(qq) || b.desc.toLowerCase().includes(qq)
    ), [qq]);

  const filtKP = useMemo(() =>
    !qq ? KING_PINS : KING_PINS.filter(k =>
      k.code.toLowerCase().includes(qq) || k.desc.toLowerCase().includes(qq)
    ), [qq]);

  const filtPuntas = useMemo(() =>
    !qq ? (PUNTAS || []) : (PUNTAS || []).filter((p: Punta) =>
      p.code.toLowerCase().includes(qq) || p.desc.toLowerCase().includes(qq)
    ), [qq]);

  const d = (v: string) => v || "—";

  return (
    <section id="medidas" className="py-16 lg:py-24 relative" style={{ background:"#f0f4ff" }}>
      <div className="absolute top-0 left-0 right-0 h-1"
           style={{ background:"linear-gradient(90deg,#003A8C,#E30613,#003A8C)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:"linear-gradient(rgba(0,58,140,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,58,140,.04) 1px,transparent 1px)",
        backgroundSize:"40px 40px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Trigger button (siempre visible) ── */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-5 transition-all duration-300 group"
          style={{
            background: open ? "rgba(0,58,140,.08)" : "#ffffff",
            border: `1.5px solid ${open ? "#003A8C" : "#d1daf5"}`,
            boxShadow: open ? "0 4px 24px rgba(0,58,140,.12)" : "0 2px 8px rgba(0,58,140,.06)"
          }}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                 style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)" }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-black text-base" style={{ color:"#001020" }}>
                Catálogo de Medidas Técnicas
              </p>
              <p className="text-sm" style={{ color:"#6b7280" }}>
                {TERMINALES.length + FUNDICIONES.length + BRAZOS.length + KING_PINS.length + (PUNTAS?.length||0)} piezas con dimensiones exactas · Terminales, Brazos, King Pin, Fundiciones
              </p>
            </div>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:.25 }}>
            <svg className="w-6 h-6 flex-shrink-0" style={{ color:"#003A8C" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>

        {/* ── Contenido colapsable ── */}
        <AnimatePresence initial={false}>
        {open && (
        <motion.div
          key="medidas-content"
          initial={{ height:0, opacity:0 }}
          animate={{ height:"auto", opacity:1 }}
          exit={{ height:0, opacity:0 }}
          transition={{ duration:.35, ease:[.23,1,.32,1] }}
          style={{ overflow:"hidden" }}>
        <div className="pt-6">

        {/* Search */}
        <div className="relative mb-6 max-w-xl mx-auto">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color:"#003A8C" }}
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={q} onChange={e => setQ(e.target.value)}
            placeholder="Busca por código (FD-4061, BD-009, KP-001)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-xl outline-none text-sm"
            style={{ background:"#fff", border:"1.5px solid #d1daf5", color:"#001020" }} />
          {q && <button onClick={() => setQ("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setQ(""); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all"
                    style={tab===t.id
                      ? { background:"linear-gradient(135deg,#003A8C,#0050C8)", color:"#fff" }
                      : { background:"#fff", color:"#374151", border:"1.5px solid #d1daf5" }}>
              {t.label}
              <span className="px-1.5 py-0.5 rounded-full text-[11px] font-black"
                    style={{ background: tab===t.id?"rgba(255,255,255,.2)":"#eef2ff", color: tab===t.id?"#fff":"#003A8C" }}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── TERMINALES ── */}
          {tab === "terminales" && (
            <motion.div key="terminales"
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
              transition={{ duration:.25 }}>
              <p className="text-xs mb-3 font-medium" style={{ color:"#9ca3af" }}>
                Medidas en mm · R/L = disponible derecha e izquierda con código propio
              </p>
              <div className="overflow-x-auto rounded-2xl shadow-sm" style={{ border:"1.5px solid #e0e8ff" }}>
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)" }}>
                      <th className={TH}>Código R/L</th>
                      <th className={TH}>Descripción</th>
                      <th className={TH + " text-center"}>Ø Mayor</th>
                      <th className={TH + " text-center"}>Ø Menor</th>
                      <th className={TH + " text-center"}>Ø Rosca</th>
                      <th className={TH + " text-center"}>Paso</th>
                      <th className={TH + " text-center"}>Vástago</th>
                    </tr>
                  </thead>
                  <tbody>
                    {termGrupos.map((g, i) => {
                      const t = g.variants[0];
                      return (
                        <tr key={g.key} className="hover:bg-blue-50 transition-colors"
                            style={{ background:i%2===0?"#fff":"#f8faff", borderBottom:"1px solid #e8eeff" }}>
                          <td className={TD}>
                            <span className="font-mono font-black text-xs px-2 py-1 rounded-lg"
                                  style={{ background:"#eef2ff", color:"#003A8C" }}>
                              {g.key}
                            </span>
                          </td>
                          <td className={TD} style={{ color:"#374151", maxWidth:280 }}>{d(t.desc)}</td>
                          <td className={TD + " text-center font-black"} style={{ color:"#003A8C" }}>{d(t.diam_mayor)}</td>
                          <td className={TD + " text-center font-black"} style={{ color:"#003A8C" }}>{d(t.diam_menor)}</td>
                          <td className={TD + " text-center"} style={{ color:"#374151" }}>{d(t.diam_rosca)}</td>
                          <td className={TD + " text-center text-xs"} style={{ color:"#6b7280" }}>{d(t.paso)}</td>
                          <td className={TD + " text-center font-black"} style={{ color:"#E30613" }}>{d(t.long_vastago)}</td>
                        </tr>
                      );
                    })}
                    {termGrupos.length === 0 && (
                      <tr><td colSpan={7} className="text-center py-10 text-gray-400">Sin resultados para &ldquo;{q}&rdquo;</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── FUNDICIONES ── */}
          {tab === "fundiciones" && (
            <motion.div key="fundiciones"
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
              transition={{ duration:.25 }}>
              <p className="text-xs mb-3 font-medium" style={{ color:"#9ca3af" }}>
                Terminales fundición — Rosca métrica · Medidas en mm
              </p>
              <div className="overflow-x-auto rounded-2xl shadow-sm" style={{ border:"1.5px solid #e0e8ff" }}>
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)" }}>
                      <th className={TH}>Código R/L</th>
                      <th className={TH}>Descripción</th>
                      <th className={TH + " text-center"}>Ø Mayor</th>
                      <th className={TH + " text-center"}>Ø Menor</th>
                      <th className={TH + " text-center"}>Rosca y Paso</th>
                      <th className={TH + " text-center"}>Long. Roscada</th>
                      <th className={TH + " text-center"}>Long. Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundGrupos.map((g, i) => {
                      const t = g.variants[0];
                      return (
                        <tr key={g.key} className="hover:bg-blue-50 transition-colors"
                            style={{ background:i%2===0?"#fff":"#f8faff", borderBottom:"1px solid #e8eeff" }}>
                          <td className={TD}>
                            <span className="font-mono font-black text-xs px-2 py-1 rounded-lg"
                                  style={{ background:"#eef2ff", color:"#003A8C" }}>
                              {g.key}
                            </span>
                          </td>
                          <td className={TD} style={{ color:"#374151" }}>{d(t.desc)}</td>
                          <td className={TD + " text-center font-black"} style={{ color:"#003A8C" }}>{d(t.diam_mayor)}</td>
                          <td className={TD + " text-center font-black"} style={{ color:"#003A8C" }}>{d(t.diam_menor)}</td>
                          <td className={TD + " text-center"} style={{ color:"#374151" }}>{d(t.diam_rosca)}</td>
                          <td className={TD + " text-center font-bold"} style={{ color:"#E30613" }}>{d(t.long_roscada)}</td>
                          <td className={TD + " text-center font-bold"} style={{ color:"#374151" }}>{d(t.long_total)}</td>
                        </tr>
                      );
                    })}
                    {fundGrupos.length === 0 && (
                      <tr><td colSpan={7} className="text-center py-10 text-gray-400">Sin resultados</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── BRAZOS ── */}
          {tab === "brazos" && (
            <motion.div key="brazos"
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
              transition={{ duration:.25 }}>
              <p className="text-xs mb-3 font-medium" style={{ color:"#9ca3af" }}>
                Medidas en cm · Incluye código de terminal y abrazadera
              </p>
              <div className="overflow-x-auto rounded-2xl shadow-sm" style={{ border:"1.5px solid #e0e8ff" }}>
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)" }}>
                      <th className={TH}>Código</th>
                      <th className={TH}>Descripción</th>
                      <th className={TH + " text-center"}>Entre espigos</th>
                      <th className={TH + " text-center"}>Terminal</th>
                      <th className={TH + " text-center"}>Abrazadera</th>
                      <th className={TH + " text-center"}>Caña</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtBrazos.map((b, i) => (
                      <tr key={b.code} className="hover:bg-blue-50 transition-colors"
                          style={{ background:i%2===0?"#fff":"#f8faff", borderBottom:"1px solid #e8eeff" }}>
                        <td className={TD}>
                          <span className="font-mono font-black text-xs px-2 py-1 rounded-lg"
                                style={{ background:"#eef2ff", color:"#003A8C" }}>
                            {b.code}
                          </span>
                        </td>
                        <td className={TD} style={{ color:"#374151", maxWidth:280 }}>{d(b.desc)}</td>
                        <td className={TD + " text-center font-black"} style={{ color:"#E30613" }}>{d(b.long_espigos)}</td>
                        <td className={TD + " text-center font-mono text-xs"} style={{ color:"#003A8C" }}>{d(b.terminal)}</td>
                        <td className={TD + " text-center font-mono text-xs"} style={{ color:"#6b7280" }}>{d(b.abrazadera)}</td>
                        <td className={TD + " text-center font-mono text-xs"} style={{ color:"#6b7280" }}>{d(b.cana)}</td>
                      </tr>
                    ))}
                    {filtBrazos.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-10 text-gray-400">Sin resultados</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── KING PIN ── */}
          {tab === "kingpin" && (
            <motion.div key="kingpin"
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
              transition={{ duration:.25 }}>
              <p className="text-xs mb-3 font-medium" style={{ color:"#9ca3af" }}>
                Medidas en mm · Compatible con tractocamiones línea pesada
              </p>
              <div className="overflow-x-auto rounded-2xl shadow-sm" style={{ border:"1.5px solid #e0e8ff" }}>
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)" }}>
                      <th className={TH}>Código</th>
                      <th className={TH}>Descripción</th>
                      <th className={TH + " text-center"}>Largo</th>
                      <th className={TH + " text-center"}>Dist. al cono</th>
                      <th className={TH + " text-center"}>Ø Menor</th>
                      <th className={TH + " text-center"}>Ø Mayor</th>
                      <th className={TH + " text-center"}>Rosca</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtKP.map((k, i) => (
                      <tr key={k.code} className="hover:bg-blue-50 transition-colors"
                          style={{ background:i%2===0?"#fff":"#f8faff", borderBottom:"1px solid #e8eeff" }}>
                        <td className={TD}>
                          <span className="font-mono font-black text-xs px-2 py-1 rounded-lg"
                                style={{ background:"#fff3cd", color:"#b45309" }}>
                            {k.code}
                          </span>
                        </td>
                        <td className={TD} style={{ color:"#374151" }}>{d(k.desc)}</td>
                        <td className={TD + " text-center font-black text-base"} style={{ color:"#003A8C" }}>{d(k.largo_mm)}</td>
                        <td className={TD + " text-center"} style={{ color:"#374151" }}>{d(k.dist_cono)}</td>
                        <td className={TD + " text-center font-bold"} style={{ color:"#003A8C" }}>{d(k.diam_menor)}</td>
                        <td className={TD + " text-center font-bold"} style={{ color:"#003A8C" }}>{d(k.diam_mayor)}</td>
                        <td className={TD + " text-center text-xs"} style={{ color:"#6b7280" }}>{d(k.rosca)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── PUNTA TENSORA ── */}
          {tab === "punta" && (
            <motion.div key="punta"
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
              transition={{ duration:.25 }}>
              <p className="text-xs mb-3 font-medium" style={{ color:"#9ca3af" }}>
                Zanahoria · Medidas en mm
              </p>
              <div className="overflow-x-auto rounded-2xl shadow-sm" style={{ border:"1.5px solid #e0e8ff" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)" }}>
                      <th className={TH}>Código</th>
                      <th className={TH}>Descripción</th>
                      <th className={TH + " text-center"}>Ø Buje</th>
                      <th className={TH + " text-center"}>Ø Cono mayor</th>
                      <th className={TH + " text-center"}>Ø Cono menor</th>
                      <th className={TH + " text-center"}>Rosca</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtPuntas.map((p: Punta, i: number) => (
                      <tr key={p.code} className="hover:bg-blue-50 transition-colors"
                          style={{ background:i%2===0?"#fff":"#f8faff", borderBottom:"1px solid #e8eeff" }}>
                        <td className={TD}>
                          <span className="font-mono font-black text-xs px-2 py-1 rounded-lg"
                                style={{ background:"#f0fdf4", color:"#16a34a" }}>
                            {p.code}
                          </span>
                        </td>
                        <td className={TD} style={{ color:"#374151" }}>{d(p.desc)}</td>
                        <td className={TD + " text-center font-black"} style={{ color:"#003A8C" }}>{d(p.diam_buje)}</td>
                        <td className={TD + " text-center font-bold"} style={{ color:"#003A8C" }}>{d(p.diam_mayor)}</td>
                        <td className={TD + " text-center font-bold"} style={{ color:"#E30613" }}>{d(p.diam_menor)}</td>
                        <td className={TD + " text-center text-xs"} style={{ color:"#6b7280" }}>{d(p.rosca)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        <p className="text-center text-xs mt-8" style={{ color:"#9ca3af" }}>
          Especificaciones del catálogo oficial FDR. Para confirmar compatibilidad con tu vehículo,{" "}
          <a href={`https://wa.me/${whatsapp}?text=Hola%20FDR,%20quiero%20verificar%20medidas`}
             target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color:"#003A8C" }}>
            consulta con un asesor →
          </a>
        </p>

        </div>{/* pt-6 */}
        </motion.div>
        )}
        </AnimatePresence>

      </div>
    </section>
  );
}
