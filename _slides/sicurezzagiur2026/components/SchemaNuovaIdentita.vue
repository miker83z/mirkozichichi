<!--
  Diagram (2024 deck, p. 119): how to create a new identity. One generates a key pair (sk, pk). The private key sk
  (red) stays with the owner and lets him speak in the identity's name (he signs); the public key pk (green), through
  a hash, gives the address: the identity's name, a pseudonym. The address is illustrative.
  4 clicks: the key generation; the sk branch; the pk → hash → address branch; the caption
  "nessuna autorità: chiunque può crearne quante vuole".
  <SchemaNuovaIdentita />
-->
<template>
  <svg viewBox="0 0 880 275" class="schema" role="img" aria-label="Schema: si genera una coppia di chiavi; la privata resta al titolare e firma, la pubblica dà l'indirizzo">
    <g v-click>
      <SvRiquadro :x="16" :y="100" :w="210" :h="64" :testo="'genera una coppia\ndi chiavi (sk, pk)'" variante="rubrica" />
    </g>
    <g v-click>
      <SvFreccia :x1="121" :y1="100" :x2="272" :y2="46" angolo="vh" variante="rubrica" />
      <SvChiave :x="290" :y="46" tipo="privata" etichetta="sk" />
      <SvPersona :x="384" :y="12" :scala="0.7" />
      <text x="414" y="38" class="b rosso">resta al titolare, segreta</text>
      <text x="414" y="60" class="t15">parla a nome dell'identità: <tspan class="b">firma</tspan></text>
    </g>
    <g v-click>
      <SvFreccia :x1="121" :y1="164" :x2="272" :y2="214" angolo="vh" variante="rubrica" />
      <SvChiave :x="290" :y="214" tipo="pubblica" etichetta="pk" />
      <SvFreccia :x1="346" :y1="214" :x2="408" :y2="214" />
      <SvRiquadro :x="410" :y="194" :w="96" :h="40" testo="Hash" variante="vuoto" />
      <SvFreccia :x1="506" :y1="214" :x2="568" :y2="214" />
      <SvRiquadro :x="570" :y="194" :w="200" :h="40" testo="0x7c3f…b42d" variante="ok" mono />
      <text x="670" y="164" text-anchor="middle" class="b verde">indirizzo: il nome dell'identità</text>
      <text x="670" y="184" text-anchor="middle" class="nota">uno pseudonimo</text>
    </g>
    <g v-click>
      <text x="440" y="266" text-anchor="middle" class="didascalia">nessuna autorità: chiunque può crearne quante vuole</text>
    </g>
  </svg>
</template>

<style scoped>
.t15 { font-size: 15px; }
.b { font-size: 15px; font-weight: 700; }
.rosso { fill: var(--rubrica); }
.verde { fill: var(--ok); }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
