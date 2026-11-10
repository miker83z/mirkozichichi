<!--
  Diagram (2024 deck, p. 41): point addition on the elliptic curve y² = x³ − x + 1, over the real numbers.
  The curve is computed point by point; P = (−1, 1), Q = (0,5, −√0,625); R and P + Q come from the chord
  formulas (λ = (yQ − yP)/(xQ − xP), xR = λ² − xP − xQ), as in components/CurvaEllittica.vue.
  4 clicks: curve and axes, P and Q, the line through P and Q with the third intersection R,
  the reflection of R across the x axis, which is P + Q.
  <SchemaCurvaEllittica />
-->
<script setup lang="ts">
import { useId } from 'vue'

const f = (x: number) => x ** 3 - x + 1

// The only real root of x³ − x + 1, where the curve turns (Newton's method).
let radice = -1.3
for (let i = 0; i < 40; i++) radice -= f(radice) / (3 * radice ** 2 - 1)

const P = { x: -1, y: 1 }
const Q = { x: 0.5, y: -Math.sqrt(f(0.5)) }
const lambda = (Q.y - P.y) / (Q.x - P.x)
const xR = lambda ** 2 - P.x - Q.x
const R = { x: xR, y: P.y + lambda * (xR - P.x) }
const S = { x: R.x, y: -R.y }

// Plot area (left part of the diagram).
const AX = 10, AY = 8, AW = 500, AH = 264
const X0 = -2, X1 = 2.6, Y0 = -3.4, Y1 = 3.4
const sx = (x: number) => AX + ((x - X0) / (X1 - X0)) * AW
const sy = (y: number) => AY + ((Y1 - y) / (Y1 - Y0)) * AH

const curva = (() => {
  const n = 240
  const sopra: string[] = []
  const sotto: string[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const x = radice + t * t * (X1 + 0.3 - radice)
    const y = Math.sqrt(Math.max(0, f(x)))
    sopra.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`)
    sotto.push(`${sx(x).toFixed(1)},${sy(-y).toFixed(1)}`)
  }
  return `M${sopra.reverse().join(' L')} L${sotto.slice(1).join(' L')}`
})()

const retta = {
  x1: sx(X0 - 0.5), y1: sy(P.y + lambda * (X0 - 0.5 - P.x)),
  x2: sx(X1 + 0.5), y2: sy(P.y + lambda * (X1 + 0.5 - P.x)),
}
const tx = [-1, 1, 2]
const ty = [-2, 2]
const num = (v: number) => Number(v.toFixed(2)).toLocaleString('it-IT').replace('-', '−')
const coord = (p: { x: number, y: number }) => `(${num(p.x)}; ${num(p.y)})`
const idArea = `sce-${useId()}`
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: curva ellittica y al quadrato uguale x al cubo meno x più 1; la retta per P e Q incontra la curva in R; il simmetrico di R è P più Q">
    <defs>
      <clipPath :id="idArea">
        <rect :x="AX" :y="AY" :width="AW" :height="AH" />
      </clipPath>
    </defs>
    <g v-click>
      <g class="assi">
        <line :x1="AX" :y1="sy(0)" :x2="AX + AW" :y2="sy(0)" />
        <line :x1="sx(0)" :y1="AY" :x2="sx(0)" :y2="AY + AH" />
        <g v-for="t in tx" :key="`x${t}`">
          <line :x1="sx(t)" :y1="sy(0) - 4" :x2="sx(t)" :y2="sy(0) + 4" />
          <text :x="sx(t)" :y="sy(0) + 19" text-anchor="middle">{{ num(t) }}</text>
        </g>
        <g v-for="t in ty" :key="`y${t}`">
          <line :x1="sx(0) - 4" :y1="sy(t)" :x2="sx(0) + 4" :y2="sy(t)" />
          <text :x="sx(0) - 8" :y="sy(t) + 5" text-anchor="end">{{ num(t) }}</text>
        </g>
        <text :x="AX + AW - 4" :y="sy(0) - 8" text-anchor="end" class="nome-asse">x</text>
        <text :x="sx(0) + 9" :y="AY + 14" class="nome-asse">y</text>
      </g>
      <path :d="curva" :clip-path="`url(#${idArea})`" class="curva" />
      <text x="548" y="42" class="equazione">y² = x³ − x + 1</text>
      <text x="548" y="66" class="nota">sui numeri reali, per poterla disegnare</text>
    </g>
    <g v-click>
      <circle :cx="sx(P.x)" :cy="sy(P.y)" r="5.5" class="dato" />
      <text :x="sx(P.x) - 9" :y="sy(P.y) - 9" text-anchor="end" class="punto">P</text>
      <circle :cx="sx(Q.x)" :cy="sy(Q.y)" r="5.5" class="dato" />
      <text :x="sx(Q.x) + 2" :y="sy(Q.y) + 26" class="punto">Q</text>
      <text x="548" y="108" class="passo">P = {{ coord(P) }}</text>
      <text x="548" y="130" class="passo">Q = (0,5; −√0,625) ≈ {{ coord(Q) }}</text>
    </g>
    <g v-click>
      <line v-bind="retta" :clip-path="`url(#${idArea})`" class="retta" />
      <circle :cx="sx(R.x)" :cy="sy(R.y)" r="5.5" class="terzo" />
      <text :x="sx(R.x) - 11" :y="sy(R.y) + 6" text-anchor="end" class="punto">R</text>
      <text x="548" y="172" class="passo">la retta per P e Q taglia la curva</text>
      <text x="548" y="194" class="passo">in un terzo punto: R ≈ {{ coord(R) }}</text>
    </g>
    <g v-click>
      <line :x1="sx(R.x)" :y1="sy(R.y) - 8" :x2="sx(S.x)" :y2="sy(S.y) + 9" class="riflesso" />
      <circle :cx="sx(S.x)" :cy="sy(S.y)" r="7" class="somma" />
      <text :x="sx(S.x) - 12" :y="sy(S.y) + 6" text-anchor="end" class="punto rosso">P + Q</text>
      <text x="548" y="236" class="passo">si ribalta R sull'asse x:</text>
      <text x="548" y="262" class="risultato">P + Q ≈ {{ coord(S) }}</text>
    </g>
  </svg>
</template>

<style scoped>
.assi line {
  stroke: var(--grigio);
  stroke-width: 1;
}
.assi text {
  font-size: 13px;
  fill: var(--grigio);
}
.assi .nome-asse {
  font-style: italic;
  font-size: 15px;
}
.curva {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 2.4;
}
.retta {
  stroke: var(--glossa);
  stroke-width: 2;
}
.riflesso {
  stroke: var(--rubrica);
  stroke-width: 1.8;
  stroke-dasharray: 6 5;
}
.dato {
  fill: var(--inchiostro);
}
.terzo {
  fill: var(--carta);
  stroke: var(--glossa);
  stroke-width: 2.4;
}
.somma {
  fill: var(--rubrica);
}
.punto {
  font-family: var(--serif);
  font-weight: 700;
  font-size: 18px;
  paint-order: stroke;
  stroke: var(--carta);
  stroke-width: 5px;
}
.punto.rosso {
  fill: var(--rubrica);
}
.equazione {
  font-family: var(--serif);
  font-size: 24px;
}
.passo {
  font-size: 16px;
}
.risultato {
  font-weight: 700;
  font-size: 18px;
  fill: var(--rubrica);
}
</style>
