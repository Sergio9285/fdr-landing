"use client";
import { useState, useRef, useEffect } from "react";
import { useCountry } from "@/lib/CountryContext";
import { fetchInventory, type InvItem } from "@/lib/inventory";

type Msg = { role: "bot" | "user"; text?: string; products?: InvItem[]; leadCta?: boolean };

// ── Utilidades de búsqueda ──────────────────────────────────────────────
const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Sinónimos de tipo de pieza → así "rótula" encuentra "terminal", etc.
const SYN: Record<string, string[]> = {
  terminal:   ["terminal", "rotula", "punta"],
  brazo:      ["brazo", "pitman"],
  barra:      ["barra", "bieleta"],
  pin:        ["pin", "kingpin", "king", "bocin", "bocines", "pasador", "spindle", "splinder", "spinder", "munon", "kit"],
  abrazadera: ["abrazadera", "grapa"],
  cana:       ["cana", "cania"],
  balancin:   ["balancin"],
};
// Tipo de pieza → fragmento de categoría real de la app, para priorizar la categoría correcta.
// Categorías: Terminales, Brazos de Dirección, Pines y Bocines, King Pin, Cañas de Dirección,
// Pasadores y Tensores, Balancines, Cauchos, Partes de Trailer, Empaquetaduras.
const TYPE2CAT: { re: RegExp; cat: string }[] = [
  { re: /(terminal|rotula|punta)/,                     cat: "terminal" },
  { re: /(brazo|pitman)/,                              cat: "brazo" },
  { re: /(barra|bieleta|transversal)/,                cat: "brazo" },   // barras/transversales viven en "Brazos de Dirección"
  { re: /(king ?pin|kingpin|bocin|bocines|splinder|spinder|spindle|pasador|\bpin\b)/, cat: "pin" }, // "pin" cubre "Pines y Bocines" y "King Pin"
  { re: /(balancin)/,                                  cat: "balancin" },
  { re: /(cana|cania)/,                                cat: "cana" },
  { re: /(abrazadera|grapa)/,                           cat: "abrazadera" },
];
const STOP = new Set(["de","la","el","los","las","para","mi","un","una","y","con","tengo","necesito","busco","quiero","repuesto","repuestos","parte","partes","pieza","piezas","del","que","por","favor","hola","buenas","dia","dias","tardes","noches","ayuda","ayudame","porfa"]);

function expandTokens(q: string): string[] {
  const raw = norm(q).replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter(t => t && !STOP.has(t) && t.length > 1);
  const out = new Set<string>(raw);
  for (const t of raw) {
    for (const group of Object.values(SYN)) {
      if (group.includes(t)) group.forEach(g => out.add(g));
    }
  }
  return [...out];
}

// Puntúa cada producto contra la consulta y devuelve los mejores.
function searchInventory(inv: InvItem[], q: string, max = 5): InvItem[] {
  const tokens = expandTokens(q);
  if (!tokens.length) return [];
  const nq = norm(q);
  const codeHint = nq.replace(/[^a-z0-9]/g, "");
  const wantedCat = TYPE2CAT.find(m => m.re.test(nq))?.cat ?? null; // categoría que pide el cliente
  const scored = inv.map(p => {
    const code = norm(p.code).replace(/[^a-z0-9]/g, "");
    const desc = norm(p.desc);
    const brand = norm(p.brand);
    const cat = norm(p.cat);
    let s = 0;
    if (codeHint.length >= 4 && code.includes(codeHint)) s += 120;
    if (wantedCat && cat.includes(wantedCat)) s += 50; // prioriza la categoría correcta
    for (const t of tokens) {
      if (code.includes(t)) s += 30;
      if (brand.includes(t)) s += 14;
      if (cat.includes(t)) s += 9;
      if (desc.includes(t)) s += 7;
    }
    return { p, s };
  }).filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s);
  return scored.slice(0, max).map(x => x.p);
}

