"use client";
import { useState } from "react";
import Image from "next/image";

const posts = [
  { src: "/opt/terminales-taller.webp",  alt: "Terminales de dirección en taller FDR" },
  { src: "/opt/terminal-caja-fdr.webp",  alt: "Terminal con caja FDR" },
  { src: "/opt/king-pin-cajas-fdr.webp", alt: "King pin con cajas FDR" },
  { src: "/opt/king-pins-set.webp",      alt: "Set de pines y bocines FDR" },
  { src: "/opt/producto-contexto-1.webp",alt: "Producto FDR en contexto" },
  { src: "/opt/producto-contexto-4.webp",alt: "Producto FDR" },
  { src: "/opt/galeria-4.webp",          alt: "Planta FDR" },
  { src: "/opt/producto-contexto-5.webp",alt: "Producto FDR" },
  { src: "/opt/producto-contexto-6.webp",alt: "Producto FDR" },
  { src: "/opt/galeria-2.webp",          alt: "Fabricación FDR" },
  { src: "/opt/galeria-3.webp",          alt: "Taller FDR" },
  { src: "/opt/galeria-5.webp",          alt: "Producto FDR" },
];

const IG = "https://www.instagram.com/fdr.suspension/";

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="py-16 lg:py-24 relative" style={{ background:"#f8faff" }}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:"linear-gradient(rgba(0,58,140,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,58,140,.04) 1px,transparent 1px)",
        backgroundSize:"40px 40px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div>
            <div className="section-divider-left" />
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-2" style={{ color:"#E30613" }}>
              Galería de productos
            </p>
            <h2 className="text-3xl lg:text-4xl font-black" style={{ color:"#001020" }}>
              Nuestros productos <span style={{ color:"#003A8C" }}>en detalle</span>
            </h2>
          </div>
          <a href={IG} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 text-white font-bold px-5 py-3 rounded-xl transition-all hover:scale-105 flex-shrink-0 text-sm"
             style={{ background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @fdr.suspension
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {posts.map((p, i) => (
            <button key={i} onClick={() => setLightbox(p.src)}
                    className="relative aspect-square rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-shadow"
                    style={{ border:"1px solid #dde5f0" }}>
              <Image src={p.src} alt={p.alt} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                     className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                   style={{ background:"rgba(0,58,140,.55)" }}>
                <svg className="w-8 h-8 text-white"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center mt-10">
          <a href={IG} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
             style={{ color:"#003A8C", background:"rgba(0,58,140,.06)", border:"1.5px solid rgba(0,58,140,.2)" }}>
            Ver más en @fdr.suspension →
          </a>
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)}
             className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-zoom-out"
             style={{ background:"rgba(0,5,15,.92)", backdropFilter:"blur(8px)" }}>
          <button className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                  style={{ background:"rgba(255,255,255,.1)" }}>✕</button>
          <div className="relative w-full max-w-3xl aspect-square">
            <Image src={lightbox} alt="" fill className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
