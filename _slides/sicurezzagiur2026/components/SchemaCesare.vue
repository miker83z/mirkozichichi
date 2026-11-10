<!--
  Diagram (2024 deck, p. 30): Caesar's cipher with K = 3, on the whole alphabet.
  Top row: the plaintext letters (with X Y Z repeated in grey on the left, as in the original, to show the
  wrap-around); bottom row: the same alphabet; each arrow goes from a letter to the one K = 3 places later.
  5 clicks: the top row, the arrow A → D (K = 3), all the other arrows (with the wrap-around X → A, Y → B, Z → C),
  the bottom row, the example ROMA → URPD (computed, not typed).
  <SchemaCesare />
-->
<script setup lang="ts">
const LETTERE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const K = 3
const X0 = 5
const PASSO = 30
const CELLA = 28
const YA = 26
const YB = 178
const HC = 34

// Slot 0–2: the grey X Y Z on the left; slot 3–28: A–Z.
const sx = (s: number) => X0 + PASSO * s + (PASSO - CELLA) / 2
const cx = (s: number) => X0 + PASSO * s + PASSO / 2
const slot = (l: string) => LETTERE.indexOf(l) + 3

const sopra = LETTERE.map(l => ({ l, s: slot(l) }))
const sotto = LETTERE.filter(l => l !== 'D').map(l => ({ l, s: slot(l) }))
const fantasmi = ['X', 'Y', 'Z'].map((l, i) => ({ l, s: i }))
// Arrows from every letter that stays inside the row (B…W; A has its own red arrow in click 2).
const frecce = LETTERE.slice(1, 26 - K).map(l => slot(l))

const cifra = (c: string) => LETTERE[(LETTERE.indexOf(c) + K) % 26]
const CHIARO = 'ROMA'
const CIFRATO = [...CHIARO].map(cifra).join('')
const esempio = [...CHIARO].filter(l => l !== 'A').map(l => ({ da: l, a: cifra(l) }))
</script>

<template>
  <svg viewBox="0 0 880 268" class="schema" role="img" aria-label="Schema del cifrario di Cesare con chiave 3: ogni lettera è sostituita da quella tre posizioni dopo; ROMA diventa URPD">
    <g v-click="1">
      <text :x="sx(3)" y="18" class="nota">lettera in chiaro</text>
      <g v-for="c in sopra" :key="`a${c.l}`">
        <rect :x="sx(c.s)" :y="YA" :width="CELLA" :height="HC" rx="2" class="cella" />
        <text :x="cx(c.s)" :y="YA + 23" text-anchor="middle" class="lettera">{{ c.l }}</text>
      </g>
    </g>
    <g v-click="2">
      <rect :x="sx(3)" :y="YA" :width="CELLA" :height="HC" rx="2" class="cella evidenza" />
      <text :x="cx(3)" :y="YA + 23" text-anchor="middle" class="lettera rossa">A</text>
      <SvFreccia :x1="cx(3)" :y1="YA + HC + 3" :x2="cx(3 + K)" :y2="YB - 3" variante="rubrica" />
      <rect :x="sx(3 + K)" :y="YB" :width="CELLA" :height="HC" rx="2" class="cella evidenza" />
      <text :x="cx(3 + K)" :y="YB + 23" text-anchor="middle" class="lettera rossa">D</text>
    </g>
    <g v-click="3">
      <SvFreccia v-for="s in frecce" :key="`f${s}`" :x1="cx(s)" :y1="YA + HC + 3" :x2="cx(s + K)" :y2="YB - 3" variante="grigio" />
      <g v-for="c in fantasmi" :key="`x${c.l}`">
        <rect :x="sx(c.s)" :y="YA" :width="CELLA" :height="HC" rx="2" class="cella fantasma" />
        <text :x="cx(c.s)" :y="YA + 23" text-anchor="middle" class="lettera grigia">{{ c.l }}</text>
        <SvFreccia :x1="cx(c.s)" :y1="YA + HC + 3" :x2="cx(c.s + K)" :y2="YB - 3" variante="grigio" tratteggiata />
      </g>
      <text x="8" y="196" class="nota">dopo la Z</text>
      <text x="8" y="212" class="nota">si ricomincia</text>
    </g>
    <g v-click="4">
      <g v-for="c in sotto" :key="`b${c.l}`">
        <rect :x="sx(c.s)" :y="YB" :width="CELLA" :height="HC" rx="2" class="cella" />
        <text :x="cx(c.s)" :y="YB + 23" text-anchor="middle" class="lettera">{{ c.l }}</text>
      </g>
      <text :x="sx(3)" :y="YB + HC + 18" class="nota">lettera cifrata</text>
    </g>
    <g v-click="5">
      <g v-for="e in esempio" :key="`e${e.da}`">
        <SvFreccia :x1="cx(slot(e.da))" :y1="YA + HC + 3" :x2="cx(slot(e.a))" :y2="YB - 3" variante="rubrica" />
        <rect :x="sx(slot(e.da))" :y="YA" :width="CELLA" :height="HC" rx="2" class="cella evidenza" />
        <text :x="cx(slot(e.da))" :y="YA + 23" text-anchor="middle" class="lettera rossa">{{ e.da }}</text>
        <rect :x="sx(slot(e.a))" :y="YB" :width="CELLA" :height="HC" rx="2" class="cella evidenza" />
        <text :x="cx(slot(e.a))" :y="YB + 23" text-anchor="middle" class="lettera rossa">{{ e.a }}</text>
      </g>
      <text x="440" y="258" text-anchor="middle" class="esempio">{{ CHIARO }} → {{ CIFRATO }}</text>
    </g>
    <!-- Drawn last so that the grey arrows of click 3 do not cover it. -->
    <g v-click="2">
      <text :x="cx(3) + 54" :y="(YA + YB) / 2 + 10" class="chiave">K = 3</text>
    </g>
  </svg>
</template>

<style scoped>
.cella {
  fill: var(--carta);
  stroke: var(--inchiostro);
  stroke-width: 1.4;
}
.cella.evidenza {
  fill: #fbeeee;
  stroke: var(--rubrica);
  stroke-width: 2;
}
.cella.fantasma {
  fill: none;
  stroke: var(--grigio);
  stroke-dasharray: 4 3;
}
.lettera {
  font-family: var(--mono);
  font-weight: 700;
  font-size: 17px;
}
.lettera.rossa {
  fill: var(--rubrica);
}
.lettera.grigia {
  fill: var(--grigio);
}
.chiave {
  font-weight: 700;
  font-size: 19px;
  fill: var(--rubrica);
  paint-order: stroke;
  stroke: var(--carta);
  stroke-width: 6px;
}
.esempio {
  font-family: var(--mono);
  font-weight: 700;
  font-size: 22px;
  fill: var(--rubrica);
}
</style>
