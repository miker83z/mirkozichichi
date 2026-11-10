<!--
  Diagram (2024 deck, p. 60): the search puzzle as a flowchart. Given the block data k and an unknown x, hash
  k ‖ x and check whether the output falls in the target set Y; if not, change x and try again. Corrected label:
  the unknown is x (the original box was labelled r).
  4 clicks: k (block data) and x = ?; k ‖ x → hash function; the test "uscita ∈ Y?" with the meaning of Y;
  the two exits (yes: x found; no: change x and retry).
  <SchemaPuzzleRicerca />
-->
<template>
  <svg viewBox="0 0 880 255" class="schema" role="img" aria-label="Schema: si concatena k con x, si calcola l'hash e si controlla se l'uscita sta nell'insieme Y">
    <g v-click>
      <text x="105" y="30" text-anchor="middle" class="nota">dato</text>
      <SvRiquadro :x="20" :y="38" :w="170" :h="44" testo="k = dati del blocco" />
      <text x="105" y="126" text-anchor="middle" class="nota">da trovare</text>
      <SvRiquadro :x="20" :y="134" :w="170" :h="44" testo="x = ?" variante="rubrica" />
    </g>
    <g v-click>
      <SvFreccia :x1="190" :y1="62" :x2="236" :y2="96" variante="grigio" />
      <SvFreccia :x1="190" :y1="154" :x2="236" :y2="120" variante="grigio" />
      <SvRiquadro :x="238" :y="86" :w="96" :h="44" testo="k ‖ x" variante="vuoto" mono />
      <SvFreccia :x1="334" :y1="108" :x2="380" :y2="108" />
      <SvRiquadro :x="380" :y="84" :w="130" :h="48" testo="funzione hash" variante="rubrica" />
    </g>
    <g v-click>
      <SvFreccia :x1="510" :y1="108" :x2="564" :y2="108" etichetta="uscita" />
      <polygon points="566,108 650,62 734,108 650,154" class="rombo" />
      <text x="650" y="114" text-anchor="middle" class="tx-16 tx-b">uscita ∈ Y ?</text>
      <text x="440" y="246" text-anchor="middle" class="nota">Y = insieme bersaglio (per esempio: le uscite che iniziano con 0000)</text>
    </g>
    <g v-click>
      <SvFreccia :x1="734" :y1="108" :x2="784" :y2="108" etichetta="sì" variante="ok" />
      <text x="790" y="104" class="tx-16 tx-b tx-ok">✓ x</text>
      <text x="790" y="123" class="tx-16 tx-b tx-ok">trovato</text>
      <path d="M650,154 V208 H105 V184" class="ritorno" />
      <polygon points="105,180 99.5,191 110.5,191" class="punta-ko" />
      <text x="660" y="180" class="tx-15 tx-b tx-ko">no</text>
      <text x="380" y="202" text-anchor="middle" class="tx-15 tx-ko">cambio x e riprovo</text>
    </g>
  </svg>
</template>

<style scoped>
.rombo { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1.5; }
.ritorno { fill: none; stroke: var(--ko); stroke-width: 2; stroke-dasharray: 6 5; }
.punta-ko { fill: var(--ko); }
.tx-15 { font-size: 15px; }
.tx-16 { font-size: 16px; }
.tx-b { font-weight: 700; }
.tx-ok { fill: var(--ok); }
.tx-ko { fill: var(--ko); }
</style>
