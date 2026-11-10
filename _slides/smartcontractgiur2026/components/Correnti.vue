<!--
  Background of the cover and of the section dividers, after the 2025 deck: thin blue and teal
  lines flowing across a black field, with a few points of light. Drawn from a seed, so every
  export of the PDF looks the same.

  <Correnti />                 lines (cover, dividers)
  <Correnti tipo="punti" />    a drift of blue dots (closing slide)

  Props: tipo?: 'linee' | 'punti', seme?: number
-->
<script setup lang="ts">
const props = withDefaults(defineProps<{ tipo?: 'linee' | 'punti', seme?: number }>(), { tipo: 'linee', seme: 7 })

// Small deterministic generator (mulberry32).
function generatore(seme: number) {
  let a = seme >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const caso = generatore(props.seme)

const W = 980
const H = 552

// Lines: one current that enters bottom-left and leaves top-right, fanned out into strands.
const linee = Array.from({ length: 46 }, (_, i) => {
  const f = i / 45
  const y0 = H * (0.55 + 0.5 * f) + (caso() - 0.5) * 40
  const y3 = H * (-0.15 + 0.55 * f) + (caso() - 0.5) * 40
  const c1 = { x: W * (0.25 + caso() * 0.15), y: H * (0.2 + caso() * 0.6) }
  const c2 = { x: W * (0.55 + caso() * 0.2), y: H * (0.3 + caso() * 0.6) }
  const acqua = i % 9 === 4 || i % 13 === 0
  return {
    d: `M-20,${y0.toFixed(1)} C${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${W + 20},${y3.toFixed(1)}`,
    colore: acqua ? '#58c8c0' : '#2438e0',
    opacita: acqua ? 0.85 : 0.35 + caso() * 0.5,
    spessore: 0.6 + caso() * 1.1,
  }
})
const stelle = Array.from({ length: 70 }, () => ({ x: caso() * W, y: caso() * H, r: 0.4 + caso() * 1.1, o: 0.25 + caso() * 0.6 }))

// Dots: a diagonal drift of blue discs, larger and blurred towards the edges.
const punti = Array.from({ length: 260 }, () => {
  const t = caso()
  const x = W * t + (caso() - 0.5) * 260
  const y = H * (1 - t) * 0.9 + (caso() - 0.5) * 230 + 40
  return { x, y, r: 1.5 + caso() * 7, o: 0.25 + caso() * 0.7 }
})
</script>

<template>
  <svg class="correnti" :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <template v-if="tipo === 'linee'">
      <path v-for="(l, i) in linee" :key="i" :d="l.d" fill="none" :stroke="l.colore" :stroke-opacity="l.opacita" :stroke-width="l.spessore" />
      <circle v-for="(s, i) in stelle" :key="`s${i}`" :cx="s.x" :cy="s.y" :r="s.r" fill="#8fb4ff" :fill-opacity="s.o" />
    </template>
    <template v-else>
      <circle v-for="(p, i) in punti" :key="i" :cx="p.x" :cy="p.y" :r="p.r" fill="#2438e0" :fill-opacity="p.o" />
    </template>
  </svg>
</template>

<style scoped>
.correnti {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #000;
}
</style>
