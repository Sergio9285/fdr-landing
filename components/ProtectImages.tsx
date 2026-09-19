"use client";
import { useEffect } from "react";

/**
 * Disuade la descarga de imágenes:
 * - Bloquea el menú contextual (clic derecho) sobre <img> y contenedores [data-protected]
 * - Bloquea el arrastre de imágenes
 * El resto de la página conserva su clic derecho normal.
 *
 * Nota: es una disuasión, no un candado — las fotos siguen siendo accesibles
 * para quien sepa abrir las herramientas de desarrollo.
 */
export default function ProtectImages() {
  useEffect(() => {
    const isProtected = (t: EventTarget | null) =>
      t instanceof Element && (t.tagName === "IMG" || !!t.closest("[data-protected]"));

    const onContextMenu = (e: MouseEvent) => { if (isProtected(e.target)) e.preventDefault(); };
    const onDragStart   = (e: DragEvent) => { if (isProtected(e.target)) e.preventDefault(); };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
