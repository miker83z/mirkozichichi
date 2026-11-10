<!--
  Diagram (2024 deck, pp. 43 and 46): a hash function H maps a message m, taken from the set of messages of
  any length (a "sì", a contract, a film), to a point H(m) in the much smaller set of fixed-length digests
  (256 bit for SHA-256). 3 clicks: the set of messages with m, the arrow H to the set of digests with H(m),
  the "impronta (digest)" tag on H(m).
  <SchemaFunzioneHash />
-->
<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: la funzione hash porta un messaggio di qualsiasi lunghezza in un'impronta di lunghezza fissa">
    <g v-click>
      <ellipse cx="220" cy="126" rx="200" ry="100" class="insieme" />
      <circle cx="255" cy="60" r="4" class="altro" />
      <text x="265" y="65" class="nota">«sì»</text>
      <circle cx="290" cy="150" r="4" class="altro" />
      <text x="300" y="155" class="nota">un contratto</text>
      <circle cx="130" cy="172" r="4" class="altro" />
      <text x="140" y="177" class="nota">un film (4 GB)</text>
      <circle cx="140" cy="100" r="7" class="punto-m" />
      <text x="126" y="106" text-anchor="end" class="tx-18 tx-b tx-r">m</text>
      <text x="220" y="258" text-anchor="middle" class="tx-16 tx-b">messaggi di qualsiasi lunghezza</text>
    </g>
    <g v-click>
      <ellipse cx="690" cy="126" rx="112" ry="62" class="insieme" />
      <circle cx="735" cy="96" r="4" class="altro" />
      <circle cx="760" cy="146" r="4" class="altro" />
      <circle cx="700" cy="168" r="4" class="altro" />
      <SvFreccia :x1="148" :y1="101" :x2="650" :y2="126" variante="rubrica" />
      <text x="500" y="108" text-anchor="middle" class="tx-20 tx-b tx-r">H</text>
      <circle cx="660" cy="126" r="7" class="punto-h" />
      <text x="660" y="152" text-anchor="middle" class="tx-16 tx-b tx-ok">H(m)</text>
      <text x="690" y="258" text-anchor="middle" class="tx-16 tx-b">impronte di lunghezza fissa (256 bit)</text>
    </g>
    <g v-click>
      <path d="M708,8 h144 a8,8 0 0 1 8,8 v22 a8,8 0 0 1 -8,8 h-112 L668,118 L724,46 h-16 a8,8 0 0 1 -8,-8 v-22 a8,8 0 0 1 8,-8 Z" class="fumetto" />
      <text x="780" y="32" text-anchor="middle" class="tx-16 tx-b tx-ok">impronta (digest)</text>
    </g>
  </svg>
</template>

<style scoped>
.insieme { fill: var(--campo); stroke: var(--grigio); stroke-width: 1.2; }
.altro { fill: var(--grigio); }
.punto-m { fill: var(--rubrica); }
.punto-h { fill: var(--ok); }
.fumetto { fill: color-mix(in srgb, var(--ok) 14%, var(--carta)); stroke: var(--ok); stroke-width: 1.5; }
.tx-16 { font-size: 16px; }
.tx-18 { font-size: 18px; }
.tx-20 { font-size: 20px; }
.tx-b { font-weight: 700; }
.tx-r { fill: var(--rubrica); }
.tx-ok { fill: var(--ok); }
</style>
