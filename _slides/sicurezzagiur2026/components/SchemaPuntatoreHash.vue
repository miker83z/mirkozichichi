<!--
  Diagram (2024 deck, p. 69): a hash pointer. On the left the data; on the right the two parts of the hash pointer:
  "dove si trovano" (the pointer, with an arrow to the data) and "impronta dei dati" (their hash, computed from them).
  3 clicks: the data, the pointer with its arrow ("serve per trovarli"), the hash ("serve per verificare che non siano cambiati").
  <SchemaPuntatoreHash />
-->
<template>
  <svg viewBox="0 0 880 240" class="schema" role="img" aria-label="Schema: un puntatore hash indica dove si trovano i dati e ne contiene l'impronta">
    <g v-click>
      <SvRiquadro :x="90" :y="30" :w="220" :h="180" testo="Dati" variante="vuoto" />
      <text x="200" y="150" text-anchor="middle" class="nota">per es. un documento</text>
    </g>
    <g v-click>
      <text x="585" y="40" text-anchor="middle" class="titoletto">puntatore hash (hash pointer)</text>
      <SvRiquadro :x="470" :y="54" :w="230" :h="56" testo="dove si trovano" variante="rubrica" />
      <SvFreccia :x1="470" :y1="82" :x2="312" :y2="82" variante="rubrica" etichetta="punta ai dati" />
      <text x="716" y="87" class="nota">serve per trovarli</text>
    </g>
    <g v-click>
      <SvRiquadro :x="470" :y="110" :w="230" :h="56" testo="impronta dei dati" variante="ok" />
      <SvFreccia :x1="312" :y1="176" :x2="468" :y2="148" variante="grigio" tratteggiata etichetta="H( )" lato="sotto" />
      <text x="716" y="134" class="nota">serve per verificare</text>
      <text x="716" y="151" class="nota">che non siano cambiati</text>
    </g>
  </svg>
</template>
