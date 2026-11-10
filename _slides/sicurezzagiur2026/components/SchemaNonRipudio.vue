<!--
  Diagram (new, for 2024 p. 79 "Non ripudio"): non-repudiation as a story in three stations.
  Alice signs a contract with her private key S_Alice → Bob receives contract and signature →
  later a third party (a judge) checks the signature with Alice's public key P_Alice → ✓ →
  "Alice non può negare di averlo firmato": only S_Alice produces a signature that P_Alice accepts.
  4 clicks: Alice signs; Bob receives; the judge verifies; the conclusion.
  <SchemaNonRipudio />
-->
<template>
  <svg viewBox="0 0 880 262" class="schema" role="img" aria-label="Schema: Alice firma, Bob riceve, un terzo verifica con la chiave pubblica di Alice: Alice non può negare">
    <!-- 1. Alice firma -->
    <g v-click>
      <SvPersona :x="50" :y="30" nome="Alice" />
      <SvDocumento :x="100" :y="22" />
      <rect x="126" y="74" width="48" height="22" rx="4" class="sigillo" />
      <text x="150" y="90" text-anchor="middle" class="sigillo-testo">firma</text>
      <SvChiave :x="118" :y="130" tipo="privata" etichetta="S_Alice" />
      <text x="120" y="176" text-anchor="middle" class="nota">Alice firma il contratto</text>
      <text x="120" y="192" text-anchor="middle" class="nota">con la sua chiave privata</text>
    </g>
    <!-- 2. Bob riceve contratto e firma -->
    <g v-click>
      <SvFreccia :x1="190" :y1="56" :x2="306" :y2="56" etichetta="invia" />
      <SvPersona :x="340" :y="30" nome="Bob" />
      <SvDocumento :x="390" :y="22" />
      <rect x="416" y="74" width="48" height="22" rx="4" class="sigillo" />
      <text x="440" y="90" text-anchor="middle" class="sigillo-testo">firma</text>
      <text x="410" y="176" text-anchor="middle" class="nota">Bob riceve</text>
      <text x="410" y="192" text-anchor="middle" class="nota">contratto e firma</text>
    </g>
    <!-- 3. Più tardi, un terzo verifica con la chiave pubblica di Alice -->
    <g v-click>
      <SvFreccia :x1="480" :y1="56" :x2="588" :y2="56" etichetta="più tardi" variante="grigio" />
      <SvPersona :x="624" :y="30" nome="un terzo (giudice)" variante="rubrica" />
      <SvRiquadro :x="672" :y="38" :w="110" :h="36" testo="Verifica" variante="ok" />
      <SvChiave :x="822" :y="56" tipo="pubblica" etichetta="P_Alice" />
      <SvFreccia :x1="809" :y1="56" :x2="784" :y2="56" variante="grigio" />
      <text x="727" y="128" text-anchor="middle" class="esito">✓ firma valida</text>
      <text x="727" y="176" text-anchor="middle" class="nota">verifica la firma</text>
      <text x="727" y="192" text-anchor="middle" class="nota">con la chiave pubblica di Alice</text>
    </g>
    <!-- 4. Conclusione -->
    <g v-click>
      <rect x="170" y="210" width="540" height="48" rx="6" class="riquadro-esito" />
      <text x="440" y="231" text-anchor="middle" class="conclusione">Alice non può negare di averlo firmato</text>
      <text x="440" y="250" text-anchor="middle" class="nota">solo chi ha S<tspan class="pedice">Alice</tspan> può produrre una firma che P<tspan class="pedice">Alice</tspan> accetta</text>
    </g>
  </svg>
</template>

<style scoped>
.sigillo { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1.5; }
.sigillo-testo { font-size: 13px; font-weight: 700; fill: var(--rubrica); }
.esito { font-size: 16px; font-weight: 700; fill: var(--ok); }
.riquadro-esito { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1.5; }
.conclusione { font-size: 18px; font-weight: 700; fill: var(--rubrica); }
</style>
