<!--
  Diagram (new, slide "Chi sono"): what it means to write the open source software of a blockchain for a
  foundation. The foundation writes the code; the code is public and anyone can read it, propose changes and
  report flaws (paid through a bug bounty); a new version reaches the network only if the independent
  validators install it: on IOTA it activates at an epoch change when validators with at least 83.34% of the
  voting power support it, otherwise the network stays as it is (iotaledger/iota code; version 39 activated on
  5/11/2026; 61 validators on 10/11/2026). The foundation writes the software but does not run the network.
  5 clicks: foundation → code; anyone ↔ code; new version → validators; ≥ 83% → network; the caption.
  <SchemaOpenSource />
-->
<template>
  <svg viewBox="0 0 880 262" class="schema" role="img" aria-label="Schema: la fondazione scrive il codice open source; chiunque lo legge e segnala falle; i validatori indipendenti decidono se installare una nuova versione, che si attiva con l'83% del voto">
    <g v-click>
      <SvRiquadro :x="10" :y="20" :w="168" :h="64" testo="IOTA Foundation\n(fondazione, Berlino)" variante="vuoto" />
      <SvFreccia :x1="178" :y1="52" :x2="262" :y2="52" etichetta="scrive" />
      <SvRiquadro :x="264" :y="20" :w="190" :h="64" testo="codice open source\n(pubblico)" variante="rubrica" />
    </g>
    <g v-click>
      <SvPersona :x="310" :y="168" :scala="0.75" nome="chiunque" />
      <SvPersona :x="372" :y="168" :scala="0.75" />
      <SvPersona :x="410" :y="168" :scala="0.75" />
      <SvFreccia :x1="359" :y1="160" :x2="359" :y2="86" variante="grigio" />
      <text x="372" y="118" class="nota">legge, propone modifiche,</text>
      <text x="372" y="134" class="nota">segnala falle (bug bounty)</text>
    </g>
    <g v-click>
      <SvFreccia :x1="454" :y1="52" :x2="548" :y2="52" etichetta="nuova versione" />
      <SvRiquadro :x="550" :y="20" :w="160" :h="64" testo="validatori\nindipendenti (61)" variante="campo" />
      <text x="630" y="104" text-anchor="middle" class="nota">decidono se installarla</text>
    </g>
    <g v-click>
      <SvFreccia :x1="710" :y1="52" :x2="760" :y2="52" />
      <SvRiquadro :x="762" :y="20" :w="108" :h="64" testo="rete\nIOTA" variante="ok" />
      <text x="816" y="104" text-anchor="middle" class="nota t-ok">si aggiorna solo con</text>
      <text x="816" y="120" text-anchor="middle" class="nota t-ok b">≥ 83% del voto</text>
      <text x="816" y="136" text-anchor="middle" class="nota">altrimenti resta com'è</text>
    </g>
    <g v-click>
      <text x="440" y="246" text-anchor="middle" class="didascalia">la fondazione scrive il software, ma non comanda la rete</text>
    </g>
  </svg>
</template>

<style scoped>
.t-ok { fill: var(--ok); }
.b { font-weight: 700; }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
