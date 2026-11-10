<!--
  Diagram (new, for 2024 deck p. 9): complexity is the enemy of security.
  Left, a simple system (3 components); right, a complex one (10 interconnected components).
  Red dots mark possible weak points: more parts and more connections, more weak points.
  3 clicks: the simple system, the complex system, the motto "quello che non c'è non si rompe".
  <SchemaComplessita />
-->
<script setup lang="ts">
type P = [number, number]
const semplici: P[] = [[65, 128], [155, 128], [245, 128]]
const nodi: P[] = [
  [380, 96], [482, 80], [592, 100], [702, 80], [812, 100],
  [396, 190], [506, 160], [620, 192], [730, 166], [834, 200],
]
const archi: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [0, 6], [1, 6], [2, 6], [2, 7],
  [2, 8], [3, 8], [4, 8], [4, 9], [5, 6], [6, 7], [7, 8], [8, 9], [5, 7],
]
const medio = ([a, b]: [number, number]): P => [(nodi[a][0] + nodi[b][0]) / 2, (nodi[a][1] + nodi[b][1]) / 2]
// Weak points, drawn on some of the connections (illustrative: every interface is a place where things can go wrong).
const deboli: P[] = [[0, 1], [1, 6], [2, 6], [2, 8], [3, 4], [5, 6], [6, 7], [4, 9], [5, 7]].map(e => medio(e as [number, number]))
</script>

<template>
  <svg viewBox="0 0 880 272" class="schema" role="img" aria-label="Schema: un sistema semplice con pochi punti deboli e un sistema complesso con molti punti deboli">
    <g v-click>
      <text x="155" y="30" text-anchor="middle" class="titolo">sistema semplice</text>
      <text x="155" y="52" text-anchor="middle" class="nota">3 componenti</text>
      <line v-for="i in 2" :key="i" :x1="semplici[i - 1][0]" :y1="128" :x2="semplici[i][0]" :y2="128" class="arco" />
      <rect v-for="(n, i) in semplici" :key="`s${i}`" :x="n[0] - 28" :y="n[1] - 17" width="56" height="34" rx="5" class="nodo" />
      <circle cx="200" cy="128" r="7" class="debole" />
      <circle cx="40" cy="214" r="7" class="debole" />
      <text x="54" y="219" class="legenda">possibile punto debole</text>
    </g>
    <g v-click>
      <line x1="322" y1="14" x2="322" y2="226" class="divisore" />
      <text x="606" y="30" text-anchor="middle" class="titolo">sistema complesso</text>
      <text x="606" y="52" text-anchor="middle" class="nota">10 componenti, 18 collegamenti: molti più punti deboli</text>
      <line v-for="(e, i) in archi" :key="`a${i}`" :x1="nodi[e[0]][0]" :y1="nodi[e[0]][1]" :x2="nodi[e[1]][0]" :y2="nodi[e[1]][1]" class="arco" />
      <rect v-for="(n, i) in nodi" :key="`n${i}`" :x="n[0] - 22" :y="n[1] - 14" width="44" height="28" rx="5" class="nodo" />
      <circle v-for="(d, i) in deboli" :key="`d${i}`" :cx="d[0]" :cy="d[1]" r="7" class="debole" />
    </g>
    <g v-click>
      <text x="440" y="260" text-anchor="middle" class="motto">«Quello che non c'è non si rompe»</text>
    </g>
  </svg>
</template>

<style scoped>
.titolo {
  font-weight: 700;
  font-size: 17px;
}
.nodo {
  fill: var(--campo);
  stroke: var(--inchiostro);
  stroke-width: 1.6;
}
.arco {
  stroke: var(--grigio);
  stroke-width: 1.6;
}
.debole {
  fill: var(--rubrica);
  stroke: var(--carta);
  stroke-width: 2;
}
.legenda {
  font-size: 14px;
  fill: var(--grigio);
}
.divisore {
  stroke: var(--linea);
  stroke-width: 1.5;
}
.motto {
  font-family: var(--serif);
  font-style: italic;
  font-size: 21px;
  fill: var(--rubrica);
}
</style>