// Respuestas a preguntas frecuentes (no de producto).
function faqAnswer(q: string): string | null {
  const t = norm(q);
  if (/\b(ubica|direccion|donde|ubicados|ciudad|pais)\b/.test(t))
    return "Somos fabricantes e importadores directos con presencia en 🇨🇴 Colombia y 🇪🇨 Ecuador. Atendemos toda la región. ¿Qué repuesto necesitas?";
  if (/\b(horario|abren|atienden|hora)\b/.test(t))
    return "Atendemos en horario hábil de lunes a sábado. Por WhatsApp respondemos en minutos 👇";
  if (/\b(garantia|garantiza|respaldo)\b/.test(t))
    return "Todas nuestras piezas son de fabricación propia con garantía directa de fábrica. ¿Buscas alguna referencia en especial?";
  if (/\b(envio|despacho|encomienda|transportadora|llega)\b/.test(t))
    return "Hacemos envíos a todo el país. Coordinamos el despacho por WhatsApp una vez confirmes tu pedido.";
  if (/\b(comprar|tienda|online|pagar|pago)\b/.test(t))
    return "Cotiza y coordina tu compra directo por WhatsApp — te atendemos al instante. ¿Te ayudo a encontrar la pieza primero?";
  if (/\b(gracias|genial|perfecto|listo|ok)\b/.test(t))
    return "¡Con gusto! 🙌 Si necesitas otra referencia, dime el vehículo o el código y la busco.";
  return null;
}

