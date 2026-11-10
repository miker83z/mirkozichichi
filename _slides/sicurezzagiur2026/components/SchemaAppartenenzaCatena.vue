<!--
  Diagram (2024 deck, p. 72): proving that an element belongs to a chain of hash pointers. Five blocks, the target
  is block 2 (green). Starting from the kept impronta, one has to walk back block after block (numbered steps)
  until the target.
  3 clicks: the chain with the target; the walk from the head to the target (steps 1–4); the caption
  "costo proporzionale a n: O(n)".
  <SchemaAppartenenzaCatena />
-->
<script setup lang="ts">
const BX = [50, 200, 350, 500, 650] // left edge of each block, oldest first
const W = 110
const TOP = 80
const SEP = 108
const BOT = 200
const MID = 154
const PY = (TOP + SEP) / 2
const BERSAGLIO = 1 // index of the target block (block 2)
const HX = 815 // the kept impronta

function percorso(bx: number) {
  return `M${bx + 78},${PY} V60 H${bx - 20} V${MID}`
}
/** Steps of the walk: the head, then the pointers of blocks 5, 4, 3. */
const passi = [
  { x: HX, y: 104 },
  ...[4, 3, 2].map(i => ({ x: (BX[i] + 78 + BX[i] - 20) / 2, y: 60 })),
]
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: per dimostrare che un elemento è nella catena bisogna ripercorrerla blocco per blocco">
    <g v-click>
      <g v-for="(bx, i) in BX" :key="i">
        <rect :x="bx" :y="TOP" :width="W" :height="BOT - TOP" rx="4" :class="i === BERSAGLIO ? 'bersaglio' : 'blocco'" />
        <line :x1="bx" :x2="bx + W" :y1="SEP" :y2="SEP" class="sep" />
        <text :x="bx + 74" y="99" text-anchor="end" class="mono prev">prev: H(</text>
        <text :x="bx + 82" y="99" class="mono prev">)</text>
        <text :x="bx + W / 2" :y="MID + 5" text-anchor="middle" :class="['dati', { 'dati-ok': i === BERSAGLIO }]">dati {{ i + 1 }}</text>
        <path :d="percorso(bx)" class="filo" />
        <circle :cx="bx + 78" :cy="PY" r="2.5" class="punto" />
        <SvFreccia :x1="bx - 20" :y1="MID" :x2="i === 0 ? 8 : BX[i - 1] + W + 2" :y2="MID" variante="grigio" />
      </g>
      <text :x="BX[BERSAGLIO] + W / 2" y="222" text-anchor="middle" class="ok-testo">da dimostrare</text>
      <text :x="HX" y="16" text-anchor="middle" class="nota">impronta conservata</text>
      <text :x="HX - 4" y="44" text-anchor="end" class="testa">H(</text>
      <text :x="HX + 4" y="44" class="testa">)</text>
      <SvFreccia :x1="HX" :y1="38" :x2="BX[4] + W + 2" :y2="MID" angolo="vh" variante="grigio" />
    </g>

    <!-- 2: the walk, from the head back to the target -->
    <g v-click>
      <SvFreccia :x1="HX" :y1="38" :x2="BX[4] + W + 2" :y2="MID" angolo="vh" variante="rubrica" />
      <g v-for="i in [4, 3, 2]" :key="i">
        <rect :x="BX[i]" :y="TOP" :width="W" :height="BOT - TOP" rx="4" class="visitato" />
        <path :d="percorso(BX[i])" class="filo-evid" />
        <SvFreccia :x1="BX[i] - 20" :y1="MID" :x2="BX[i - 1] + W + 2" :y2="MID" variante="rubrica" />
      </g>
      <g v-for="(p, n) in passi" :key="n">
        <circle :cx="p.x" :cy="p.y" r="11" class="passo" />
        <text :x="p.x" :y="p.y + 5" text-anchor="middle" class="passo-n">{{ n + 1 }}</text>
      </g>
    </g>

    <g v-click>
      <text x="440" y="254" text-anchor="middle" class="didascalia">costo proporzionale a n: O(n)</text>
      <text x="440" y="274" text-anchor="middle" class="nota">con n blocchi, nel caso peggiore servono n passi</text>
    </g>
  </svg>
</template>

<style scoped>
.blocco { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.bersaglio { fill: #e8f3ed; stroke: var(--ok); stroke-width: 2.5; }
.visitato { fill: none; stroke: var(--rubrica); stroke-width: 2.5; }
.sep { stroke: var(--inchiostro); stroke-width: 1; }
.prev { font-size: 13px; }
.dati { font-size: 15px; }
.dati-ok { font-weight: 700; fill: var(--ok); }
.filo { fill: none; stroke: var(--grigio); stroke-width: 2; }
.filo-evid { fill: none; stroke: var(--rubrica); stroke-width: 2.5; }
.punto { fill: var(--grigio); }
.testa { font-size: 22px; fill: var(--inchiostro); }
.ok-testo { font-size: 14px; font-weight: 700; fill: var(--ok); }
.passo { fill: var(--rubrica); }
.passo-n { font-size: 13px; font-weight: 700; fill: var(--carta); }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
