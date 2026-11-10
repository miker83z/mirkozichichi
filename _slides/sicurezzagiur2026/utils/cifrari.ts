// Classical ciphers for the demos (Caesar, Vigenère). Only the 26 letters A–Z are shifted:
// case is kept, and accents, digits, spaces and punctuation stay as they are.

export const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/** Normalises any whole number to a shift between 0 and 25. */
export function modulo26(k: number): number {
  return ((Math.round(k) % 26) + 26) % 26
}

/** Index 0–25 of an A–Z / a–z letter, or -1 for any other character. */
export function indiceLettera(ch: string): number {
  const c = ch.charCodeAt(0)
  if (c >= 65 && c <= 90) return c - 65
  if (c >= 97 && c <= 122) return c - 97
  return -1
}

/** Shifts one character by k places, keeping case; other characters are returned unchanged. */
export function spostaLettera(ch: string, k: number): string {
  const c = ch.charCodeAt(0)
  const s = modulo26(k)
  if (c >= 65 && c <= 90) return String.fromCharCode(((c - 65 + s) % 26) + 65)
  if (c >= 97 && c <= 122) return String.fromCharCode(((c - 97 + s) % 26) + 97)
  return ch
}

/** Caesar cipher: shift every letter by k places (use -k to decrypt). */
export function cesare(testo: string, k: number): string {
  let out = ''
  for (const ch of testo) out += spostaLettera(ch, k)
  return out
}

export interface PassoVigenere {
  car: string
  /** Key letter used for this character, or '' when the character is not a letter. */
  chiave: string
  /** Shift applied (0–25), or null when the character is not a letter. */
  spostamento: number | null
  risultato: string
}

/**
 * Vigenère cipher, step by step: the n-th letter of the message is shifted by the n-th letter of the key
 * (A = 0 … Z = 25, the key repeats). Non-letters are copied and do not use up a key letter.
 */
export function vigenere(testo: string, parola: string, decifra = false): PassoVigenere[] {
  const chiavi = [...parola.toUpperCase()].filter(ch => indiceLettera(ch) >= 0)
  const passi: PassoVigenere[] = []
  let j = 0
  for (const car of testo) {
    if (indiceLettera(car) < 0 || chiavi.length === 0) {
      passi.push({ car, chiave: '', spostamento: null, risultato: car })
      continue
    }
    const chiave = chiavi[j % chiavi.length]
    const spostamento = indiceLettera(chiave)
    passi.push({ car, chiave, spostamento, risultato: spostaLettera(car, decifra ? -spostamento : spostamento) })
    j++
  }
  return passi
}

// Approximate letter frequencies of Italian text (%). Letters that are rare in Italian get a small value.
const FREQ_IT = [
  11.74, 0.92, 4.5, 3.73, 11.79, 0.95, 1.64, 1.54, 11.28, 0.1, 0.1, 6.51, 2.51,
  6.88, 9.83, 3.05, 0.51, 6.37, 4.98, 5.62, 3.01, 2.1, 0.1, 0.1, 0.1, 0.49,
]

/** How far a text is from Italian letter frequencies (chi-squared): lower means "looks like Italian". */
export function distanzaDallItaliano(testo: string): number {
  const conta = new Array(26).fill(0)
  let n = 0
  for (const ch of testo) {
    const i = indiceLettera(ch)
    if (i >= 0) { conta[i]++; n++ }
  }
  if (n === 0) return Number.POSITIVE_INFINITY
  let chi = 0
  for (let i = 0; i < 26; i++) {
    const atteso = (FREQ_IT[i] / 100) * n
    chi += (conta[i] - atteso) ** 2 / atteso
  }
  return chi
}

/** The Caesar key (1–25) whose decryption looks most like Italian. */
export function chiaveProbabile(cifrato: string): number {
  let migliore = 1
  let minimo = Number.POSITIVE_INFINITY
  for (let k = 1; k < 26; k++) {
    const d = distanzaDallItaliano(cesare(cifrato, -k))
    if (d < minimo) { minimo = d; migliore = k }
  }
  return migliore
}
