<!--
  Diagram (2024 deck, p. 77): chameleon hashing. Three linked blocks B_i-1 ← B_i ← B_i+1 (each block points to the
  previous one; the padlocks on the links are the impronte).
  4 clicks: (1) the original chain; (2) someone without the private key alters B_i: the link from B_i+1 breaks
  (orange, open padlock); (3) whoever holds the private key (the "botola", trapdoor) replaces B_i with B_i', which
  has the same chameleon hash: every link stays valid (green); (4) caption "modificabile solo da chi ha la chiave
  privata: utile per il diritto alla cancellazione, ma è un punto di fiducia".
  <SchemaCamaleonte />
-->
<script setup lang="ts">
const X = { prima: 290, centro: 470, dopo: 650 } // left edges of B_i-1, B_i, B_i+1
const W = 110
const BH = 48
const RIGHE = [14, 88, 162] // top of each row
const BLOCCHI = [{ x: X.prima, sub: 'i−1' }, { x: X.centro, sub: 'i' }, { x: X.dopo, sub: 'i+1' }]
const mid = (r: number) => RIGHE[r] + BH / 2
// links: from B_i+1 to B_i and from B_i to B_i-1, padlock in the middle
const LINK = [
  { x1: X.dopo, x2: X.centro + W + 2, lx: (X.dopo + X.centro + W) / 2 },
  { x1: X.centro, x2: X.prima + W + 2, lx: (X.centro + X.prima + W) / 2 },
]
</script>

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: hash camaleontico, solo chi ha la chiave privata può sostituire un blocco senza rompere la catena">
    <!-- 1: the original chain -->
    <g v-click>
      <text x="16" :y="mid(0) + 5" class="etichetta">catena originale</text>
      <text :x="X.prima - 22" :y="mid(0) + 5" text-anchor="middle" class="puntini">…</text>
      <g v-for="b in BLOCCHI" :key="b.sub">
        <SvRiquadro :x="b.x" :y="RIGHE[0]" :w="W" :h="BH" />
        <text :x="b.x + W / 2" :y="mid(0) + 6" text-anchor="middle" class="b">B<tspan class="pedice">{{ b.sub }}</tspan></text>
      </g>
      <text :x="X.dopo + W + 22" :y="mid(0) + 5" text-anchor="middle" class="puntini">…</text>
      <g v-for="(l, j) in LINK" :key="j">
        <SvFreccia :x1="l.x1" :y1="mid(0)" :x2="l.x2" :y2="mid(0)" />
        <SvLucchetto :x="l.lx - 14" :y="mid(0) - 11" />
      </g>
    </g>

    <!-- 2: without the private key -->
    <g v-click>
      <text x="16" :y="mid(1) - 4" class="etichetta">senza la chiave privata</text>
      <text x="16" :y="mid(1) + 15" class="nota">qualcuno altera B<tspan class="pedice">i</tspan></text>
      <text :x="X.prima - 22" :y="mid(1) + 5" text-anchor="middle" class="puntini">…</text>
      <g v-for="b in BLOCCHI" :key="b.sub">
        <SvRiquadro :x="b.x" :y="RIGHE[1]" :w="W" :h="BH" :variante="b.sub === 'i' ? 'ko' : 'campo'" />
        <text :x="b.x + W / 2" :y="mid(1) + 6" text-anchor="middle" class="b">B<tspan class="pedice">{{ b.sub }}</tspan><tspan v-if="b.sub === 'i'" class="alt"> alterato</tspan></text>
      </g>
      <text :x="X.dopo + W + 22" :y="mid(1) + 5" text-anchor="middle" class="puntini">…</text>
      <SvFreccia :x1="LINK[1].x1" :y1="mid(1)" :x2="LINK[1].x2" :y2="mid(1)" />
      <SvLucchetto :x="LINK[1].lx - 14" :y="mid(1) - 11" />
      <g class="rotto">
        <SvFreccia :x1="LINK[0].x1" :y1="mid(1)" :x2="LINK[0].x2" :y2="mid(1)" variante="ko" tratteggiata />
        <SvLucchetto :x="LINK[0].lx - 14" :y="mid(1) - 11" aperto />
        <text :x="LINK[0].lx" :y="mid(1) + 40" text-anchor="middle" class="ko-testo">✗ l'impronta non torna</text>
      </g>
    </g>

    <!-- 3: with the private key (trapdoor) -->
    <g v-click>
      <text x="16" :y="mid(2) - 4" class="etichetta">con la chiave privata</text>
      <SvChiave :x="28" :y="mid(2) + 14" tipo="privata" :scala="0.8" />
      <text x="72" :y="mid(2) + 19" class="nota">la "botola" (trapdoor)</text>
      <text :x="X.prima - 22" :y="mid(2) + 5" text-anchor="middle" class="puntini">…</text>
      <g v-for="b in BLOCCHI" :key="b.sub">
        <SvRiquadro :x="b.x" :y="RIGHE[2]" :w="W" :h="BH" :variante="b.sub === 'i' ? 'ok' : 'campo'" />
        <text :x="b.x + W / 2" :y="mid(2) + 6" text-anchor="middle" class="b">B<tspan v-if="b.sub === 'i'">′</tspan><tspan class="pedice">{{ b.sub }}</tspan></text>
      </g>
      <text :x="X.dopo + W + 22" :y="mid(2) + 5" text-anchor="middle" class="puntini">…</text>
      <g v-for="(l, j) in LINK" :key="j" class="valido">
        <SvFreccia :x1="l.x1" :y1="mid(2)" :x2="l.x2" :y2="mid(2)" variante="ok" />
        <SvLucchetto :x="l.lx - 14" :y="mid(2) - 11" />
      </g>
      <text :x="X.centro + W / 2" :y="RIGHE[2] + BH + 20" text-anchor="middle" class="ok-testo">✓ stessa impronta camaleontica</text>
    </g>

    <g v-click>
      <text x="440" y="258" text-anchor="middle" class="didascalia">modificabile solo da chi ha la chiave privata:</text>
      <text x="440" y="280" text-anchor="middle" class="didascalia-2">utile per il diritto alla cancellazione, ma è un punto di fiducia</text>
    </g>
  </svg>
</template>

<style scoped>
.etichetta { font-size: 15px; font-weight: 700; }
.b { font-size: 18px; font-family: var(--serif); font-style: italic; }
.alt { font-family: var(--sans); font-style: normal; font-size: 14px; font-weight: 700; fill: var(--ko); }
.puntini { font-size: 18px; fill: var(--grigio); }
.ko-testo { font-size: 13px; font-weight: 700; fill: var(--ko); }
.ok-testo { font-size: 14px; font-weight: 700; fill: var(--ok); }
.rotto :deep(.sv-lucchetto rect) { fill: var(--ko); }
.rotto :deep(.sv-lucchetto .arco) { stroke: var(--ko); }
.valido :deep(.sv-lucchetto rect) { fill: var(--ok); }
.valido :deep(.sv-lucchetto .arco) { stroke: var(--ok); }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
.didascalia-2 { font-size: 16px; }
</style>
