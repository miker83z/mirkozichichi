<!--
  Diagram (2024 deck, p. 70): a chain of hash pointers. Three blocks "prev: H( )" / "dati"; the prev field of each
  block points to the previous block (the first one to earlier blocks, off the left edge); the impronta of the
  last block, H( ), is kept outside and points to the last block.
  4 clicks: block 1, block 2 with its pointer, block 3 with its pointer, the kept impronta with the caption
  "basta conservare l'ultima impronta".
  <SchemaCatenaBlocchi />
-->
<script setup lang="ts">
const BX = [90, 330, 570] // left edge of each block
const W = 150
const TOP = 80
const SEP = 116 // header / body separator
const BOT = 230
const MID = 173 // middle of the body, where pointers arrive

/** Path of the pointer that leaves the prev field of the block at bx, goes up, left and down. */
function percorso(bx: number) {
  const ax = bx + 100
  return `M${ax},${(TOP + SEP) / 2} V58 H${bx - 40} V${MID}`
}
</script>

<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: catena di blocchi collegati da puntatori hash, con l'ultima impronta conservata a parte">
    <g v-for="(bx, i) in BX" :key="i" v-click>
      <rect :x="bx" :y="TOP" :width="W" :height="BOT - TOP" rx="4" class="blocco" />
      <line :x1="bx" :x2="bx + W" :y1="SEP" :y2="SEP" class="sep" />
      <text :x="bx + 96" y="103" text-anchor="end" class="mono prev">prev: H(</text>
      <text :x="bx + 104" y="103" class="mono prev">)</text>
      <text :x="bx + W / 2" :y="MID + 5" text-anchor="middle" class="dati">dati</text>
      <text :x="bx + W / 2" y="216" text-anchor="middle" class="nota">blocco {{ i + 1 }}</text>
      <path :d="percorso(bx)" class="filo" />
      <circle :cx="bx + 100" :cy="(TOP + SEP) / 2" r="3" class="punto" />
      <SvFreccia :x1="bx - 40" :y1="MID" :x2="i === 0 ? 12 : BX[i - 1] + W + 2" :y2="MID" variante="rubrica" />
    </g>
    <g v-click>
      <text x="795" y="16" text-anchor="middle" class="nota">ultima impronta</text>
      <text x="791" y="44" text-anchor="end" class="testa">H(</text>
      <text x="799" y="44" class="testa">)</text>
      <circle cx="795" cy="37" r="3" class="punto" />
      <SvFreccia :x1="795" :y1="37" :x2="BX[2] + W + 2" :y2="MID" angolo="vh" variante="rubrica" />
      <text x="440" y="262" text-anchor="middle" class="didascalia">basta conservare l'ultima impronta</text>
    </g>
  </svg>
</template>

<style scoped>
.blocco { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.sep { stroke: var(--inchiostro); stroke-width: 1; }
.prev { font-size: 14px; }
.dati { font-size: 16px; }
.filo { fill: none; stroke: var(--rubrica); stroke-width: 2; }
.punto { fill: var(--rubrica); }
.testa { font-size: 24px; fill: var(--rubrica); }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