export default function AiChat() {
  const [open,   setOpen]   = useState(false);
  const [msgs,   setMsgs]   = useState<Msg[]>([]);
  const [input,  setInput]  = useState("");
  const [typing, setTyping] = useState(false);
  const [inv,    setInv]    = useState<InvItem[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { whatsapp } = useCountry();

  const WA = (txt: string) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(txt)}`;

  const addBot = (m: Omit<Msg, "role">, delay = 700) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(x => [...x, { role: "bot", ...m }]);
    }, delay);
  };

  // Carga el inventario en vivo al abrir + saludo inicial
  useEffect(() => {
    if (!open) return;
    if (inv.length === 0) fetchInventory().then(setInv);
    if (msgs.length === 0) {
      addBot({ text: "¡Hola! Soy el asistente de FDR Suspension Parts 🚛\n\nDime qué repuesto buscas y lo encuentro en nuestro inventario. Puedes darme:\n• El vehículo (ej: «terminal de NPR», «brazo Hino 500»)\n• Un código (ej: FD-4001)\n• O el síntoma que tienes" }, 400);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const handle = (raw: string) => {
    const val = raw.trim();
    if (!val) return;
    setInput("");
    setMsgs(x => [...x, { role: "user", text: val }]);

    // 1) ¿Es una pregunta frecuente pura?
    const faq = faqAnswer(val);
    const results = searchInventory(inv, val);

    if (results.length > 0) {
      const n = results.length;
      addBot({ text: `Encontré ${n === 1 ? "esta opción" : `estas ${n} opciones`} para «${val}» 👇`, products: results });
      addBot({ text: "¿Es alguno de estos? Toca «Cotizar» para pedir precio y disponibilidad, o dame más detalles (marca, modelo y año) para afinar la búsqueda.", leadCta: true }, 1100);
      return;
    }

    if (faq) { addBot({ text: faq }); return; }

    // 2) Sin resultados
    if (inv.length === 0) {
      addBot({ text: "Estoy cargando el inventario… dame un segundo y vuelve a escribir la referencia 🙏" });
      return;
    }
    addBot({
      text: `No encontré una coincidencia exacta para «${val}». Cuéntame la marca y modelo del vehículo (ej: Hino 500, Chevrolet NPR, Kenworth T800) y lo busco. También puedo pasarte con un asesor 👇`,
      leadCta: true,
    });
  };

  const quick = ["Terminales", "Brazos de dirección", "King Pin / Bocines", "Barras transversales"];

  const reset = () => { setMsgs([]); setInput(""); };

  return (
    <>
      {/* Bubble */}
      <button onClick={() => setOpen(!open)}
              className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)", boxShadow:"0 0 25px rgba(0,80,200,.5)",
                       border:"2px solid rgba(0,120,255,.4)" }}
              aria-label="Asistente FDR">
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center"
                style={{ background:"#E30613", animation:"pulse-red 2s infinite" }}>!</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 left-3 right-3 sm:left-6 sm:right-auto sm:w-[22rem] z-50 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
             style={{ background:"rgba(0,10,25,.97)", border:"1px solid rgba(0,80,200,.4)",
                      maxHeight:"min(70vh, 520px)", boxShadow:"0 0 40px rgba(0,80,200,.3)" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3"
               style={{ background:"linear-gradient(135deg,rgba(0,40,100,.9),rgba(0,20,60,.9))",
                        borderBottom:"1px solid rgba(0,80,200,.3)" }}>
            <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center"
                 style={{ background:"rgba(0,60,160,.5)", border:"2px solid rgba(0,100,255,.4)" }}>
              <svg className="w-5 h-5" style={{ color:"rgba(100,180,255,.9)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-sm">Asistente FDR</p>
              <p className="text-xs flex items-center gap-1" style={{ color:"#25D366" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#25D366" }} />
                Busca en el inventario en vivo
              </p>
            </div>
            <button onClick={reset} className="text-xs px-2 py-1 rounded-md transition-colors hover:bg-white/10"
                    style={{ color:"rgba(255,255,255,.4)" }}>
              Reiniciar
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight:250 }}>
            {msgs.map((m, i) => (
              <div key={i} className="space-y-2">
                <div className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
                  {m.text && (
                    <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line
                      ${m.role==="user" ? "text-white rounded-tr-sm" : "text-white/90 rounded-tl-sm"}`}
                      style={{
                        background: m.role==="user" ? "linear-gradient(135deg,#003A8C,#0050C8)" : "rgba(0,30,70,.8)",
                        border: m.role==="bot" ? "1px solid rgba(0,80,200,.25)" : "none"
                      }}>
                      {m.text}
                    </div>
                  )}
                </div>

                {/* Tarjetas de producto encontradas en el inventario */}
                {m.products && m.products.length > 0 && (
                  <div className="space-y-2">
                    {m.products.map((p, j) => (
                      <div key={p.code+j} className="flex items-center gap-3 p-2.5 rounded-xl"
                           style={{ background:"rgba(0,40,100,.35)", border:"1px solid rgba(0,80,200,.3)" }}>
                        <div data-protected
                             className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden select-none"
                             style={{ background:"rgba(255,255,255,.06)" }}>
                          {p.img
                            ? <div role="img" aria-label={p.desc} className="w-full h-full"
                                   style={{ backgroundImage:`url("${p.img}")`, backgroundSize:"contain",
                                            backgroundPosition:"center", backgroundRepeat:"no-repeat" }} />
                            : <span className="text-lg">🔩</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-mono font-bold" style={{ color:"#7db8ff" }}>{p.code}</p>
                          <p className="text-xs text-white/85 leading-snug line-clamp-2">{p.desc}</p>
                        </div>
                        <a href={WA(`Hola FDR, me interesa: ${p.code} - ${p.desc}. ¿Precio y disponibilidad?`)}
                           target="_blank" rel="noopener noreferrer"
                           className="flex-shrink-0 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-all hover:scale-105"
                           style={{ background:"linear-gradient(135deg,#25D366,#1ea752)", color:"#fff" }}>
                          Cotizar
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA a asesor cuando aplica */}
                {m.leadCta && (
                  <a href={WA("Hola FDR, necesito ayuda para encontrar un repuesto de línea pesada")}
                     target="_blank" rel="noopener noreferrer"
                     className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                     style={{ background:"rgba(0,50,120,.5)", border:"1px solid rgba(0,100,200,.4)", color:"rgba(150,200,255,.95)" }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                    Hablar con un asesor por WhatsApp
                  </a>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1"
                     style={{ background:"rgba(0,30,70,.8)", border:"1px solid rgba(0,80,200,.25)" }}>
                  {[0,1,2].map(i => (
                    <span key={i} className="w-2 h-2 rounded-full"
                          style={{ background:"rgba(0,120,255,.6)", animation:`pulse-green .8s ${i*.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Chips de sugerencia (solo al inicio) */}
          {msgs.length <= 1 && (
            <div className="px-3 pb-1 flex flex-wrap gap-1.5">
              {quick.map(c => (
                <button key={c} onClick={() => handle(c)}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors"
                        style={{ background:"rgba(0,50,120,.4)", border:"1px solid rgba(0,100,200,.35)", color:"rgba(160,205,255,.9)" }}>
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3" style={{ borderTop:"1px solid rgba(0,80,200,.25)" }}>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key==="Enter" && handle(input)}
                placeholder="Ej: terminal NPR, brazo Hino, FD-4001…"
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/30 px-3 py-2 rounded-lg"
                style={{ border:"1px solid rgba(0,80,200,.3)" }}
              />
              <button onClick={() => handle(input)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all hover:scale-110"
                      style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)" }}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
