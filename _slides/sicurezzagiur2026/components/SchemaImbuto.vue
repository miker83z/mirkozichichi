<!--
  Diagram (2024 deck, p. 64), laid out horizontally and kept low (it sits above a list): a message of any length
  goes into the funnel H and comes out as an impronta of fixed length.
  2 clicks: the message; the funnel H and the impronta.
  <SchemaImbuto />
-->
<template>
  <svg viewBox="0 0 880 150" class="schema" role="img" aria-label="Schema: un messaggio di lunghezza qualsiasi entra nell'imbuto H ed esce come impronta di lunghezza fissa">
    <g v-click>
      <rect x="70" y="20" width="270" height="110" rx="6" class="messaggio" />
      <line v-for="i in 5" :key="i" x1="90" :x2="i === 5 ? 230 : 320" :y1="46 + i * 11" :y2="46 + i * 11" class="riga" />
      <text x="205" y="42" text-anchor="middle" class="tx-16 tx-b">messaggio</text>
      <text x="205" y="122" text-anchor="middle" class="nota">lunghezza qualsiasi</text>
    </g>
    <g v-click>
      <SvFreccia :x1="342" :y1="75" :x2="378" :y2="75" />
      <path d="M380,14 L540,58 V92 L380,136 Z" class="imbuto" />
      <text x="452" y="84" text-anchor="middle" class="tx-26 tx-b tx-r">H</text>
      <SvFreccia :x1="540" :y1="75" :x2="590" :y2="75" />
      <SvRiquadro :x="592" :y="55" :w="130" :h="40" testo="impronta" variante="vuoto" />
      <text x="657" y="114" text-anchor="middle" class="nota">lunghezza fissa (256 bit)</text>
    </g>
  </svg>
</template>

<style scoped>
.messaggio { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.riga { stroke: #c9c7cf; stroke-width: 2; }
.imbuto { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1.5; }
.tx-16 { font-size: 16px; }
.tx-26 { font-size: 26px; }
.tx-b { font-weight: 700; }
.tx-r { fill: var(--rubrica); }
</style>
