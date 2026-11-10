<!--
  Diagram (new): the blockchain (scalability) trilemma as a triangle: decentralizzazione (top), sicurezza
  (bottom left), scalabilità (bottom right); with simple techniques a design gets at most two of the three
  well. Examples: Bitcoin on the decentralization-security side (every participant verifies every
  transaction, so few transactions per second); a centralized database near scalability (fast, but one
  operator to trust). Layer 2 as a way out: an arrow from Bitcoin towards scalability (transactions move
  off the main chain, which stays the guarantor).
  Sources: V. Buterin, "Why sharding is great" (vitalik.eth.limo/general/2021/04/07/sharding.html): "if you
  stick to 'simple' techniques, you can only get two of those three"; "traditional blockchains, including
  Bitcoin ... have decentralization and security, but not scalability". ethereum.org/en/developers/docs/
  scaling: layer 2 handles transactions off Mainnet while relying on its security. Poon & Dryja, The
  Bitcoin Lightning Network (2016): Bitcoin supports "less than 7 transactions per second".
  4 clicks: the triangle and the rule; the vertices; the examples; the Layer 2 arrow.
  <SchemaTrilemma />
-->
<template>
  <svg viewBox="0 0 880 284" class="schema" role="img" aria-label="Schema: il trilemma della blockchain tra decentralizzazione, sicurezza e scalabilità; Bitcoin, database centralizzato e Layer 2">
    <!-- 1. Il triangolo e la regola -->
    <g v-click>
      <polygon points="270,60 80,232 460,232" class="triangolo" />
      <text x="600" y="64" class="titolo">Due su tre</text>
      <text x="600" y="90" class="testo">con tecniche semplici si ottengono</text>
      <text x="600" y="110" class="testo">al massimo <tspan class="forte">due proprietà su tre</tspan></text>
      <text x="600" y="130" class="nota">(V. Buterin)</text>
    </g>

    <!-- 2. I vertici -->
    <g v-click>
      <circle cx="270" cy="60" r="6" class="vertice" />
      <circle cx="80" cy="232" r="6" class="vertice" />
      <circle cx="460" cy="232" r="6" class="vertice" />
      <text x="270" y="24" text-anchor="middle" class="forte">Decentralizzazione</text>
      <text x="270" y="42" text-anchor="middle" class="nota">molti nodi indipendenti</text>
      <text x="20" y="256" class="forte">Sicurezza</text>
      <text x="20" y="273" class="nota">difficile da attaccare</text>
      <text x="520" y="256" text-anchor="end" class="forte">Scalabilità</text>
      <text x="520" y="273" text-anchor="end" class="nota">molte transazioni al secondo</text>
    </g>

    <!-- 3. Gli esempi -->
    <g v-click>
      <circle cx="175" cy="146" r="8" class="esempio" />
      <text x="160" y="142" text-anchor="end" class="forte">Bitcoin</text>
      <circle cx="422" cy="214" r="8" class="esempio" />
      <text x="406" y="219" text-anchor="end" class="testo">database centralizzato</text>
      <text x="600" y="168" class="piccolo"><tspan class="forte">Bitcoin</tspan>: decentralizzato e sicuro,</text>
      <text x="600" y="186" class="piccolo">ma poche transazioni al secondo</text>
      <text x="600" y="212" class="piccolo"><tspan class="forte">database centralizzato</tspan>: veloce,</text>
      <text x="600" y="230" class="piccolo">ma ci si fida di un solo gestore</text>
    </g>

    <!-- 4. La via d'uscita: Layer 2 -->
    <g v-click>
      <SvFreccia :x1="186" :y1="151" :x2="318" :y2="186" variante="rubrica" />
      <text x="326" y="192" class="forte rosso">Layer 2</text>
      <text x="600" y="258" class="piccolo rosso"><tspan class="forte">Layer 2</tspan>: le transazioni escono</text>
      <text x="600" y="276" class="piccolo rosso">dalla catena, che resta garante</text>
    </g>
  </svg>
</template>

<style scoped>
.triangolo { fill: color-mix(in srgb, var(--campo) 60%, var(--carta)); stroke: var(--inchiostro); stroke-width: 2; stroke-linejoin: round; }
.vertice { fill: var(--inchiostro); }
.esempio { fill: var(--glossa); stroke: var(--carta); stroke-width: 2; }
.titolo { font-size: 18px; font-weight: 700; }
.testo { font-size: 15px; }
.piccolo { font-size: 14px; }
.forte { font-size: 16px; font-weight: 700; }
.piccolo .forte { font-size: 14px; }
.testo .forte { font-size: 15px; }
.schema .rosso { fill: var(--rubrica); }
</style>
