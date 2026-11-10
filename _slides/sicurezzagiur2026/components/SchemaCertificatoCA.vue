<!--
  Diagram (2024 deck, p. 87): the certificate of SchemaCertificato (same layout), signed by a
  certification authority. The CA (padlock) signs the certificate with its own private key S_CA: a red
  signature stamp appears in the empty bottom section of the card.
  3 clicks: Alice's certificate; the CA signs it (stamp); "chi si fida della CA si fida del certificato".
  <SchemaCertificatoCA />
-->
<template>
  <svg viewBox="0 0 880 268" class="schema" role="img" aria-label="Schema: l'autorità di certificazione firma il certificato di Alice">
    <!-- 1. Il certificato di Alice -->
    <g v-click>
      <SvPersona :x="150" :y="70" nome="Alice" />
      <rect x="230" y="4" width="380" height="260" rx="6" class="carta" />
      <line x1="230" y1="38" x2="610" y2="38" class="divisorio" />
      <line x1="230" y1="134" x2="610" y2="134" class="divisorio" />
      <line x1="230" y1="192" x2="610" y2="192" class="divisorio" />
      <text x="420" y="27" text-anchor="middle" class="titolo-cert">Certificato digitale</text>
      <text x="248" y="64" class="campo">Nome</text>
      <text x="340" y="64" class="valore">Alice</text>
      <text x="248" y="92" class="campo">Indirizzo</text>
      <text x="340" y="92" class="valore">via Galliera 3</text>
      <text x="248" y="120" class="campo">Email</text>
      <text x="340" y="120" class="valore">alice@studio-legale-esempio.it</text>
      <text x="248" y="168" class="campo">Chiave pubblica</text>
      <SvChiave :x="384" :y="168" tipo="pubblica" etichetta="P_Alice" />
    </g>
    <!-- 2. La CA firma il certificato -->
    <g v-click>
      <text x="752" y="180" text-anchor="middle" class="titoletto">Autorità di certificazione (CA)</text>
      <SvLucchetto :x="692" :y="210" :scala="1.3" />
      <SvChiave :x="770" :y="226" tipo="privata" etichetta="S_CA" />
      <SvFreccia :x1="684" :y1="228" :x2="612" :y2="228" etichetta="firma" variante="rubrica" />
      <circle cx="292" cy="228" r="24" class="timbro" />
      <circle cx="292" cy="228" r="19" class="timbro" />
      <text x="292" y="233" text-anchor="middle" class="timbro-sigla">CA</text>
      <text x="330" y="224" class="timbro-testo">firma della CA</text>
      <text x="330" y="244" class="nota">su tutti i dati del certificato</text>
    </g>
    <!-- 3. La fiducia -->
    <g v-click>
      <text x="752" y="78" text-anchor="middle" class="fiducia">chi si fida della CA</text>
      <text x="752" y="102" text-anchor="middle" class="fiducia">si fida del certificato</text>
    </g>
  </svg>
</template>

<style scoped>
.carta { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.divisorio { stroke: var(--linea); stroke-width: 1.5; }
.titolo-cert { font-family: var(--serif); font-size: 17px; font-weight: 600; fill: var(--rubrica); }
.campo { font-size: 15px; fill: var(--grigio); }
.valore { font-size: 16px; }
.timbro { fill: none; stroke: var(--rubrica); stroke-width: 2; }
.timbro-sigla { font-size: 15px; font-weight: 700; fill: var(--rubrica); }
.timbro-testo { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
.fiducia { font-size: 17px; font-weight: 700; fill: var(--ok); }
</style>
