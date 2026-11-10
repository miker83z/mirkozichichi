<!--
  Diagram (2024 deck, p. 71): detecting tampering in a chain of hash pointers (tamper-evident log).
  4 clicks: (1) the chain of three blocks with the last impronta kept outside; (2) the data of block 1 are modified
  (orange mark, "modificato"); (3) the impronta of block 1 no longer matches the prev stored in block 2 (this mark
  disappears at the next click); (4) the attacker also rewrites the prev of block 2 and then of block 3, so every
  following impronta changes, up to the kept one, which no longer matches: "la modifica si vede".
  <SchemaManomissione />
-->
<script setup lang="ts">
const BX = [90, 330, 570]
const W = 150
const TOP = 80
const SEP = 116
const BOT = 230
const MID = 173
const PY = (TOP + SEP) / 2 // where pointers start, inside "H( )"

function percorso(bx: number) {
  return `M${bx + 100},${PY} V58 H${bx - 40} V${MID}`
}
const fulmine = '10,0 20,0 14,14 22,14 6,40 11,22 3,22'
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: una modifica a un blocco cambia tutte le impronte successive fino a quella conservata">
    <g v-click>
      <g v-for="(bx, i) in BX" :key="i">
        <rect :x="bx" :y="TOP" :width="W" :height="BOT - TOP" rx="4" class="blocco" />
        <line :x1="bx" :x2="bx + W" :y1="SEP" :y2="SEP" class="sep" />
        <text :x="bx + 96" y="103" text-anchor="end" class="mono prev">prev: H(</text>
        <text :x="bx + 104" y="103" class="mono prev">)</text>
        <text :x="bx + W / 2" :y="MID + 5" text-anchor="middle" class="dati">dati</text>
        <text :x="bx + W / 2" y="220" text-anchor="middle" class="nota">blocco {{ i + 1 }}</text>
        <path :d="percorso(bx)" class="filo" />
        <circle :cx="bx + 100" :cy="PY" r="3" class="punto" />
        <SvFreccia :x1="bx - 40" :y1="MID" :x2="i === 0 ? 12 : BX[i - 1] + W + 2" :y2="MID" variante="rubrica" />
      </g>
      <text x="795" y="16" text-anchor="middle" class="nota">impronta conservata</text>
      <text x="791" y="44" text-anchor="end" class="testa">H(</text>
      <text x="799" y="44" class="testa">)</text>
      <circle cx="795" cy="37" r="3" class="punto" />
      <SvFreccia :x1="795" :y1="37" :x2="BX[2] + W + 2" :y2="MID" angolo="vh" variante="rubrica" />
    </g>

    <!-- 2: the data of block 1 are modified -->
    <g v-click>
      <rect :x="BX[0]" :y="SEP" :width="W" :height="BOT - SEP" rx="4" class="alterato" />
      <text :x="BX[0] + W / 2" :y="MID + 5" text-anchor="middle" class="dati">dati</text>
      <text :x="BX[0] + W / 2" y="220" text-anchor="middle" class="nota">blocco 1</text>
      <polygon :points="fulmine" :transform="`translate(${BX[0] + 18},${MID - 26})`" class="fulmine" />
      <text :x="BX[0] + W / 2" y="200" text-anchor="middle" class="ko-testo">modificato</text>
    </g>

    <!-- 3: block 2 no longer matches (only at this click) -->
    <g v-click="['+1', '+1']">
      <path :d="percorso(BX[1])" class="filo-ko" />
      <SvFreccia :x1="BX[1] - 40" :y1="MID" :x2="BX[0] + W + 2" :y2="MID" variante="ko" />
      <text :x="(BX[1] + 100 + BX[1] - 40) / 2" y="48" text-anchor="middle" class="ko-testo">✗ non corrisponde più</text>
    </g>

    <!-- 4: the attacker rewrites the following prev fields, up to the kept impronta -->
    <g v-after>
      <g v-for="i in [1, 2]" :key="i">
        <rect :x="BX[i]" :y="TOP" :width="W" :height="SEP - TOP" rx="2" class="alterato" />
        <text :x="BX[i] + 96" y="103" text-anchor="end" class="mono prev">prev: H(</text>
        <text :x="BX[i] + 104" y="103" class="mono prev">)</text>
        <path :d="percorso(BX[i])" class="filo-ko" />
        <circle :cx="BX[i] + 100" :cy="PY" r="3" class="punto-ko" />
        <SvFreccia :x1="BX[i] - 40" :y1="MID" :x2="BX[i - 1] + W + 2" :y2="MID" variante="ko" />
        <polygon :points="fulmine" :transform="`translate(${BX[i] + 6},${TOP + 2}) scale(0.8)`" class="fulmine" />
      </g>
      <SvFreccia :x1="795" :y1="37" :x2="BX[2] + W + 2" :y2="MID" angolo="vh" variante="ko" />
      <text x="756" y="42" text-anchor="end" class="ko-testo">✗ non corrisponde</text>
      <text x="440" y="250" text-anchor="middle" class="nota">E se l'attaccante riscrive anche i prev? Cambia l'impronta di ogni blocco successivo…</text>
      <text x="440" y="272" text-anchor="middle" class="didascalia">si arriva sempre all'impronta conservata: la modifica si vede</text>
    </g>
  </svg>
</template>

<style scoped>
.blocco { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.sep { stroke: var(--inchiostro); stroke-width: 1; }
.prev { font-size: 14px; }
.dati { font-size: 16px; }
.filo { fill: none; stroke: var(--rubrica); stroke-width: 2; }
.filo-ko { fill: none; stroke: var(--ko); stroke-width: 2.5; }
.punto { fill: var(--rubrica); }
.testa { font-size: 24px; fill: var(--rubrica); }
.alterato { fill: color-mix(in srgb, var(--ko) 14%, var(--carta)); stroke: var(--ko); stroke-width: 2.5; }
.punto-ko { fill: var(--ko); }
.fulmine { fill: #f6c445; stroke: var(--ko); stroke-width: 1.5; stroke-linejoin: round; }
.ko-testo { font-size: 14px; font-weight: 700; fill: var(--ko); }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
