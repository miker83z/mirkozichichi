// Web Crypto helpers for the signature and authentication demos (ECDSA P-256, AES-GCM).
// Keys are created in the browser and never leave it.

import { bufToHex, fromHex, toHex, utf8 } from './crypto'

const CURVA = { name: 'ECDSA', namedCurve: 'P-256' } as const
// With ECDSA, Web Crypto hashes the message itself (SHA-256 here) before signing it.
const FIRMA = { name: 'ECDSA', hash: 'SHA-256' } as const

/** A fresh ECDSA P-256 key pair (extractable, so that the demos can show it). */
export function nuoveChiavi(): Promise<CryptoKeyPair> {
  return crypto.subtle.generateKey(CURVA, true, ['sign', 'verify']) as Promise<CryptoKeyPair>
}

/** ECDSA P-256 signature (r‖s, 64 bytes) of a UTF-8 text, as hex. */
export async function firma(privata: CryptoKey, testo: string): Promise<string> {
  return bufToHex(await crypto.subtle.sign(FIRMA, privata, utf8(testo)))
}

/** True when the signature matches the text and the public key. */
export async function verifica(pubblica: CryptoKey, testo: string, firmaHex: string): Promise<boolean> {
  try {
    return await crypto.subtle.verify(FIRMA, pubblica, fromHex(firmaHex), utf8(testo))
  }
  catch {
    return false
  }
}

/** Public key in raw uncompressed form (04‖x‖y, 65 bytes), as hex. */
export async function pubblicaHex(pubblica: CryptoKey): Promise<string> {
  return bufToHex(await crypto.subtle.exportKey('raw', pubblica))
}

/** The private number d (32 bytes), as hex. For teaching only: real software never shows it. */
export async function privataHex(privata: CryptoKey): Promise<string> {
  const jwk = await crypto.subtle.exportKey('jwk', privata)
  const b64 = (jwk.d ?? '').replace(/-/g, '+').replace(/_/g, '/')
  return toHex(Uint8Array.from(atob(b64), c => c.charCodeAt(0)))
}

/** A fresh AES-GCM secret key (128 bit). */
export function nuovaChiaveSegreta(): Promise<CryptoKey> {
  return crypto.subtle.generateKey({ name: 'AES-GCM', length: 128 }, false, ['encrypt', 'decrypt']) as Promise<CryptoKey>
}

/** AES-GCM encryption of a text: random 12-byte IV followed by ciphertext and tag, as hex. */
export async function cifra(chiave: CryptoKey, testo: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const c = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, chiave, utf8(testo))
  return toHex(iv) + bufToHex(c)
}

/** Inverse of `cifra`; null when the key is wrong or the ciphertext was altered. */
export async function decifra(chiave: CryptoKey, hex: string): Promise<string | null> {
  try {
    const dati = fromHex(hex)
    const p = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: dati.slice(0, 12) }, chiave, dati.slice(12))
    return new TextDecoder().decode(p)
  }
  catch {
    return null
  }
}
