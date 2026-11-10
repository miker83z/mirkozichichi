<!--
  Diagram (2024 deck, p. 65): how SHA-256 works (Merkle–Damgård construction). The message is split into blocks of
  512 bit, the last one completed by the padding (riempimento). Starting from a fixed initial value IV (256 bit),
  the compression function c takes the current 256-bit state and one block and gives the next state; the last
  state is the impronta (256 bit).
  5 clicks: the message blocks; IV; the first c; the remaining c; the final impronta.
  <SchemaSha256 />
-->
<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: SHA-256 elabora il messaggio a blocchi con la funzione di compressione partendo dal vettore IV">
    <g v-click>
      <text x="200" y="40" text-anchor="middle" class="nota">512 bit ciascuno</text>
      <SvRiquadro :x="155" :y="48" :w="90" :h="46" testo="blocco 1" piccolo />
      <SvRiquadro :x="295" :y="48" :w="90" :h="46" testo="blocco 2" piccolo />
      <text x="450" y="78" text-anchor="middle" class="tx-22 tx-b tx-g">…</text>
      <SvRiquadro :x="515" :y="48" :w="90" :h="46" testo="blocco n" piccolo />
      <rect x="609" y="48" width="22" height="46" rx="3" class="riempimento" />
      <path d="M620,46 L640,24" class="richiamo" />
      <text x="644" y="22" class="nota">riempimento</text>
    </g>
    <g v-click>
      <text x="70" y="120" text-anchor="middle" class="nota">256 bit</text>
      <ellipse cx="70" cy="155" rx="40" ry="26" class="iv" />
      <text x="70" y="161" text-anchor="middle" class="tx-16 tx-b">IV</text>
      <text x="20" y="232" class="tx-15">IV = vettore di inizializzazione (un valore fisso, sempre lo stesso)</text>
    </g>
    <g v-click>
      <SvFreccia :x1="200" :y1="94" :x2="200" :y2="128" />
      <SvFreccia :x1="110" :y1="155" :x2="178" :y2="155" />
      <path d="M180,130 h30 l10,10 v40 h-40 Z" class="compressione" />
      <text x="200" y="161" text-anchor="middle" class="tx-16 tx-b">c</text>
      <text x="20" y="256" class="tx-15">c = funzione di compressione</text>
    </g>
    <g v-click>
      <SvFreccia :x1="340" :y1="94" :x2="340" :y2="128" />
      <SvFreccia :x1="560" :y1="94" :x2="560" :y2="128" />
      <SvFreccia :x1="220" :y1="155" :x2="318" :y2="155" />
      <text x="270" y="177" text-anchor="middle" class="nota">256 bit</text>
      <path d="M320,130 h30 l10,10 v40 h-40 Z" class="compressione" />
      <text x="340" y="161" text-anchor="middle" class="tx-16 tx-b">c</text>
      <SvFreccia :x1="360" :y1="155" :x2="538" :y2="155" tratteggiata />
      <path d="M540,130 h30 l10,10 v40 h-40 Z" class="compressione" />
      <text x="560" y="161" text-anchor="middle" class="tx-16 tx-b">c</text>
    </g>
    <g v-click>
      <SvFreccia :x1="580" :y1="155" :x2="660" :y2="155" variante="ok" />
      <ellipse cx="730" cy="155" rx="68" ry="30" class="impronta" />
      <text x="730" y="161" text-anchor="middle" class="tx-16 tx-b tx-ok">impronta</text>
      <text x="730" y="114" text-anchor="middle" class="tx-15 tx-b tx-r">256 bit</text>
    </g>
  </svg>
</template>

<style scoped>
.riempimento { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1.2; stroke-dasharray: 4 3; }
.richiamo { fill: none; stroke: var(--grigio); stroke-width: 1; }
.iv { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1.5; stroke-dasharray: 5 4; }
.compressione { fill: #fbf3d9; stroke: #8a6d1f; stroke-width: 1.5; }
.impronta { fill: #e8f3ed; stroke: var(--ok); stroke-width: 1.5; }
.tx-15 { font-size: 15px; }
.tx-16 { font-size: 16px; }
.tx-22 { font-size: 22px; }
.tx-b { font-weight: 700; }
.tx-r { fill: var(--rubrica); }
.tx-g { fill: var(--grigio); }
.tx-ok { fill: var(--ok); }
</style>
