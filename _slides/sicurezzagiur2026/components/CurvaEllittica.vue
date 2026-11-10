<!--
  Point addition on the elliptic curve y² = x³ − x + 1, drawn over the real numbers.
  Three buttons walk through the chord rule: the line through P and Q, its third intersection R
  with the curve, and the reflection of R across the x axis, which is P + Q.
  All points are computed with the chord formulas (λ = (yQ − yP)/(xQ − xP), xR = λ² − xP − xQ).
  In the PDF all three steps are shown.

  <CurvaEllittica />
  <CurvaEllittica stretto />

  Props
  - stretto: narrower layout for the main column of the `glossa` layout
-->
<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useNav } from '@slidev/client'

const props = defineProps<{ stretto?: boolean }>()

const { isPrintMode } = useNav()
const passo = ref(isPrintMode.value ? 3 : 0)

const f = (x: number) => x ** 3 - x + 1

// The only real root of x³ − x + 1, where the curve turns (Newton's method).
let radice = -1.3
for (let i = 0; i < 40; i++) radice -= f(radice) / (3 * radice ** 2 - 1)

const P = { x: -1, y: 1 }
const Q = { x: 0.5, y: -Math.sqrt(f(0.5)) }
const lambda = (Q.y - P.y) / (Q.x - P.x)
const xR = lambda ** 2 - P.x - Q.x
const R = { x: xR, y: P.y + lambda * (xR - P.x) }
const somma = { x: R.x, y: -R.y }

const idArea = `ce-area-${useId()}`
const W = computed(() => (props.stretto ? 262 : 420))
const H = computed(() => (props.stretto ? 228 : 266))
const X0 = -2, X1 = 2.6, Y0 = -3.5, Y1 = 3.5
const M = 6

const sx = (x: number) => M + ((x - X0) / (X1 - X0)) * (W.value - 2 * M)
const sy = (y: number) => M + ((Y1 - y) / (Y1 - Y0)) * (H.value - 2 * M)

