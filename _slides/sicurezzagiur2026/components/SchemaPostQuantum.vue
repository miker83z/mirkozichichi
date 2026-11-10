<!--
  Diagram (new, for the post-quantum slide after 2024 deck p. 40): timeline of the transition to post-quantum
  cryptography (dates from VERIFICA.md / verifica/A, rows 40):
  1994 Shor's algorithm; 13/8/2024 first NIST post-quantum standards (FIPS 203, 204, 205); June 2025 EU coordinated
  roadmap; end of 2026 national plans in every EU member state; end of 2030 RSA and ECC deprecated (NIST IR 8547)
  and high-risk uses migrated (EU); end of 2035 RSA and ECC disallowed (NIST) and medium-risk uses migrated (EU).
  The axis is to scale from 2024 on (1994 sits before a break); "oggi" marks November 2026.
  6 clicks, one per milestone (the axis and "oggi" come with the first).
  <SchemaPostQuantum />
-->
<script setup lang="ts">
const AY = 150
const X2024 = 160
const PX_ANNO = 53
const xa = (anno: number) => X2024 + (anno - 2024) * PX_ANNO

type Tappa = { x: number, righe: string[], sopra: boolean, fila: number, fine?: boolean, scadenza?: boolean }
const tappe: Tappa[] = [
  { x: 50, righe: ['1994', 'algoritmo di Shor'], sopra: true, fila: 0 },
  { x: xa(2024.62), righe: ['13 ago 2024', 'primi standard NIST', 'post-quantistici'], sopra: false, fila: 1 },
  { x: xa(2025.46), righe: ['giu 2025', 'tabella di marcia UE'], sopra: true, fila: 1 },
  { x: xa(2027), righe: ['fine 2026', 'piani nazionali UE'], sopra: true, fila: 0 },
  { x: xa(2031), righe: ['2030', 'RSA ed ECC deprecati (NIST)', 'alto rischio migrato (UE)'], sopra: false, fila: 0, scadenza: true },
  { x: xa(2036), righe: ['2035', 'RSA ed ECC non più ammessi (NIST)', 'rischio medio migrato (UE)'], sopra: true, fila: 0, fine: true, scadenza: true },
]

// Text block geometry: row 0 is close to the axis, row 1 further away.
const ALTEZZA_RIGA = 18
function testo(t: Tappa) {
  const n = t.righe.length
  const yPrima = t.sopra
    ? AY - 32 - (t.fila ? 64 : 0) - (n - 1) * ALTEZZA_RIGA
    : AY + 28 + (t.fila ? 36 : 0)
  return {
    righe: t.righe.map((r, i) => ({ r, y: yPrima + i * ALTEZZA_RIGA })),
    gambo: t.sopra ? yPrima - 16 : yPrima + (n - 1) * ALTEZZA_RIGA + 4,
    xTesto: t.fine ? t.x - 7 : t.x + 7,
    anchor: t.fine ? 'end' : 'start',
  }
}
const blocchi = tappe.map(t => ({ ...t, ...testo(t) }))
const anni = Array.from({ length: 13 }, (_, i) => xa(2024 + i))
const OGGI = xa(2026.86)
</script>

<template>
  <svg viewBox="0 0 880 262" class="schema" role="img" aria-label="Linea del tempo della crittografia post-quantistica: 1994 Shor, 2024 standard NIST, 2025 tabella di marcia UE, fine 2026 piani nazionali, 2030 RSA ed ECC deprecati, 2035 non più ammessi">
    <template v-for="(b, i) in blocchi" :key="i">
      <g v-click>
        <template v-if="i === 0">
          <line x1="24" :y1="AY" x2="110" :y2="AY" class="asse" />
          <path :d="`M112,${AY + 9} l8,-18 M120,${AY + 9} l8,-18`" class="asse" />
          <line x1="130" :y1="AY" x2="848" :y2="AY" class="asse" />
          <polygon :points="`858,${AY} 846,${AY - 6} 846,${AY + 6}`" class="punta" />
          <line v-for="x in anni" :key="x" :x1="x" :y1="AY - 4" :x2="x" :y2="AY + 4" class="tacca" />
          <polygon :points="`${OGGI},${AY + 4} ${OGGI - 7},${AY + 16} ${OGGI + 7},${AY + 16}`" class="oggi" />
          <text :x="OGGI" :y="AY + 33" text-anchor="middle" class="testo-oggi">oggi</text>
        </template>
        <line :x1="b.x" :y1="AY" :x2="b.x" :y2="b.gambo" class="gambo" />
        <circle :cx="b.x" :cy="AY" r="6" :class="['tappa', { scadenza: b.scadenza }]" />
        <text v-for="(r, j) in b.righe" :key="j" :x="b.xTesto" :y="r.y" :text-anchor="b.anchor" :class="j === 0 ? 'data' : 'evento'">{{ r.r }}</text>
      </g>
    </template>
  </svg>
</template>

<style scoped>
.asse {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 2;
}
.punta {
  fill: var(--inchiostro);
}
.tacca {
  stroke: var(--grigio);
  stroke-width: 1.2;
}
.gambo {
  stroke: var(--linea);
  stroke-width: 1.5;
}
.tappa {
  fill: var(--carta);
  stroke: var(--inchiostro);
  stroke-width: 2.5;
}
.tappa.scadenza {
  fill: var(--rubrica);
  stroke: var(--rubrica);
}
.data {
  font-weight: 700;
  font-size: 16px;
  fill: var(--rubrica);
}
.evento {
  font-size: 15px;
}
.oggi {
  fill: var(--ko);
}
.testo-oggi {
  font-weight: 700;
  font-size: 15px;
  fill: var(--ko);
}
</style>
