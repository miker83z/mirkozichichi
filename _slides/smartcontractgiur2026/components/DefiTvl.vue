<!--
  How much money sits in DeFi smart contracts (total value locked, billions of US dollars), first day of each
  quarter, 2019–2026, from DefiLlama (api.llama.fi/v2/historicalChainTvl, downloaded on 10/11/2026; the slide
  makes no request). Marks: the peak (177.5 bn, 9 Nov 2021), the Terra/Luna collapse (May 2022), today
  (76.7 bn, 10 Nov 2026). 2 clicks: the curve, the marks.

  <DefiTvl />
-->
<script setup lang="ts">
const dati: [string, number][] = [
  ['2019-01', 0.0], ['2019-04', 0.3], ['2019-07', 0.5], ['2019-10', 0.5], ['2020-01', 0.6], ['2020-04', 0.5],
  ['2020-07', 1.9], ['2020-10', 10.2], ['2021-01', 15.3], ['2021-04', 59.0], ['2021-07', 81.1], ['2021-10', 122.9],
  ['2021-11', 177.5], ['2022-01', 163.2], ['2022-04', 157.5], ['2022-07', 51.3], ['2022-10', 52.3], ['2023-01', 37.8],
  ['2023-04', 49.0], ['2023-07', 45.0], ['2023-10', 38.5], ['2024-01', 52.5], ['2024-04', 92.9], ['2024-07', 90.9],
  ['2024-10', 83.9], ['2025-01', 115.0], ['2025-04', 91.0], ['2025-07', 108.5], ['2025-10', 152.7], ['2026-01', 111.9],
  ['2026-04', 90.6], ['2026-07', 65.6], ['2026-10', 92.4], ['2026-11', 76.7],
]
const W = 880
const H = 230
const X0 = 46
const X1 = 860
const Y0 = 200
const Y1 = 16
const MAX = 180
const anno = (s: string) => Number(s.slice(0, 4)) + (Number(s.slice(5, 7)) - 1) / 12
const x = (s: string) => X0 + (anno(s) - 2019) / (2026.9 - 2019) * (X1 - X0)
const y = (v: number) => Y0 - v / MAX * (Y0 - Y1)
const linea = dati.map(([d, v], i) => `${i ? 'L' : 'M'}${x(d).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
const area = `${linea} L${x('2026-11').toFixed(1)},${Y0} L${X0},${Y0} Z`
const anni = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" class="schema" role="img" aria-label="Grafico: valore depositato nei protocolli DeFi dal 2019 al 2026, massimo di 177,5 miliardi di dollari nel novembre 2021, 76,7 miliardi il 10 novembre 2026">
    <g v-click>
      <line v-for="v in [50, 100, 150]" :key="v" :x1="X0" :x2="X1" :y1="y(v)" :y2="y(v)" class="griglia" />
      <text v-for="v in [0, 50, 100, 150]" :key="`t${v}`" :x="X0 - 8" :y="y(v) + 4" text-anchor="end" class="nota">{{ v }}</text>
      <text v-for="a in anni" :key="a" :x="x(`${a}-01`)" :y="Y0 + 18" text-anchor="middle" class="nota">{{ a }}</text>
      <text :x="X0" :y="10" class="nota">miliardi di $ depositati negli smart contract DeFi (fonte: DefiLlama)</text>
      <path :d="area" class="area" />
      <path :d="linea" class="curva" />
    </g>
    <g v-click>
      <circle :cx="x('2021-11')" :cy="y(177.5)" r="5" class="punto" />
      <text :x="x('2021-11') + 10" :y="y(177.5) + 5" class="etichetta">177,5 mld · 9 novembre 2021</text>
      <circle :cx="x('2022-07')" :cy="y(51.3)" r="5" class="punto ko" />
      <text :x="x('2022-07') + 10" :y="y(51.3) + 22" class="etichetta ko">crollo di Terra/Luna (maggio 2022)</text>
      <circle :cx="x('2026-11')" :cy="y(76.7)" r="5" class="punto" />
      <text :x="x('2026-11') - 10" :y="y(76.7) - 12" text-anchor="end" class="etichetta">oggi: 76,7 mld</text>
    </g>
  </svg>
</template>

<style scoped>
.griglia { stroke: var(--linea); stroke-width: 1; stroke-dasharray: 3 4; }
.area { fill: color-mix(in srgb, var(--acqua, var(--ok)) 22%, transparent); }
.curva { fill: none; stroke: var(--acqua, var(--ok)); stroke-width: 2.5; }
.punto { fill: var(--glossa); }
.punto.ko { fill: var(--ko); }
.etichetta { font-size: 14px; font-weight: 700; fill: var(--glossa); }
.etichetta.ko { fill: var(--ko); }
</style>
