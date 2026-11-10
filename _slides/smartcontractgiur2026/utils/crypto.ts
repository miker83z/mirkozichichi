// Small helpers shared by the demos. Everything runs in the browser; nothing is sent anywhere.

const K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
])

const encoder = new TextEncoder()

/** SHA-256 (FIPS 180-4), synchronous so that demos like the mining puzzle can run many tries per frame. */
export function sha256Bytes(data: Uint8Array): Uint8Array {
  const bitLen = data.length * 8
  const padded = new Uint8Array(((data.length + 9 + 63) >> 6) << 6)
  padded.set(data)
  padded[data.length] = 0x80
  const view = new DataView(padded.buffer)
  view.setUint32(padded.length - 8, Math.floor(bitLen / 2 ** 32))
  view.setUint32(padded.length - 4, bitLen >>> 0)
  const h = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ])
  const w = new Uint32Array(64)
  for (let off = 0; off < padded.length; off += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(off + i * 4)
    for (let i = 16; i < 64; i++) {
      const a = w[i - 15], b = w[i - 2]
      const s0 = ((a >>> 7) | (a << 25)) ^ ((a >>> 18) | (a << 14)) ^ (a >>> 3)
      const s1 = ((b >>> 17) | (b << 15)) ^ ((b >>> 19) | (b << 13)) ^ (b >>> 10)
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0
    }
    let [a, b, c, d, e, f, g, hh] = h
    for (let i = 0; i < 64; i++) {
      const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7))
      const t1 = (hh + S1 + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0
      const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10))
      const t2 = (S0 + ((a & b) ^ (a & c) ^ (b & c))) | 0
      hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0
    }
    h[0] += a; h[1] += b; h[2] += c; h[3] += d; h[4] += e; h[5] += f; h[6] += g; h[7] += hh
  }
  const out = new Uint8Array(32)
  const ov = new DataView(out.buffer)
  h.forEach((v, i) => ov.setUint32(i * 4, v))
  return out
}

export function toHex(bytes: Uint8Array): string {
  let s = ''
  for (const b of bytes) s += b.toString(16).padStart(2, '0')
  return s
}

export function fromHex(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2)
  for (let i = 0; i < out.length; i++) out[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  return out
}

/** SHA-256 of a UTF-8 string, as 64 hex characters. */
export function sha256(text: string): string {
  return toHex(sha256Bytes(encoder.encode(text)))
}

export function utf8(text: string): Uint8Array {
  return encoder.encode(text)
}

/** Number of different bits between two hex strings of equal length. */
export function bitDiff(a: string, b: string): number {
  let n = 0
  for (let i = 0; i < a.length; i++) {
    let x = Number.parseInt(a[i], 16) ^ Number.parseInt(b[i], 16)
    while (x) { n += x & 1; x >>= 1 }
  }
  return n
}

export function randomHex(bytes: number): string {
  return toHex(crypto.getRandomValues(new Uint8Array(bytes)))
}

/** Shortens a long hex string for display: "a1b2c3…e5f6". */
export function short(hex: string, head = 8, tail = 6): string {
  return hex.length <= head + tail + 1 ? hex : `${hex.slice(0, head)}…${hex.slice(-tail)}`
}

export function bufToHex(buf: ArrayBuffer): string {
  return toHex(new Uint8Array(buf))
}

/** Formats big numbers the Italian way: 1,2 × 10^16 (or plain digits when small). */
export function scientific(x: number, digits = 2): string {
  if (!Number.isFinite(x)) return '∞'
  if (Math.abs(x) < 1e6) return Math.round(x).toLocaleString('it-IT')
  const exp = Math.floor(Math.log10(x))
  const mant = x / 10 ** exp
  return `${mant.toFixed(digits).replace('.', ',')} × 10^${exp}`
}

/** Human-readable duration in Italian for a number of seconds. */
export function durata(seconds: number): string {
  if (!Number.isFinite(seconds)) return 'per sempre'
  if (seconds < 1) return 'istantaneo'
  const minute = 60, hour = 3600, day = 86400, year = 365.25 * day
  if (seconds < minute) return `${Math.round(seconds)} secondi`
  if (seconds < hour) return `${(seconds / minute).toFixed(1).replace('.', ',')} minuti`
  if (seconds < day) return `${(seconds / hour).toFixed(1).replace('.', ',')} ore`
  if (seconds < year) return `${(seconds / day).toFixed(1).replace('.', ',')} giorni`
  const years = seconds / year
  if (years < 1e6) return `${Math.round(years).toLocaleString('it-IT')} anni`
  return `${scientific(years)} anni`
}
