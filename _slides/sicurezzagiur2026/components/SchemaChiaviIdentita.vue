<!--
  Diagram (2024 deck, p. 118): keys as identity. A person ("Mirko Zichichi") is associated with a public address
  (alphanumeric string); underneath, how the address is obtained: private key → public key → hash → address.
  The address is illustrative.
  3 clicks: the person; the arrow "associato a" with the address; the derivation of the address.
  <SchemaChiaviIdentita />
-->
<template>
  <svg viewBox="0 0 880 250" class="schema" role="img" aria-label="Schema: una persona è associata a un indirizzo pubblico, derivato dalla sua chiave">
    <g v-click>
      <SvRiquadro :x="40" :y="26" :w="240" :h="60" testo="Mirko Zichichi" variante="vuoto" />
    </g>
    <g v-click>
      <SvFreccia :x1="282" :y1="56" :x2="518" :y2="56" etichetta="associato a" />
      <SvRiquadro :x="520" :y="26" :w="300" :h="60" testo="0x7c3f9a1e…b42d" variante="ok" mono />
      <text x="670" y="110" text-anchor="middle" class="rosso">indirizzo pubblico (alfanumerico)</text>
    </g>
    <g v-click>
      <rect x="60" y="132" width="760" height="112" rx="8" class="cornice" />
      <text x="76" y="154" class="nota">come si ottiene l'indirizzo: dalla chiave privata si arriva all'indirizzo, non viceversa</text>
      <SvChiave :x="120" :y="190" tipo="privata" />
      <text x="137" y="226" text-anchor="middle" class="etichetta privata">chiave privata</text>
      <SvFreccia :x1="190" :y1="190" :x2="262" :y2="190" />
      <SvChiave :x="290" :y="190" tipo="pubblica" />
      <text x="307" y="226" text-anchor="middle" class="etichetta pubblica">chiave pubblica</text>
      <SvFreccia :x1="360" :y1="190" :x2="432" :y2="190" />
      <SvRiquadro :x="434" :y="170" :w="110" :h="40" testo="hash" variante="vuoto" />
      <SvFreccia :x1="544" :y1="190" :x2="616" :y2="190" />
      <SvRiquadro :x="618" :y="170" :w="180" :h="40" testo="indirizzo" variante="ok" />
    </g>
  </svg>
</template>

<style scoped>
.rosso { font-size: 15px; fill: var(--rubrica); }
.cornice { fill: none; stroke: var(--linea); stroke-width: 1.5; stroke-dasharray: 6 5; }
.etichetta { font-size: 14px; font-weight: 700; }
.privata { fill: var(--rubrica); }
.pubblica { fill: var(--ok); }
</style>
