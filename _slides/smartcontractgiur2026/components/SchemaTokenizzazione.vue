<!--
  Diagram (new): tokenisation of a real-world asset, with BlackRock's BUIDL as the example. Left, the asset: shares of
  a money-market fund (cash, US Treasury bills, repurchase agreements) held by a custodian; centre, the tokens on a
  blockchain, 1 token = 1 share with a stable value of 1 $, and the register of holders kept on chain by the
  transfer agent; right, investors who exchange the tokens 24/7, only among pre-approved investors, and get the
  dividends as new tokens; bottom, the legal link: the token is only as good as the claim behind it.
  Sources: BlackRock press release "BlackRock Launches Its First Tokenized Fund, BUIDL, on the Ethereum Network",
  20 Mar 2024 (BusinessWire; reprinted e.g. silicon.co.uk): invests 100% in cash, US Treasury bills and repurchase
  agreements; "stable value of $1 per token"; dividends paid "as new tokens each month"; tokens transferable
  "24/7/365 to other pre-approved investors"; BNY Mellon custodian and administrator; Securitize transfer agent and
  tokenisation platform. The fund's size in 2026 is left out: the figures found (rwa.xyz via secondary sites) disagree.
  4 clicks: the asset at the custodian; the token and the register; the investors; the legal link.
  <SchemaTokenizzazione />
-->
<script setup lang="ts">
const MONETE = [384, 434, 484, 534] // tokens on the chain (cx)
const INVESTITORI = [684, 770, 856] // investors (x)
</script>

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: tokenizzazione. Le quote di un fondo stanno presso un custode; dei token su blockchain le rappresentano; gli investitori li scambiano 24 ore su 24; il token vale quanto il diritto giuridico che c'è dietro">
    <!-- 1. Il bene, presso il custode -->
    <g v-click>
      <text x="12" y="15" class="titoletto">il bene reale</text>
      <rect x="10" y="24" width="250" height="176" rx="8" class="bene" />
      <path d="M85,62 L135,38 L185,62 Z" class="edificio" />
      <rect x="89" y="62" width="92" height="6" class="edificio" />
      <rect v-for="c in [96, 118, 140, 162]" :key="c" :x="c" y="70" width="10" height="30" class="edificio" />
      <rect x="85" y="100" width="100" height="8" class="edificio" />
      <text x="135" y="132" text-anchor="middle" class="t15 b">custode</text>
      <text x="135" y="149" text-anchor="middle" class="nota">(per BUIDL: BNY Mellon)</text>
      <text x="135" y="174" text-anchor="middle" class="t14">quote di un fondo monetario</text>
      <text x="135" y="191" text-anchor="middle" class="nota">liquidità, titoli di Stato USA a breve</text>
    </g>

    <!-- 2. Il token, e il registro on chain -->
    <g v-click>
      <SvFreccia :x1="262" :y1="88" :x2="328" :y2="88" variante="rubrica" />
      <text x="332" y="15" class="titoletto">sulla blockchain</text>
      <rect x="330" y="24" width="270" height="176" rx="8" class="catena" />
      <g v-for="cx in MONETE" :key="cx">
        <circle :cx="cx" cy="70" r="19" class="moneta" />
        <text :x="cx" y="75" text-anchor="middle" class="sigla">1 $</text>
      </g>
      <text x="465" y="118" text-anchor="middle" class="t15 b">token BUIDL <tspan class="t13 n grigio">(dal marzo 2024)</tspan></text>
      <text x="465" y="138" text-anchor="middle" class="t14">1 token = 1 quota, stabile a 1 $</text>
      <text x="465" y="168" text-anchor="middle" class="t14">registro dei titolari on chain,</text>
      <text x="465" y="186" text-anchor="middle" class="nota">tenuto dall'agente (Securitize)</text>
    </g>

    <!-- 3. Gli investitori -->
    <g v-click>
      <SvFreccia :x1="602" :y1="60" :x2="648" :y2="60" variante="rubrica" />
      <text x="644" y="15" class="titoletto">investitori</text>
      <SvPersona v-for="x in INVESTITORI.slice(0, 2)" :key="x" :x="x" :y="36" :scala="0.72" />
      <SvPersona :x="INVESTITORI[2] - 20" :y="36" :scala="0.72" />
      <SvFreccia :x1="702" :y1="58" :x2="751" :y2="58" variante="grigio" />
      <SvFreccia :x1="789" :y1="58" :x2="817" :y2="58" variante="grigio" />
      <text x="644" y="122" class="t15 b">scambi 24/7</text>
      <text x="644" y="142" class="t14">solo tra investitori</text>
      <text x="644" y="160" class="t14">pre-approvati</text>
      <text x="644" y="186" class="nota">dividendi: nuovi token</text>
    </g>

    <!-- 4. Il legame giuridico -->
    <g v-click>
      <path d="M465,202 V222 H135 V202" class="legame" />
      <circle cx="465" cy="202" r="4" class="nodo" />
      <circle cx="135" cy="202" r="4" class="nodo" />
      <text x="440" y="252" text-anchor="middle" class="t16 b rosso">il token vale quanto il diritto che c'è dietro</text>
      <text x="440" y="274" text-anchor="middle" class="nota">contratto del fondo, custode, legge applicabile: senza questo legame il token è solo un dato</text>
    </g>
  </svg>
</template>

<style scoped>
.bene { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.edificio { fill: none; stroke: var(--inchiostro); stroke-width: 1.6; stroke-linejoin: round; }
.catena { fill: none; stroke: var(--grigio); stroke-width: 1.2; stroke-dasharray: 5 4; }
.moneta { fill: #d9a520; stroke: #8a6a12; stroke-width: 1.5; }
.sigla { font-size: 13px; font-weight: 700; fill: #3b2a05; }
.legame { fill: none; stroke: var(--rubrica); stroke-width: 2.5; stroke-dasharray: 7 5; }
.nodo { fill: var(--rubrica); }
.t13 { font-size: 13px; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.n { font-weight: 400; }
.rosso { fill: var(--rubrica); }
.grigio { fill: var(--grigio); }
</style>