const curva = computed(() => {
  const n = 220
  const sopra: string[] = []
  const sotto: string[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const x = radice + t * t * (X1 + 0.2 - radice)
    const y = Math.sqrt(Math.max(0, f(x)))
    sopra.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`)
    sotto.push(`${sx(x).toFixed(1)},${sy(-y).toFixed(1)}`)
  }
  return `M${sopra.reverse().join(' L')} L${sotto.slice(1).join(' L')}`
})

const retta = computed(() => ({
  x1: sx(X0 - 0.5), y1: sy(P.y + lambda * (X0 - 0.5 - P.x)),
  x2: sx(X1 + 0.5), y2: sy(P.y + lambda * (X1 + 0.5 - P.x)),
}))

const tacche = computed(() => ({
  x: [-2, -1, 1, 2].map(v => ({ v, p: sx(v) })),
  y: [-3, -2, -1, 1, 2, 3].map(v => ({ v, p: sy(v) })),
}))

function num(v: number) {
  return Number(v.toFixed(2)).toLocaleString('it-IT').replace('-', '−')
}
const coord = (p: { x: number, y: number }) => `(${num(p.x)}; ${num(p.y)})`
const esatto = (p: { x: number, y: number }) => Number.isInteger(p.x) && Number.isInteger(p.y)

const PASSI = [
  'Traccia la retta per P e Q',
  'Trova il terzo punto di intersezione',
  "Rifletti rispetto all'asse x: è P + Q",
]
const esiti = [
  'la retta taglia la curva in un terzo punto R',
  `R ≈ ${coord(R)}`,
  `P + Q ≈ ${coord(somma)}`,
]
</script>

<template>
  <div class="demo curva-ellittica" :class="{ stretto, statica: isPrintMode }">
    <div class="corpo">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        :width="W"
        :height="H"
        role="img"
        aria-label="Curva ellittica y al quadrato uguale x al cubo meno x più 1, con la costruzione di P più Q"
      >
        <defs>
          <clipPath :id="idArea">
            <rect :x="M" :y="M" :width="W - 2 * M" :height="H - 2 * M" />
          </clipPath>
        </defs>
        <rect x="0" y="0" :width="W" :height="H" class="sfondo" />
        <g class="assi">
          <line :x1="M" :y1="sy(0)" :x2="W - M" :y2="sy(0)" />
          <line :x1="sx(0)" :y1="M" :x2="sx(0)" :y2="H - M" />
          <g v-for="t in tacche.x" :key="`x${t.v}`">
            <line :x1="t.p" :y1="sy(0) - 3" :x2="t.p" :y2="sy(0) + 3" />
            <text :x="t.p" :y="sy(0) + 17" text-anchor="middle">{{ num(t.v) }}</text>
          </g>
          <g v-for="t in tacche.y" :key="`y${t.v}`">
            <line :x1="sx(0) - 3" :y1="t.p" :x2="sx(0) + 3" :y2="t.p" />
            <text v-if="Math.abs(t.v) % 2 === 0" :x="sx(0) - 7" :y="t.p + 4" text-anchor="end">{{ num(t.v) }}</text>
          </g>
          <text :x="W - M - 2" :y="sy(0) - 7" text-anchor="end" class="nome-asse">x</text>
          <text :x="sx(0) + 8" :y="M + 12" class="nome-asse">y</text>
        </g>
        <g :clip-path="`url(#${idArea})`">
          <path :d="curva" class="curva" />
          <line v-if="passo >= 1" v-bind="retta" class="retta appare" />
          <line
            v-if="passo >= 3"
            :x1="sx(R.x)" :y1="sy(R.y)" :x2="sx(somma.x)" :y2="sy(somma.y)"
            class="riflesso appare"
          />
        </g>
        <g class="punti">
          <circle :cx="sx(P.x)" :cy="sy(P.y)" r="5" class="dato" />
          <text :x="sx(P.x) - 10" :y="sy(P.y) - 9" text-anchor="end">P</text>
          <circle :cx="sx(Q.x)" :cy="sy(Q.y)" r="5" class="dato" />
          <text :x="sx(Q.x) + 9" :y="sy(Q.y) - 9">Q</text>
          <g v-if="passo >= 2" class="appare">
            <circle :cx="sx(R.x)" :cy="sy(R.y)" r="5" class="terzo" />
            <text :x="sx(R.x) - 10" :y="sy(R.y) + 5" text-anchor="end">R</text>
          </g>
          <g v-if="passo >= 3" class="appare">
            <circle :cx="sx(somma.x)" :cy="sy(somma.y)" r="6.5" class="somma" />
            <text :x="sx(somma.x) - 11" :y="sy(somma.y) + 5" text-anchor="end" class="etichetta-somma">P + Q</text>
          </g>
        </g>
      </svg>

      <div class="passi">
        <p class="equazione">y² = x³ − x + 1</p>
        <p class="dati">
          P = {{ coord(P) }} · Q {{ esatto(Q) ? '=' : '≈' }} {{ coord(Q) }}
        </p>
        <ol>
          <li v-for="(testo, i) in PASSI" :key="i">
            <button
              class="btn passo"
              :class="{ pieno: passo === i, fatto: passo > i }"
              :disabled="isPrintMode"
              @click="passo = i + 1"
            >
              {{ i + 1 }}. {{ testo }}
            </button>
            <p v-if="passo > i" class="esito" :class="{ finale: i === 2 }">{{ esiti[i] }}</p>
          </li>
        </ol>
        <button v-if="!isPrintMode && passo > 0" class="btn ricomincia" @click="passo = 0">Ricomincia</button>
      </div>
    </div>
    <p class="didascalia">
      Sui numeri reali per farla vedere; in crittografia si usa la stessa regola su un insieme finito di punti.
    </p>
  </div>
</template>

<style scoped>
.corpo {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
svg {
  flex: none;
  display: block;
  border: 1px solid var(--linea);
  border-radius: 4px;
}
.sfondo {
  fill: var(--carta);
}
.assi line {
  stroke: var(--grigio);
  stroke-width: 1;
}
.assi text {
  font-family: var(--sans);
  font-size: 13px;
  fill: var(--grigio);
}
.assi .nome-asse {
  font-style: italic;
  font-size: 14px;
}
.curva {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 2.2;
}
.retta {
  stroke: var(--glossa);
  stroke-width: 1.8;
}
.riflesso {
  stroke: var(--rubrica);
  stroke-width: 1.6;
  stroke-dasharray: 5 4;
}
.punti text {
  font-family: var(--serif);
  font-weight: 700;
  font-size: 16px;
  fill: var(--inchiostro);
  paint-order: stroke;
  stroke: var(--carta);
  stroke-width: 4px;
}
.dato {
  fill: var(--inchiostro);
}
.terzo {
  fill: var(--carta);
  stroke: var(--glossa);
  stroke-width: 2.2;
}
.somma {
  fill: var(--rubrica);
}
.punti .etichetta-somma {
  fill: var(--rubrica);
}
.appare {
  animation: appare 0.45s ease-out;
}
.statica .appare {
  animation: none;
}
@keyframes appare {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.passi {
  flex: 1;
  min-width: 0;
}
.equazione {
  font-family: var(--serif);
  font-size: 1.2rem;
  margin: 0;
}
.dati {
  font-size: 0.9rem;
  color: var(--grigio);
  margin: 0.1rem 0 0.5rem;
}
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}
ol li {
  margin: 0 0 0.45rem;
}
ol li::marker {
  content: none;
}
.passo {
  width: 100%;
  text-align: left;
  line-height: 1.3;
}
.passo.fatto {
  border-color: var(--linea);
  color: var(--inchiostro);
}
.passo:disabled {
  opacity: 1;
}
.esito {
  margin: 0.15rem 0 0 0.8rem;
  font-size: 0.9rem;
  color: var(--glossa);
}
.esito.finale {
  font-size: 1rem;
  font-weight: 700;
  color: var(--rubrica);
}
.ricomincia {
  font-size: 0.85rem;
}
.stretto .corpo {
  gap: 0.8rem;
}
.stretto .passo {
  font-size: 0.85rem;
  padding: 0.2rem 0.55rem;
}
.stretto .esito {
  font-size: 0.85rem;
  margin-left: 0.6rem;
}
.stretto .esito.finale {
  font-size: 0.95rem;
}
.stretto ol li {
  margin-bottom: 0.35rem;
}
.didascalia {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: var(--grigio);
}
</style>
