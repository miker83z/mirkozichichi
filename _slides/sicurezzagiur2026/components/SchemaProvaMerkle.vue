<!--
  Diagram (2024 deck, pp. 75–76): proving membership in a Merkle tree with 16 data. Leaves H_A … H_P, then H_AB …,
  H_ABCD …, H_ABCDEFGH and H_IJKLMNOP, up to the root. The datum K is the one to prove.
  4 clicks: (1) the tree; (2) the target: datum K and its impronta H_K (green); (3) the sibling impronte the proof
  must supply, H_L, H_IJ, H_MNOP, H_ABCDEFGH (blue); (4) the path from K to the root, recomputed (dashed):
  "bastano 4 impronte su 16 dati: O(log n)".
  <SchemaProvaMerkle />
-->
<script setup lang="ts">
const LETTERE = 'ABCDEFGHIJKLMNOP'

interface Nodo { cx: number, y: number, w: number, testo: string }
const H = 26
const livelli: Nodo[][] = []
// leaves
livelli.push([...LETTERE].map((l, i) => ({ cx: 30 + 54 * i, y: 190, w: 46, testo: `H_${l}` })))
// upper levels: each node joins two nodes of the level below
const Ys = [144, 98, 52, 6]
const Ws = [62, 82, 110, 236]
for (let n = 0; n < 4; n++) {
  const sotto = livelli[n]
  const sopra: Nodo[] = []
  for (let k = 0; k < sotto.length / 2; k++) {
    const a = sotto[2 * k], b = sotto[2 * k + 1]
    const nome = a.testo.slice(2) + b.testo.slice(2)
    sopra.push({ cx: (a.cx + b.cx) / 2, y: Ys[n], w: Ws[n], testo: `H_${nome}` })
  }
  livelli.push(sopra)
}
const radice = livelli[4][0]
radice.testo = `radice  ${radice.testo}`

/** Edges: from the top of each child to the bottom of its parent. */
const rami = livelli.slice(0, 4).flatMap((liv, n) => liv.map((c, i) => {
  const p = livelli[n + 1][Math.floor(i / 2)]
  return { x1: c.cx, y1: c.y, x2: p.cx, y2: p.y + H }
}))

const trova = (t: string) => livelli.flat().find(n => n.testo.endsWith(`H_${t}`))!
const K = trova('K')
const fratelli = ['L', 'IJ', 'MNOP', 'ABCDEFGH'].map(trova)
const percorso = [K, trova('KL'), trova('IJKL'), trova('IJKLMNOP'), radice]
const DATO = { x: K.cx - 23, y: 234, w: 46, h: 28 }
</script>

<template>
  <svg viewBox="0 0 880 300" class="schema" role="img" aria-label="Schema: in un albero di Merkle con 16 dati bastano 4 impronte per dimostrare che il dato K ne fa parte">
    <g v-click>
      <line v-for="(r, i) in rami" :key="i" :x1="r.x1" :y1="r.y1" :x2="r.x2" :y2="r.y2" class="ramo" />
      <template v-for="(liv, n) in livelli" :key="n">
        <SvRiquadro v-for="(nd, i) in liv" :key="i" :x="nd.cx - nd.w / 2" :y="nd.y" :w="nd.w" :h="H" :testo="nd.testo" piccolo :raggio="3" />
      </template>
    </g>

    <g v-click>
      <line :x1="K.cx" :y1="DATO.y" :x2="K.cx" :y2="K.y + H" class="ramo-ok" />
      <SvRiquadro :x="DATO.x" :y="DATO.y" :w="DATO.w" :h="DATO.h" testo="K" variante="ok" :raggio="3" />
      <SvRiquadro :x="K.cx - K.w / 2" :y="K.y" :w="K.w" :h="H" :testo="K.testo" variante="ok" piccolo :raggio="3" />
      <text :x="DATO.x + DATO.w + 10" :y="DATO.y + 19" class="ok-testo">il dato da dimostrare</text>
    </g>

    <g v-click>
      <SvRiquadro v-for="(nd, i) in fratelli" :key="i" :x="nd.cx - nd.w / 2" :y="nd.y" :w="nd.w" :h="H" :testo="nd.testo" variante="blu" piccolo :raggio="3" />
      <text x="864" y="292" text-anchor="end" class="blu-testo">in blu: le impronte fornite con la prova</text>
    </g>

    <g v-click>
      <line v-for="(nd, i) in percorso.slice(0, -1)" :key="`l${i}`" :x1="nd.cx" :y1="nd.y" :x2="percorso[i + 1].cx" :y2="percorso[i + 1].y + H" class="ramo-calcolo" />
      <line :x1="K.cx" :y1="DATO.y" :x2="K.cx" :y2="K.y + H" class="ramo-calcolo" />
      <rect v-for="(nd, i) in percorso.slice(1)" :key="`r${i}`" :x="nd.cx - nd.w / 2 - 3" :y="nd.y - 3" :width="nd.w + 6" :height="H + 6" rx="5" class="calcolato" />
      <text x="16" y="262" class="didascalia">bastano 4 impronte su 16 dati: O(log n)</text>
      <text x="16" y="282" class="nota">tratteggiato: ciò che si ricalcola, da K fino alla radice</text>
    </g>
  </svg>
</template>

<style scoped>
.ramo { stroke: #a9a7b0; stroke-width: 1.3; }
.ramo-ok { stroke: var(--ok); stroke-width: 2; }
.ramo-calcolo { stroke: var(--rubrica); stroke-width: 2.5; stroke-dasharray: 6 4; }
.calcolato { fill: none; stroke: var(--rubrica); stroke-width: 2; stroke-dasharray: 6 4; }
:deep(.sv-riquadro .pedice) { font-size: 0.85em; }
:deep(.sv-blu rect) { fill: #e7eef8; stroke: #2f5f9e; stroke-width: 2; }
:deep(.sv-blu text) { fill: #2f5f9e; font-weight: 700; }
.ok-testo { font-size: 14px; font-weight: 700; fill: var(--ok); }
.blu-testo { font-size: 14px; font-weight: 700; fill: #2f5f9e; }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
