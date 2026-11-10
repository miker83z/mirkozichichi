<!--
  Diagram (new): how a seed phrase is made and what it generates (BIP-39, then BIP-32), with the official
  BIP-39 test vector: entropy 00…00 (128 zero bits).
  128 random bits (entropy) + 4 checksum bits = the first 4 bits of SHA-256(entropy) (computed here:
  SHA-256 of 16 zero bytes = 3747…, so 0011) = 132 bits, cut into 12 groups of 11 bits; each group is a
  number from 0 to 2047, the position of a word in the list of 2048 = 2^11 words: 0 → "abandon" eleven
  times, and the last group 00000000011 = 3 → "about" (English list). 24 words = 256 bits + 8 checksum
  bits. The words (+ an optional passphrase) go through PBKDF2 (HMAC-SHA512, 2048 iterations) and give a
  512-bit seed (here without passphrase: 5eb00bbd…; with passphrase "TREZOR" it is the official vector
  c55257c3…; both recomputed with Node's crypto.pbkdf2Sync). From the seed, BIP-32 derives a tree of keys
  (HD wallet): one seed, many accounts and addresses.
  Sources: BIP-39 (github.com/bitcoin/bips/blob/master/bip-0039.mediawiki): "allowed size of ENT is
  128-256 bits", checksum "first ENT / 32 bits of its SHA256 hash", "groups of 11 bits, each encoding a
  number from 0-2047, serving as an index into a wordlist", table ENT 128 → 12 words, 256 → 24; PBKDF2 with
  salt "mnemonic" + passphrase, 2048 iterations, HMAC-SHA512, 512 bits. English list bip-0039/english.txt
  (abandon = 0, about = 3). Test vectors: github.com/trezor/python-mnemonic/blob/master/vectors.json.
  BIP-32: "a system for deriving a tree of keypairs from a single seed".
  Prop italiano: shows the official Italian list instead (abaco … abete, as in <SeedPhrase />).
  5 clicks: entropy; checksum; groups → words; seed; key tree.
  <SchemaSeed />
-->
<script setup lang="ts">
import { sha256Bytes, toHex, short } from '../utils/crypto'

const props = withDefaults(defineProps<{ italiano?: boolean }>(), { italiano: false })

const X0 = 20
const BIT = 840 / 132 // px per bit
const G = 11 * BIT // px per group of 11 bits (70)
const FINE_ENT = X0 + 128 * BIT

const impronta = toHex(sha256Bytes(new Uint8Array(16))) // SHA-256 of the 128 zero bits
const controllo = parseInt(impronta[0], 16).toString(2).padStart(4, '0')
const ultimo = parseInt(`0000000${controllo}`, 2) // the last group: 7 zero bits + checksum
const lista = props.italiano ? ['abaco', 'abbaglio', 'abbinato', 'abete'] : ['abandon', 'ability', 'able', 'about']
const parole = Array.from({ length: 12 }, (_, i) => (i < 11 ? { n: 0, p: lista[0] } : { n: ultimo, p: lista[ultimo] }))
// PBKDF2-HMAC-SHA512(parole, "mnemonic", 2048 giri), without passphrase; recomputed with Node's crypto.
const seme = short(props.italiano
  ? '9c010f0a2aeb286c2f3d1750795677697c4c350cc1b8539f54655b5ebdf42a5b9726ba0092b6579e792e8118f53a62b0d74fc878dff2c96dd2549df86810b61c'
  : '5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4', 8, 6)
const indirizzi = [152, 178, 224, 250]
</script>

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: 128 bit casuali più 4 bit di controllo formano 12 parole; le parole danno il seme e il seme un albero di chiavi">
    <!-- 1. Entropia: 128 bit casuali -->
    <g v-click>
      <text :x="X0" y="22" class="forte">128 bit casuali (entropia) <tspan class="nota">· nell'esempio ufficiale tutti 0</tspan></text>
      <rect :x="X0" y="30" :width="FINE_ENT - X0" height="28" class="barra" />
      <line v-for="b in 127" :key="b" :x1="X0 + b * BIT" :x2="X0 + b * BIT" y1="31" y2="57" class="bit" />
    </g>

    <!-- 2. Controllo: i primi 4 bit di SHA-256 dell'entropia -->
    <g v-click>
      <rect :x="FINE_ENT" y="30" :width="X0 + 132 * BIT - FINE_ENT" height="28" class="controllo" />
      <line v-for="b in 3" :key="b" :x1="FINE_ENT + b * BIT" :x2="FINE_ENT + b * BIT" y1="31" y2="57" class="bit" />
      <text x="860" y="22" text-anchor="end" class="rosso">+ 4 bit di controllo: SHA-256(entropia) = <tspan class="mono">{{ impronta.slice(0, 4) }}…</tspan> → <tspan class="mono forte">{{ controllo }}</tspan></text>
    </g>

    <!-- 3. 12 gruppi di 11 bit → 12 parole -->
    <g v-click>
      <line v-for="k in 11" :key="k" :x1="X0 + k * G" :x2="X0 + k * G" y1="30" y2="58" class="taglio" />
      <g v-for="(w, i) in parole" :key="i">
        <text :x="X0 + (i + 0.5) * G" y="76" text-anchor="middle" class="nota">{{ w.n }}</text>
        <text :x="X0 + (i + 0.5) * G" y="95" text-anchor="middle" :class="['parola', { rosso: i === 11 }]">{{ w.p }}</text>
      </g>
      <text :x="X0 + 11.5 * G" y="113" text-anchor="middle" class="mono rosso piccola">…{{ controllo }} = {{ ultimo }}</text>
      <text :x="X0" y="122" class="testo">ogni gruppo di 11 bit è un numero da 0 a 2047: la posizione della parola in una lista di 2048 (2¹¹)</text>
      <text :x="X0" y="140" class="nota">12 parole = 128 bit · 24 parole = 256 bit (+ 8 di controllo){{ italiano ? ' · lista italiana' : ' · lista inglese' }}</text>
    </g>

    <!-- 4. Dalle parole al seme -->
    <g v-click>
      <SvFreccia :x1="100" :y1="148" :x2="100" :y2="174" />
      <SvRiquadro :x="20" :y="176" :w="170" :h="50" testo="12 parole\n+ passphrase" variante="vuoto" />
      <text x="105" y="244" text-anchor="middle" class="nota">(passphrase facoltativa)</text>
      <SvFreccia :x1="192" :y1="201" :x2="218" :y2="201" />
      <SvRiquadro :x="220" :y="176" :w="150" :h="50" testo="PBKDF2\n2048 giri di hash" />
      <SvFreccia :x1="372" :y1="201" :x2="398" :y2="201" />
      <rect x="400" y="176" width="150" height="50" rx="6" class="seme" />
      <text x="475" y="196" text-anchor="middle" class="testo forte">seme (512 bit)</text>
      <text x="475" y="216" text-anchor="middle" class="mono piccola">{{ seme }}</text>
      <text x="475" y="244" text-anchor="middle" class="nota">(senza passphrase)</text>
    </g>

    <!-- 5. Dal seme, un albero di chiavi (BIP-32) -->
    <g v-click>
      <SvFreccia :x1="552" :y1="201" :x2="578" :y2="201" variante="rubrica" />
      <SvRiquadro :x="580" :y="185" :w="100" :h="32" testo="chiave madre" variante="rubrica" piccolo />
      <path d="M680,201 H692 V165 H705 M692,201 V237 H705" class="ramo" />
      <SvRiquadro :x="705" :y="153" :w="72" :h="24" testo="conto 1" piccolo />
      <SvRiquadro :x="705" :y="225" :w="72" :h="24" testo="conto 2" piccolo />
      <path d="M777,165 H788 V152 H800 M788,165 V178 H800 M777,237 H788 V224 H800 M788,237 V250 H800" class="ramo" />
      <SvRiquadro v-for="(iy, i) in indirizzi" :key="iy" :x="800" :y="iy - 10" :w="76" :h="20" :testo="`indirizzo ${i % 2 + 1}`" variante="vuoto" piccolo />
      <text x="728" y="282" text-anchor="middle" class="nota">un seme → tante chiavi (portafoglio HD, BIP-32)</text>
    </g>
  </svg>
</template>

<style scoped>
.forte { font-size: 15px; font-weight: 700; }
.forte .nota { font-weight: 400; }
.testo { font-size: 14px; }
.barra { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.4; }
.controllo { fill: color-mix(in srgb, var(--rubrica) 45%, var(--carta)); stroke: var(--rubrica); stroke-width: 1.4; }
.bit { stroke: var(--linea); stroke-width: 0.8; }
.taglio { stroke: var(--inchiostro); stroke-width: 1.4; }
.parola { font-size: 14px; }
.schema .rosso { fill: var(--rubrica); font-size: 14px; }
.schema .parola.rosso { font-weight: 700; }
.piccola { font-size: 13px; }
.seme { fill: color-mix(in srgb, var(--ok) 14%, var(--carta)); stroke: var(--ok); stroke-width: 1.5; }
.ramo { fill: none; stroke: var(--inchiostro); stroke-width: 1.4; }
</style>
