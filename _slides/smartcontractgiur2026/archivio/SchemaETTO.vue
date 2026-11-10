<!--
  Diagram (new, for 2024 deck p. 19): Hollnagel's ETTO principle (Efficiency-Thoroughness Trade-Off) as a balance
  with "efficienza" on one pan and "scrupolosità" on the other. Three balances side by side, so that the PDF
  shows all three states: in balance; pressure on productivity pushes efficiency down and thoroughness up
  (less thoroughness); pressure on safety does the opposite (less efficiency).
  3 clicks: the balance, pressure on productivity, pressure on security.
  <SchemaETTO />
-->
<script setup lang="ts">
const PY = 84
const L = 94

function bilancia(cx: number, gradi: number, spinta: '' | 'sinistra' | 'destra') {
  const a = (gradi * Math.PI) / 180
  const sx = { x: cx - L * Math.cos(a), y: PY + L * Math.sin(a) }
  const dx = { x: cx + L * Math.cos(a), y: PY - L * Math.sin(a) }
  const piatto = (e: { x: number, y: number }) => ({
    fili: `M${e.x},${e.y} L${e.x - 30},${e.y + 38} M${e.x},${e.y} L${e.x + 30},${e.y + 38}`,
    coppa: `M${e.x - 36},${e.y + 38} Q${e.x},${e.y + 62} ${e.x + 36},${e.y + 38} Z`,
    x: e.x,
    yTesto: e.y + 74,
  })
  const lato = spinta === 'sinistra' ? sx : spinta === 'destra' ? dx : null
  return {
    cx,
    trave: `M${sx.x},${sx.y} L${dx.x},${dx.y}`,
    sinistra: piatto(sx),
    destra: piatto(dx),
    spinta: lato ? { x: lato.x, y2: lato.y - 10 } : null,
  }
}

const bilance = [
  { ...bilancia(147, 0, ''), righe: ['non si possono avere', 'entrambe al massimo'] },
  { ...bilancia(440, 13, 'sinistra'), righe: ['pressione sulla produttività', '→ meno scrupolosità'] },
  { ...bilancia(733, -13, 'destra'), righe: ['pressione sulla sicurezza', '→ meno efficienza'] },
]
</script>

<template>
  <svg viewBox="0 0 880 244" class="schema" role="img" aria-label="Schema: bilancia tra efficienza e scrupolosità; la pressione sulla produttività riduce la scrupolosità, quella sulla sicurezza riduce l'efficienza">
    <g v-for="b in bilance" :key="b.cx" v-click>
      <path :d="`M${b.cx - 44},206 L${b.cx + 44},206 L${b.cx + 28},194 L${b.cx - 28},194 Z`" class="base" />
      <line :x1="b.cx" :y1="PY" :x2="b.cx" :y2="194" class="asta" />
      <path :d="b.trave" class="trave" />
      <circle :cx="b.cx" :cy="PY" r="5.5" class="perno" />
      <path :d="b.sinistra.fili" class="filo" />
      <path :d="b.sinistra.coppa" class="coppa" />
      <path :d="b.destra.fili" class="filo" />
      <path :d="b.destra.coppa" class="coppa" />
      <text :x="b.sinistra.x" :y="b.sinistra.yTesto" text-anchor="middle" class="piatto">efficienza</text>
      <text :x="b.destra.x" :y="b.destra.yTesto" text-anchor="middle" class="piatto">scrupolosità</text>
      <SvFreccia v-if="b.spinta" :x1="b.spinta.x" :y1="10" :x2="b.spinta.x" :y2="b.spinta.y2" variante="rubrica" />
      <text :x="b.cx" y="222" text-anchor="middle" class="riga1">{{ b.righe[0] }}</text>
      <text :x="b.cx" y="240" text-anchor="middle" class="riga2">{{ b.righe[1] }}</text>
    </g>
  </svg>
</template>

<style scoped>
.base {
  fill: var(--campo);
  stroke: var(--inchiostro);
  stroke-width: 1.6;
}
.asta {
  stroke: var(--inchiostro);
  stroke-width: 3;
}
.trave {
  stroke: var(--inchiostro);
  stroke-width: 5;
  stroke-linecap: round;
}
.perno {
  fill: var(--carta);
  stroke: var(--inchiostro);
  stroke-width: 2;
}
.filo {
  fill: none;
  stroke: var(--grigio);
  stroke-width: 1.3;
}
.coppa {
  fill: var(--campo);
  stroke: var(--inchiostro);
  stroke-width: 1.8;
}
.piatto {
  font-weight: 700;
  font-size: 15px;
}
.riga1 {
  font-weight: 700;
  font-size: 15px;
}
.riga2 {
  font-size: 15px;
  fill: var(--rubrica);
}
</style>
