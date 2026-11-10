<!--
  Diagram (2024 deck, p. 47), corrected: collisions EXIST (pigeonhole principle: infinitely many inputs, only
  2^256 digests), but nobody can find one (collision resistance). The original title "Cannot have collisions"
  becomes "esistono, ma nessuno sa trovarle".
  4 clicks: the pigeonhole principle (4 objects in 3 drawers, one drawer gets 2); infinite strings → 2^256
  digests ("le collisioni esistono!"); a collision x ≠ y with H(x) = H(y); the corrected banner.
  <SchemaCollisioni />
-->
<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: le collisioni esistono per il principio dei cassetti, ma nessuno sa trovarle">
    <g v-click>
      <text x="150" y="18" text-anchor="middle" class="titoletto">principio dei cassetti</text>
      <circle cx="60" cy="50" r="10" class="oggetto" />
      <circle cx="120" cy="50" r="10" class="oggetto" />
      <circle cx="180" cy="50" r="10" class="oggetto" />
      <circle cx="240" cy="50" r="10" class="oggetto" />
      <SvFreccia :x1="61" :y1="64" :x2="65" :y2="116" variante="grigio" />
      <SvFreccia :x1="123" :y1="64" :x2="138" :y2="116" variante="grigio" />
      <SvFreccia :x1="177" :y1="64" :x2="162" :y2="116" variante="grigio" />
      <SvFreccia :x1="239" :y1="64" :x2="235" :y2="116" variante="grigio" />
      <path d="M30,120 v56 h70 v-56" class="cassetto" />
      <path d="M115,120 v56 h70 v-56" class="cassetto pieno" />
      <path d="M200,120 v56 h70 v-56" class="cassetto" />
      <circle cx="65" cy="162" r="10" class="oggetto" />
      <circle cx="139" cy="162" r="10" class="oggetto doppio" />
      <circle cx="162" cy="162" r="10" class="oggetto doppio" />
      <circle cx="235" cy="162" r="10" class="oggetto" />
      <text x="150" y="202" text-anchor="middle" class="nota">4 oggetti in 3 cassetti: uno ne contiene 2</text>
    </g>
    <g v-click>
      <ellipse cx="392" cy="105" rx="82" ry="80" class="insieme" />
      <text x="376" y="100" text-anchor="middle" class="tx-15">infinite</text>
      <text x="376" y="119" text-anchor="middle" class="tx-15">stringhe</text>
      <ellipse cx="540" cy="105" rx="46" ry="40" class="insieme" />
      <text x="540" y="101" text-anchor="middle" class="tx-15">2<tspan dy="-7" class="tx-13">256</tspan></text>
      <text x="540" y="120" text-anchor="middle" class="tx-15">impronte</text>
      <circle cx="438" cy="58" r="4" class="punto" />
      <circle cx="446" cy="105" r="4" class="punto" />
      <circle cx="438" cy="152" r="4" class="punto" />
      <SvFreccia :x1="442" :y1="61" :x2="497" :y2="88" variante="grigio" />
      <SvFreccia :x1="450" :y1="105" :x2="493" :y2="105" variante="grigio" />
      <SvFreccia :x1="442" :y1="149" :x2="497" :y2="122" variante="grigio" />
      <text x="465" y="208" text-anchor="middle" class="tx-16 tx-b tx-r">le collisioni esistono!</text>
    </g>
    <g v-click>
      <text x="740" y="18" text-anchor="middle" class="titoletto">una collisione</text>
      <circle cx="645" cy="58" r="6" class="punto-x" />
      <text x="630" y="63" text-anchor="end" class="tx-16 tx-b">x</text>
      <circle cx="645" cy="166" r="6" class="punto-x" />
      <text x="630" y="171" text-anchor="end" class="tx-16 tx-b">y</text>
      <text x="645" y="117" text-anchor="middle" class="tx-15">x ≠ y</text>
      <SvFreccia :x1="652" :y1="61" :x2="782" :y2="106" etichetta="H" />
      <SvFreccia :x1="652" :y1="163" :x2="782" :y2="118" etichetta="H" lato="sotto" />
      <circle cx="790" cy="112" r="7" class="punto-h" />
      <text x="800" y="146" text-anchor="middle" class="tx-16 tx-b tx-ko">H(x) = H(y)</text>
      <text x="745" y="208" text-anchor="middle" class="nota">due testi diversi, stessa impronta</text>
    </g>
    <g v-click>
      <rect x="80" y="228" width="720" height="44" rx="8" class="banner" />
      <text x="440" y="256" text-anchor="middle" class="tx-16">le collisioni <tspan class="barrato">non esistono</tspan> <tspan class="tx-b tx-ok">esistono, ma nessuno sa trovarle</tspan></text>
    </g>
  </svg>
</template>

<style scoped>
.oggetto { fill: var(--grigio); }
.oggetto.doppio { fill: var(--ko); }
.cassetto { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.cassetto.pieno { stroke: var(--ko); stroke-width: 2.5; }
.insieme { fill: var(--campo); stroke: var(--grigio); stroke-width: 1.2; }
.punto { fill: var(--grigio); }
.punto-x { fill: var(--rubrica); }
.punto-h { fill: var(--ko); }
.banner { fill: #e8f3ed; stroke: var(--ok); stroke-width: 1.5; }
.barrato { fill: var(--grigio); text-decoration: line-through; text-decoration-color: var(--ko); text-decoration-thickness: 2px; }
.tx-13 { font-size: 13px; }
.tx-15 { font-size: 15px; }
.tx-16 { font-size: 16px; }
.tx-b { font-weight: 700; }
.tx-r { fill: var(--rubrica); }
.tx-ok { fill: var(--ok); }
.tx-ko { fill: var(--ko); }
</style>
