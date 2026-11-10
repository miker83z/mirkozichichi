<!--
  Diagram (new): the oracle problem. A smart contract sees only the data on its blockchain: it cannot read
  the outside world (prices, weather, sports results), because every node must reach the same result.
  An oracle brings the datum on chain, so the contract is only as trustworthy as its oracle (one oracle =
  one point of trust: if it errs or lies, the contract executes anyway). Decentralised oracles: several
  independent oracles report the datum and the values are aggregated (e.g. the median), so a single wrong
  value is not enough.
  Sources: ethereum.org/developers/docs/oracles ("smart contracts cannot, by default, access information
  stored outside the blockchain network"; determinism; "Data from an oracle must be correct for a smart
  contract to execute correctly"; decentralised oracles query several nodes and aggregate, e.g. mean or median).
  4 clicks: the contract alone on its blockchain; the outside world, out of reach (padlock); a single oracle
  (risk, orange); several oracles aggregated by the median (green).
  <SchemaOracolo />
-->

<template>
  <svg viewBox="0 0 880 284" class="schema" role="img" aria-label="Schema: il problema dell'oracolo; il contratto non legge il mondo esterno, un oracolo gli porta i dati, più oracoli aggregati riducono il rischio">
    <!-- 1. il contratto, isolato sulla sua blockchain -->
    <g v-click>
      <text x="24" y="20" class="titoletto">blockchain</text>
      <rect x="10" y="28" width="310" height="200" rx="14" class="confine" />
      <SvDocumento :x="56" :y="94" />
      <text x="83" y="182" text-anchor="middle" class="t14 b">smart contract</text>
      <text x="165" y="216" text-anchor="middle" class="nota">vede solo i dati sulla blockchain</text>
    </g>
    <!-- 2. il mondo esterno, fuori portata -->
    <g v-click>
      <text x="656" y="20" class="titoletto">mondo esterno</text>
      <rect x="640" y="28" width="230" height="200" rx="14" class="mondo" />
      <polyline points="664,82 676,70 686,76 698,58 710,64" class="grafico" />
      <text x="728" y="75" class="t14">prezzi</text>
      <circle cx="686" cy="128" r="9" class="sole" />
      <path d="M686,112 v-5 M686,144 v5 M670,128 h-5 M702,128 h5 M675,117 l-4,-4 M697,139 l4,4 M675,139 l-4,4 M697,117 l4,-4" class="raggi" />
      <text x="728" y="133" class="t14">meteo</text>
      <rect x="666" y="174" width="42" height="26" rx="3" class="tabellone" />
      <text x="687" y="192" text-anchor="middle" class="mono t14">2–1</text>
      <text x="728" y="192" class="t14">risultati</text>
      <SvLucchetto :x="306" :y="86" />
      <text x="480" y="20" text-anchor="middle" class="t14">il contratto non può leggerli da solo</text>
    </g>
    <!-- 3. un solo oracolo: un solo punto di fiducia -->
    <g v-click>
      <SvFreccia :x1="638" :y1="130" :x2="562" :y2="130" etichetta="dato" />
      <SvRiquadro :x="420" :y="112" :w="140" :h="36" testo="oracolo" />
      <SvFreccia :x1="418" :y1="130" :x2="114" :y2="130" variante="ko" />
      <text x="10" y="254" class="t15 b arancio">un solo oracolo: il contratto è affidabile quanto lui <tspan class="nota normale">(se sbaglia o mente, il contratto esegue lo stesso)</tspan></text>
    </g>
    <!-- 4. più oracoli, valori aggregati -->
    <g v-click>
      <SvFreccia :x1="638" :y1="60" :x2="562" :y2="60" />
      <SvFreccia :x1="638" :y1="200" :x2="562" :y2="200" />
      <SvRiquadro :x="420" :y="42" :w="140" :h="36" testo="oracolo" />
      <SvRiquadro :x="420" :y="182" :w="140" :h="36" testo="oracolo" />
      <SvFreccia :x1="418" :y1="60" :x2="250" :y2="110" angolo="hv" variante="ok" />
      <SvFreccia :x1="418" :y1="200" :x2="250" :y2="150" angolo="hv" variante="ok" />
      <SvFreccia :x1="418" :y1="130" :x2="302" :y2="130" variante="ok" />
      <SvRiquadro :x="200" :y="112" :w="100" :h="36" testo="mediana" variante="ok" />
      <SvFreccia :x1="198" :y1="130" :x2="114" :y2="130" variante="ok" />
      <text x="10" y="277" class="t15 b verde">più oracoli indipendenti, valori aggregati: un errore isolato non basta</text>
    </g>
  </svg>
</template>

<style scoped>
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.b { font-weight: 700; }
.confine { fill: none; stroke: var(--inchiostro); stroke-width: 2; stroke-dasharray: 7 5; }
.mondo { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.grafico { fill: none; stroke: var(--rubrica); stroke-width: 2.5; stroke-linejoin: round; }
.sole { fill: var(--glossa); }
.raggi { stroke: var(--glossa); stroke-width: 2.5; stroke-linecap: round; }
.tabellone { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.2; }
.arancio { fill: var(--ko); }
.verde { fill: var(--ok); }
.normale { font-weight: 400; }
</style>
