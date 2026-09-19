"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import CountrySwitcher from "./CountrySwitcher";
import { useCountry } from "@/lib/CountryContext";

const links = [
  { href: "#inicio",    label: "Inicio" },
  { href: "#productos", label: "Productos" },
  { href: "#catalogo",  label: "Buscar Catálogo" },
  { href: "#nosotros",  label: "Nosotros" },
  { href: "#contacto",  label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { country, whatsapp }   = useCountry();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Ambas portadas son azules → logo blanco y texto claro en el hero; azul/oscuro al hacer scroll
  const darkText = scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-1.5" : "py-2.5 lg:py-5"
      }`}
      style={{
        background: scrolled ? "#ffffff" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,58,140,0.12)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,58,140,.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo — blanco en hero, azul al hacer scroll. Más pequeño en móvil. */}
        <a href="#inicio" className="flex items-center gap-2 group">
          <div className={`relative transition-all duration-300 group-hover:scale-105 flex-shrink-0 ${
            scrolled
              ? "w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] lg:w-[140px] lg:h-[140px]"
              : "w-[68px] h-[68px] sm:w-[92px] sm:h-[92px] lg:w-[120px] lg:h-[120px]"
          }`}>
            <Image
              src={darkText ? "/opt/logo-fdr.webp" : "/opt/logo-fdr-blanco.webp"}
              alt="FDR Suspension Parts"
              fill
              className="object-contain"
              priority
            />
          </div>
          {!scrolled && (
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: darkText ? "rgba(0,58,140,0.55)" : "rgba(255,255,255,0.5)" }}>Suspension Parts</p>
              <p className="text-base font-black leading-none" style={{ color: darkText ? "#001020" : "#ffffff" }}>FDR</p>
            </div>
          )}
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href}
               className="nav-link text-sm font-semibold transition-colors duration-300"
               style={{ color: darkText ? "#001020" : "rgba(255,255,255,0.9)" }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <CountrySwitcher />
          {country === "CO" && (
            <a href="https://www.tiendafdr.com" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl transition-all hover:scale-105"
               style={{
                 background: scrolled ? "linear-gradient(135deg,#003A8C,#0050C8)" : "rgba(255,255,255,0.15)",
                 color: "#ffffff",
                 border: scrolled ? "none" : "1.5px solid rgba(255,255,255,0.35)",
               }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Tienda
            </a>
          )}
          <a href={`https://wa.me/${whatsapp}?text=Hola%20FDR,%20quiero%20cotizar`}
             target="_blank" rel="noopener noreferrer"
             className="btn-green text-sm px-5 py-2.5 pulse-green">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Móvil: selector de país siempre visible + menú */}
        <div className="flex items-center gap-2 lg:hidden">
          <CountrySwitcher />
          <button className="p-2.5 -mr-1 transition-colors rounded-lg"
                  aria-label={open ? "Cerrar menú" : "Abrir menú"}
                  aria-expanded={open}
                  style={{ color: darkText ? "#001020" : "#ffffff" }}
                  onClick={() => setOpen(!open)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden px-4 pb-5 pt-3 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto"
             style={{
               background: scrolled ? "#ffffff" : "rgba(0,32,96,0.98)",
               backdropFilter: "blur(16px)",
               borderTop: scrolled ? "1px solid rgba(0,58,140,.1)" : "1px solid rgba(255,255,255,0.15)"
             }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
               className="flex items-center justify-between px-4 py-3.5 font-bold rounded-xl transition-colors text-base active:scale-[.98]"
               style={{ color: scrolled ? "#001020" : "#ffffff",
                        background: scrolled ? "#f4f7fd" : "rgba(255,255,255,.07)" }}>
              {l.label}
              <span aria-hidden style={{ color: scrolled ? "#9aa5bd" : "rgba(255,255,255,.4)" }}>›</span>
            </a>
          ))}
          {country === "CO" && (
            <a href="https://www.tiendafdr.com" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 justify-center w-full py-3 rounded-xl font-bold text-sm mt-2 transition-all"
               style={{ background:"linear-gradient(135deg,#003A8C,#0050C8)", color:"#fff" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Ir a la Tienda
            </a>
          )}
          <a href={`https://wa.me/${whatsapp}?text=Hola%20FDR,%20quiero%20cotizar`}
             target="_blank" rel="noopener noreferrer"
             className="btn-green w-full justify-center mt-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
            </svg>
            Cotizar por WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
