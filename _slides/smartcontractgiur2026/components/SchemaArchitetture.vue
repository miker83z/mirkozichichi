<!--
  Diagram (2025 deck, p. 12): three ways to organise a network, side by side.
  Centralizzato: one central node does everything (a star). Decentralizzato: the load is spread over a
  few sub-centres, each with its own nodes. Distribuito (P2P): a mesh where all nodes are equal.
  Central nodes are drawn in red, ordinary nodes in grey.
  Source: P. Baran, "On Distributed Communications: I. Introduction to Distributed Communications
  Networks", RAND RM-3420-PR (1964), Fig. 1 (centralized, decentralized, distributed networks).
  3 clicks: one panel per click, left to right.
  <SchemaArchitetture />
-->
<script setup lang="ts">
type Nodo = { x: number, y: number, r: number, centro?: boolean }
type Pannello = { titolo: string, righe: string[], nodi: Nodo[], archi: [number, number][] }

const PW = 280
const CY = 120
const rad = (a: number) => (a * Math.PI) / 180

function centralizzato(cx: number): Pannello {
  const nodi: Nodo[] = [{ x: cx, y: CY, r: 16, centro: true }]
  for (let i = 0; i < 10; i++) nodi.push({ x: cx + 78 * Math.cos(rad(i * 36 - 90)), y: CY + 72 * Math.sin(rad(i * 36 - 90)), r: 8 })
  return { titolo: 'Centralizzato', righe: ['un nodo si occupa di tutto'], nodi, archi: nodi.slice(1).map((_, i) => [0, i + 1]) }
}

function decentralizzato(cx: number): Pannello {
  const nodi: Nodo[] = []
  const archi: [number, number][] = []
  const hub = [-90, 30, 150]
  const cy = CY + 10 // the triangle of hubs is lower at the bottom: centre it in the panel
  hub.forEach(a => nodi.push({ x: cx + 40 * Math.cos(rad(a)), y: cy + 40 * Math.sin(rad(a)), r: 11, centro: true }))
  archi.push([0, 1], [1, 2], [2, 0])
  hub.forEach((a, h) => {
    for (const d of [-54, -18, 18, 54]) {
      nodi.push({ x: nodi[h].x + 42 * Math.cos(rad(a + d)), y: nodi[h].y + 42 * Math.sin(rad(a + d)), r: 7 })
      archi.push([h, nodi.length - 1])
    }
  })
  return { titolo: 'Decentralizzato', righe: ['più centri, ognuno', 'con i suoi nodi'], nodi, archi }
}

function distribuito(cx: number): Pannello {
  const nodi: Nodo[] = []
  // A hexagon of equal nodes, rows of 3, 4, 5, 4 and 3, each linked to its nearest neighbours.
  const righe = [{ dy: -78, n: 3 }, { dy: -39, n: 4 }, { dy: 0, n: 5 }, { dy: 39, n: 4 }, { dy: 78, n: 3 }]
  for (const r of righe) for (let i = 0; i < r.n; i++) nodi.push({ x: cx + (i - (r.n - 1) / 2) * 46, y: CY + 4 + r.dy, r: 8 })
  const archi: [number, number][] = []
  for (let i = 0; i < nodi.length; i++) {
    for (let j = i + 1; j < nodi.length; j++) {
      if (Math.hypot(nodi[i].x - nodi[j].x, nodi[i].y - nodi[j].y) < 50) archi.push([i, j])
    }
  }
  return { titolo: 'Distribuito (P2P)', righe: ['tutti i nodi sono pari'], nodi, archi }
}

const PANNELLI = [centralizzato(PW / 2), decentralizzato(300 + PW / 2), distribuito(600 + PW / 2)]
const f = (n: number) => n.toFixed(1)
const percorso = (p: Pannello) => p.archi.map(([a, b]) => `M${f(p.nodi[a].x)},${f(p.nodi[a].y)} L${f(p.nodi[b].x)},${f(p.nodi[b].y)}`).join(' ')
</script>

<template>
  <svg viewBox="0 0 880 272" class="schema" role="img" aria-label="Schema: rete centralizzata (un nodo fa tutto), decentralizzata (più sotto-centri) e distribuita peer-to-peer (tutti i nodi pari)">
    <g v-for="(p, k) in PANNELLI" :key="p.titolo" v-click>
      <rect :x="k * 300" y="0" :width="PW" height="272" rx="8" class="pannello" />
      <text :x="k * 300 + PW / 2" y="28" text-anchor="middle" class="titolo">{{ p.titolo }}</text>
      <path :d="percorso(p)" class="arco" />
      <circle v-for="(n, i) in p.nodi" :key="i" :cx="f(n.x)" :cy="f(n.y)" :r="n.r" :class="n.centro ? 'centro' : 'nodo'" />
      <text v-for="(r, i) in p.righe" :key="r" :x="k * 300 + PW / 2" :y="232 + i * 21 + (p.righe.length === 1 ? 10 : 0)" text-anchor="middle" class="testo">{{ r }}</text>
    </g>
  </svg>
</template>

<style scoped>
.pannello { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.titolo { font-size: 17px; font-weight: 700; fill: var(--rubrica); }
.arco { fill: none; stroke: var(--grigio); stroke-width: 1.5; }
.nodo { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.8; }
.centro { fill: color-mix(in srgb, var(--rubrica) 30%, var(--carta)); stroke: var(--rubrica); stroke-width: 2.2; }
.testo { font-size: 15px; }
</style>
