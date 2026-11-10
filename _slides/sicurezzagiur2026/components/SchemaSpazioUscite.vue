<!--
  Diagram (2024 deck, pp. 61–63): the search puzzle seen on the space of all hash outputs. The target set Y is
  a small part of it; every try lands on a random point, like a coin toss, until one lands inside Y. The smaller
  Y, the harder the puzzle (on average about 2^256 / |Y| tries).
  5 clicks: the bar of all possible outputs; the target set Y; tries 1, 2, 3 outside Y ("come un lancio di
  moneta"); the n-th try inside Y ✓; a second bar with a much smaller Y and many tries, "più Y è piccolo, più il
  puzzle è difficile".
  <SchemaSpazioUscite />
-->
<script setup lang="ts">
// Points of the second bar: many tries, all outside the tiny Y (fixed, so that the PDF shows the same picture).
const tantiTentativi = [96, 141, 188, 230, 287, 330, 371, 419, 468, 512, 553, 604, 641, 689, 733, 778, 822]
</script>

<template>
  <svg viewBox="0 0 880 258" class="schema" role="img" aria-label="Schema: lo spazio delle uscite dell'hash, l'insieme bersaglio Y e i tentativi che cadono a caso">
    <g v-click>
      <text x="440" y="20" text-anchor="middle" class="tx-15">tutte le possibili uscite dell'hash</text>
      <path d="M32,32 H848" class="doppia" />
      <polygon points="30,32 40,27 40,37" class="punta" />
      <polygon points="850,32 840,27 840,37" class="punta" />
      <rect x="30" y="62" width="820" height="26" class="barra" />
    </g>
    <g v-click>
      <rect x="30" y="62" width="80" height="26" class="bersaglio" />
      <path d="M30,94 v8 h80 v-8" class="graffa-ko" />
      <text x="30" y="120" class="tx-15 tx-b tx-ko">insieme bersaglio Y</text>
    </g>
    <g v-click>
      <circle cx="520" cy="75" r="7" class="tentativo" />
      <text x="520" y="54" text-anchor="middle" class="tx-14">1° ✗</text>
      <circle cx="262" cy="75" r="7" class="tentativo" />
      <text x="262" y="54" text-anchor="middle" class="tx-14">2° ✗</text>
      <circle cx="764" cy="75" r="7" class="tentativo" />
      <text x="764" y="54" text-anchor="middle" class="tx-14">3° ✗</text>
      <text x="480" y="120" text-anchor="middle" class="tx-15">come un lancio di moneta: ogni tentativo cade in un punto a caso</text>
    </g>
    <g v-click>
      <circle cx="72" cy="75" r="8" class="vincente" />
      <text x="72" y="54" text-anchor="middle" class="tx-14 tx-b tx-ok">n-esimo ✓</text>
    </g>
    <g v-click>
      <text x="30" y="164" class="tx-15">con un Y più piccolo:</text>
      <rect x="30" y="174" width="820" height="18" class="barra" />
      <rect x="30" y="174" width="12" height="18" class="bersaglio" />
      <circle v-for="x in tantiTentativi" :key="x" :cx="x" cy="183" r="4" class="tentativo" />
      <text x="440" y="226" text-anchor="middle" class="tx-18 tx-b tx-r">più Y è piccolo, più il puzzle è difficile</text>
      <text x="440" y="248" text-anchor="middle" class="nota">servono in media molti più tentativi</text>
    </g>
  </svg>
</template>

<style scoped>
.doppia { fill: none; stroke: var(--grigio); stroke-width: 1.5; }
.punta { fill: var(--grigio); }
.barra { fill: #e6ecf4; stroke: #9aa9bd; stroke-width: 1.2; }
.bersaglio { fill: #f4b88f; stroke: var(--ko); stroke-width: 1.5; }
.graffa-ko { fill: none; stroke: var(--ko); stroke-width: 1.5; }
.tentativo { fill: var(--inchiostro); }
.vincente { fill: var(--ok); stroke: var(--carta); stroke-width: 2; }
.tx-14 { font-size: 14px; }
.tx-15 { font-size: 15px; }
.tx-18 { font-size: 18px; }
.tx-b { font-weight: 700; }
.tx-r { fill: var(--rubrica); }
.tx-ok { fill: var(--ok); }
.tx-ko { fill: var(--ko); }
</style>
