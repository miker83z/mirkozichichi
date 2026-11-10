<!--
  Diagram (2025 deck, p. 41): the shared ledger as a chain of blocks B_i, B_i+1, B_i+2. Each block holds its
  transactions, a nonce, and the SHA-256 impronta of the previous block; an arrow goes from that impronta to
  the previous block (from B_i to B_i-1, off the left edge).
  The impronte are real: each block's content is the text
    "<name>\ntransazioni: <tx>\nnonce: <nonce>\nprev: <impronta of the previous block>"
  (B_i-1 has prev "…"), hashed with utils/crypto.ts and shortened. The nonces were chosen (smallest from 0) so
  that every impronta starts with "000", as in proof of work: change the text and they will not any more.
  Correct but simplified: Bitcoin hashes the 80-byte block header twice with SHA-256; the header holds the
  previous block's hash, the Merkle root of the transactions, a timestamp, the target and the nonce
  (Bitcoin whitepaper §3–4; developer.bitcoin.org/reference/block_chain.html#block-headers). The whitepaper,
  §4: "the work to change the block would include redoing all the blocks after it".
  4 clicks: B_i with its link to B_i-1; B_i+1 with its link; B_i+2 with its link; the caption
  "cambiare un blocco rompe tutti i collegamenti successivi".
  <SchemaBlocchiNonce />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const BX = [60, 345, 630] // left edge of each block
const W = 220
const TOP = 34
const BOT = 236

// name, subscript, transactions, nonce (B_i-1 is not drawn: it stands for the chain before).
const dati = [
  { pedice: 'i-1', tx: 'TX… precedenti', nonce: 6367 },
  { pedice: 'i', tx: 'TX1, TX2, TX3', nonce: 4943 },
  { pedice: 'i+1', tx: 'TX4, TX5, TX6', nonce: 2158 },
  { pedice: 'i+2', tx: 'TX7, TX8, TX9', nonce: 3115 },
]
const impronte: string[] = []
for (const b of dati) {
  const prev = impronte.length ? impronte[impronte.length - 1] : '…'
  impronte.push(sha256(`B_${b.pedice}\ntransazioni: ${b.tx}\nnonce: ${b.nonce}\nprev: ${prev}`))
}
const blocchi = dati.slice(1).map((b, i) => ({
  ...b,
  x: BX[i],
  prima: dati[i].pedice, // the previous block
  prev: short(impronte[i], 8, 6),
  elenco: b.tx.replaceAll(', ', ' · '),
}))
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: tre blocchi, ciascuno con transazioni, nonce e impronta SHA-256 del blocco precedente; ogni impronta punta al blocco precedente">
    <g v-for="(b, i) in blocchi" :key="b.pedice" v-click>
      <text :x="b.x + W / 2" y="24" text-anchor="middle" class="nome">B<tspan class="pedice">{{ b.pedice }}</tspan></text>
      <rect :x="b.x" :y="TOP" :width="W" :height="BOT - TOP" rx="4" class="blocco" />
      <!-- transactions -->
      <rect :x="b.x + 16" y="48" :width="W - 32" height="58" rx="4" class="campo" />
      <text :x="b.x + W / 2" y="72" text-anchor="middle" class="voce">Transazioni</text>
      <text :x="b.x + W / 2" y="94" text-anchor="middle" class="mono elenco">{{ b.elenco }}</text>
      <!-- nonce -->
      <rect :x="b.x + 16" y="116" :width="W - 32" height="32" rx="4" class="campo" />
      <text :x="b.x + W / 2" y="137" text-anchor="middle" class="voce">Nonce: <tspan class="mono">{{ b.nonce }}</tspan></text>
      <!-- impronta of the previous block -->
      <rect :x="b.x + 16" y="160" :width="W - 32" height="60" rx="4" class="impronta" />
      <text :x="b.x + W / 2" y="184" text-anchor="middle" class="voce">SHA-256(B<tspan class="pedice">{{ b.prima }}</tspan>)</text>
      <text :x="b.x + W / 2" y="207" text-anchor="middle" class="mono hex">{{ b.prev }}</text>
      <!-- link to the previous block -->
      <SvFreccia :x1="b.x + 16" :y1="176" :x2="i === 0 ? 6 : BX[i - 1] + W + 2" :y2="118" variante="rubrica" />
      <text v-if="i === 0" x="14" y="100" class="nota">B<tspan class="pedice">i-1</tspan></text>
    </g>
    <g v-click>
      <text x="440" y="268" text-anchor="middle" class="didascalia">cambiare un blocco rompe tutti i collegamenti successivi</text>
    </g>
  </svg>
</template>

<style scoped>
.blocco { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.campo { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.impronta { fill: color-mix(in srgb, var(--rubrica) 12%, var(--carta)); stroke: var(--rubrica); stroke-width: 2; }
.nome { font-size: 17px; font-weight: 700; }
.voce { font-size: 15px; }
.elenco { font-size: 13px; fill: var(--grigio); }
.hex { font-size: 14px; }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
