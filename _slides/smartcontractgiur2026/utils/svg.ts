// Helpers for the Sv* diagram blocks.

/** Splits "K_enc, M'" into plain and subscript parts: "_xyz" becomes a subscript. */
export function segmenti(testo: string): { t: string, pedice: boolean }[] {
  const out: { t: string, pedice: boolean }[] = []
  let ultimo = 0
  for (const m of testo.matchAll(/_([A-Za-z0-9]+)/g)) {
    if (m.index! > ultimo) out.push({ t: testo.slice(ultimo, m.index), pedice: false })
    out.push({ t: m[1], pedice: true })
    ultimo = m.index! + m[0].length
  }
  if (ultimo < testo.length) out.push({ t: testo.slice(ultimo), pedice: false })
  return out
}
