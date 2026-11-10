<!--
  Diagram (new, for 2024 p. 100, corrected: verifiable automatically, several signatures in sequence):
  PAdES, the signature inside the PDF. Signature 1 (Alice) is embedded in the PDF and covers its content;
  signature 2 (Bob) is appended as an incremental update and covers content + signature 1 ("in
  sequenza"); the file still opens in an ordinary PDF reader, which shows and checks the signatures.
  3 clicks: signature 1; signature 2 as incremental update; the PDF reader.
  <SchemaPades />
-->
<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: firme PAdES in sequenza dentro un PDF, lette da un normale lettore PDF">
    <!-- 1. Firma 1 incorporata nel PDF -->
    <g v-click>
      <path d="M190,6 h172 l18,18 v170 h-190 Z" class="pagina" />
      <path d="M362,6 v18 h18" class="pagina" />
      <text x="204" y="30" class="pdf">PDF</text>
      <line x1="206" y1="52" x2="360" y2="52" class="testo-finto" />
      <line x1="206" y1="70" x2="350" y2="70" class="testo-finto" />
      <line x1="206" y1="88" x2="358" y2="88" class="testo-finto" />
      <line x1="206" y1="106" x2="330" y2="106" class="testo-finto" />
      <text x="206" y="130" class="nota">contenuto</text>
      <SvRiquadro :x="206" :y="144" :w="158" :h="36" testo="firma 1 (Alice)" variante="rubrica" />
      <path d="M180,40 h-8 v80 h8" class="graffa" />
      <text x="164" y="76" text-anchor="end" class="spiega">la firma 1</text>
      <text x="164" y="95" text-anchor="end" class="spiega">copre il contenuto</text>
    </g>
    <!-- 2. Firma 2 come aggiornamento incrementale -->
    <g v-click>
      <rect x="190" y="200" width="190" height="56" rx="4" class="aggiunta" />
      <SvRiquadro :x="206" :y="210" :w="158" :h="36" testo="firma 2 (Bob)" variante="rubrica" />
      <text x="285" y="274" text-anchor="middle" class="nota">aggiornamento incrementale</text>
      <path d="M390,40 h8 v142 h-8" class="graffa" />
      <text x="410" y="96" class="spiega">la firma 2 copre</text>
      <text x="410" y="115" class="spiega">contenuto + firma 1</text>
      <text x="410" y="140" class="forte">in sequenza</text>
    </g>
    <!-- 3. Si apre con un normale lettore PDF -->
    <g v-click>
      <rect x="610" y="30" width="260" height="196" rx="6" class="finestra" />
      <path d="M610,36 a6,6 0 0 1 6,-6 h248 a6,6 0 0 1 6,6 v20 h-260 Z" class="barra" />
      <text x="624" y="49" class="titolo-finestra">Lettore PDF</text>
      <rect x="620" y="64" width="240" height="30" rx="3" class="banda" />
      <text x="740" y="84" text-anchor="middle" class="banda-testo">✓ Firmato, firme valide</text>
      <rect x="690" y="104" width="100" height="112" class="foglio" />
      <line x1="702" y1="122" x2="778" y2="122" class="testo-finto" />
      <line x1="702" y1="138" x2="770" y2="138" class="testo-finto" />
      <line x1="702" y1="154" x2="776" y2="154" class="testo-finto" />
      <line x1="702" y1="170" x2="760" y2="170" class="testo-finto" />
      <text x="740" y="252" text-anchor="middle" class="forte-nero">si apre con un normale</text>
      <text x="740" y="272" text-anchor="middle" class="forte-nero">lettore PDF</text>
    </g>
  </svg>
</template>

<style scoped>
.pagina { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.pdf { font-size: 14px; font-weight: 700; fill: var(--rubrica); }
.testo-finto { stroke: var(--linea); stroke-width: 3; }
.graffa { fill: none; stroke: var(--rubrica); stroke-width: 2; }
.spiega { font-size: 15px; fill: var(--rubrica); }
.forte { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
.forte-nero { font-size: 16px; font-weight: 700; }
.aggiunta { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; stroke-dasharray: 6 4; }
.finestra { fill: var(--campo); stroke: var(--grigio); stroke-width: 1.5; }
.barra { fill: var(--carta); stroke: var(--grigio); stroke-width: 1.5; }
.titolo-finestra { font-size: 14px; fill: var(--grigio); }
.banda { fill: #e8f3ed; stroke: var(--ok); stroke-width: 1.2; }
.banda-testo { font-size: 15px; font-weight: 700; fill: var(--ok); }
.foglio { fill: var(--carta); stroke: var(--linea); stroke-width: 1.2; }
</style>
