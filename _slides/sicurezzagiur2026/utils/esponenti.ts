// Display helpers for very large numbers. They build on scientific() and durata() from crypto.ts,
// whose results write powers as "10^18": apici() turns them into real superscripts.

function escape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Escapes the text and renders every "^n" as a superscript, for v-html. */
export function apici(s: string): string {
  return escape(s).replace(/\^(-?\d+)/g, '<sup>$1</sup>')
}

/** "10^10" when x is an exact power of ten, otherwise "1,50 × 10^10" (to pass through apici). */
export function potenzaDieci(x: number): string {
  const e = Math.round(Math.log10(x))
  if (x > 0 && 10 ** e === x) return e === 0 ? '1' : e === 1 ? '10' : `10^${e}`
  if (x < 1e6) return migliaia(Math.round(x))
  const mant = x / 10 ** Math.floor(Math.log10(x))
  return `${mant.toFixed(2).replace('.', ',')} × 10^${Math.floor(Math.log10(x))}`
}

/** Italian thousands separator, also for 4-digit numbers: 1000 → "1.000". */
export function migliaia(n: number): string {
  // 'always' (ES2023) is needed because Italian does not group 4-digit numbers by default.
  return n.toLocaleString('it-IT', { useGrouping: 'always' } as unknown as Intl.NumberFormatOptions)
}

/** A rate in words for drop-down menus: 1e9 → "1 miliardo", 1e13 → "10.000 miliardi". */
export function inParole(x: number): string {
  const conUnita = (v: number, uno: string, molti: string) =>
    `${migliaia(Number(v.toPrecision(3)))} ${v === 1 ? uno : molti}`
  if (x >= 1e18) return conUnita(x / 1e18, 'miliardo di miliardi', 'miliardi di miliardi')
  if (x >= 1e9) return conUnita(x / 1e9, 'miliardo', 'miliardi')
  if (x >= 1e6) return conUnita(x / 1e6, 'milione', 'milioni')
  return migliaia(x)
}

/** Age of the universe in years (Planck 2018: about 13,8 billion years). */
export const ETA_UNIVERSO_ANNI = 1.38e10
export const SECONDI_ANNO = 365.25 * 86400
