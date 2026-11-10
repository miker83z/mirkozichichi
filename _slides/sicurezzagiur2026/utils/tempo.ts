// Time helpers for the demos: ISO 8601 in UTC and in Italian time, base32 and TOTP (RFC 6238).

/** The fixed instant that time-based demos show in the PDF. */
export const ISTANTE_STAMPA = Date.UTC(2026, 10, 15, 10, 0, 0)

/** "2026-11-15T10:00:00Z": ISO 8601 in UTC, to the second. */
export function isoUtc(ms: number): string {
  return new Date(Math.floor(ms / 1000) * 1000).toISOString().replace('.000Z', 'Z')
}

const romaParti = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Rome',
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

/** Offset of Italian time from UTC at that instant, in minutes: 60 in winter, 120 in summer. */
export function offsetRoma(ms: number): number {
  const p: Record<string, string> = {}
  for (const x of romaParti.formatToParts(ms)) p[x.type] = x.value
  const muro = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second)
  return Math.round((muro - Math.floor(ms / 1000) * 1000) / 60000)
}

/** "2026-11-15T11:00:00+01:00": ISO 8601 in Italian time, with its offset. */
export function isoRoma(ms: number): string {
  const off = offsetRoma(ms)
  const a = Math.abs(off)
  const hh = String(Math.floor(a / 60)).padStart(2, '0')
  const mm = String(a % 60).padStart(2, '0')
  return `${isoUtc(ms + off * 60000).slice(0, -1)}${off < 0 ? '-' : '+'}${hh}:${mm}`
}

/** Instant (ms) of an Italian wall-clock time such as "2026-11-15T11:00" (from <input type="datetime-local">). */
export function daOraRoma(testo: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(testo)
  if (!m) return null
  const muro = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] ?? 0))
  const prova = muro - offsetRoma(muro) * 60000
  return muro - offsetRoma(prova) * 60000
}

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

/** Base32 (RFC 4648), without padding: the format of the secrets in authenticator apps. */
export function base32(bytes: Uint8Array): string {
  let bits = 0, valore = 0, out = ''
  for (const b of bytes) {
    valore = (valore << 8) | b
    bits += 8
    while (bits >= 5) {
      out += B32[(valore >>> (bits - 5)) & 31]
      bits -= 5
    }
  }
  if (bits > 0) out += B32[(valore << (5 - bits)) & 31]
  return out
}

/** Inverse of `base32`; ignores spaces, padding and case. */
export function daBase32(testo: string): Uint8Array {
  const pulito = testo.toUpperCase().replace(/[\s=-]/g, '')
  const out: number[] = []
  let bits = 0, valore = 0
  for (const c of pulito) {
    const v = B32.indexOf(c)
    if (v < 0) continue
    valore = ((valore << 5) | v) & 0xffff
    bits += 5
    if (bits >= 8) {
      out.push((valore >>> (bits - 8)) & 255)
      bits -= 8
    }
  }
  return new Uint8Array(out)
}

/** HOTP (RFC 4226): HMAC-SHA1 of the counter, truncated to a number of decimal digits. */
export async function hotp(segreto: Uint8Array, contatore: number, cifre = 6): Promise<string> {
  const chiave = await crypto.subtle.importKey('raw', segreto, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign'])
  const msg = new Uint8Array(8)
  new DataView(msg.buffer).setBigUint64(0, BigInt(contatore))
  const h = new Uint8Array(await crypto.subtle.sign('HMAC', chiave, msg))
  const o = h[h.length - 1] & 0x0f
  const n = ((h[o] & 0x7f) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3]
  return String(n % 10 ** cifre).padStart(cifre, '0')
}

/** TOTP (RFC 6238): HOTP of the number of 30-second steps since 1 January 1970. */
export function totp(segreto: Uint8Array, secondiUnix: number, cifre = 6, passo = 30): Promise<string> {
  return hotp(segreto, Math.floor(secondiUnix / passo), cifre)
}
