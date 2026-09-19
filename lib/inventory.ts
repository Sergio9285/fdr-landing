// Conecta la landing con el inventario de la app (Supabase).
// Trae los MISMOS productos del inventario, pero SOLO campos públicos:
// código, nombre, categoría, marca, OEM, aplicaciones y foto.
// NUNCA precios, costos ni stock. Lo que se suba al inventario aparece aquí.

const SUPABASE_URL = "https://mnvonpkyhyxwbxhnptmq.supabase.co";
// Clave "publishable" (pensada para el navegador; protegida por RLS de solo lectura).
const SUPABASE_KEY = "sb_publishable_77XvMB19-R_ms0Qwcnk6UA_bH4Lis0X";

export type InvItem = {
  code: string;
  desc: string;
  cat: string;
  brand: string;
  img: string | null;
  oem: string | null;
  aplicaciones: string | null;
};

/** Lee el inventario de la app (sin precios). Devuelve [] si falla, para usar respaldo local. */
export async function fetchInventory(): Promise<InvItem[]> {
  try {
    const cols = "codigo,nombre,categoria,marca,oem,aplicaciones,imagen_url";
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/productos?select=${cols}&order=categoria,nombre&limit=5000`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        cache: "no-store", // siempre trae el inventario más reciente
      }
    );
    if (!res.ok) return [];
    const rows: Record<string, string | null>[] = await res.json();
    return rows
      .filter((r) => r.codigo)
      .map((r) => ({
        code: (r.codigo as string).trim(),
        desc: r.nombre || (r.codigo as string),
        cat: r.categoria || "Otros",
        brand: r.marca || "Universal",
        img: r.imagen_url || null,
        oem: r.oem || null,
        aplicaciones: r.aplicaciones || null,
      }));
  } catch {
    return [];
  }
}
