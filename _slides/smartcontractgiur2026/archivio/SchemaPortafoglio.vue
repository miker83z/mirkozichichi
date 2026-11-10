<!--
  Diagram (2024 deck, p. 121, originally a screenshot of a Bitcoin wallet): a mock wallet window, tab "Invia", with
  the recipient (a bc1q… address: the example address of BIP 173, purely illustrative) and the amount 0,2 BTC; then
  the confirmation dialog; then the point: the recipient is only an address, no name.
  3 clicks: the wallet window; the confirmation dialog; the note "il destinatario è solo un indirizzo: nessun nome".
  <SchemaPortafoglio />
-->
<script setup lang="ts">
const INDIRIZZO = 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4'
const BREVE = `${INDIRIZZO.slice(0, 10)}…${INDIRIZZO.slice(-6)}`
const SCHEDE = [
  { t: 'Panoramica', x: 36 },
  { t: 'Invia', x: 140 },
  { t: 'Ricevi', x: 200 },
  { t: 'Transazioni', x: 268 },
]
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: un portafoglio invia 0,2 BTC a un indirizzo, senza alcun nome del destinatario">
    <g v-click>
      <rect x="20" y="8" width="540" height="212" rx="8" class="finestra" />
      <path d="M20,36 V16 a8,8 0 0 1 8,-8 H552 a8,8 0 0 1 8,8 V36 Z" class="barra" />
      <circle cx="38" cy="22" r="5" class="pallino" />
      <circle cx="54" cy="22" r="5" class="pallino" />
      <circle cx="70" cy="22" r="5" class="pallino" />
      <text x="290" y="27" text-anchor="middle" class="t14 b">Portafoglio</text>
      <line x1="20" y1="64" x2="560" y2="64" class="sottile" />
      <text v-for="s in SCHEDE" :key="s.t" :x="s.x" y="56" :class="['t14', s.t === 'Invia' ? 'attiva' : 'scheda']">{{ s.t }}</text>
      <line x1="138" y1="62" x2="178" y2="62" class="sottolinea" />
      <text x="36" y="99" class="t14">Destinatario:</text>
      <rect x="132" y="80" width="412" height="28" rx="3" class="campo" />
      <text x="142" y="99" class="mono t13">{{ INDIRIZZO }}</text>
      <text x="36" y="139" class="t14">Importo:</text>
      <rect x="132" y="120" width="150" height="28" rx="3" class="campo" />
      <text x="142" y="139" class="mono t13">0,2 BTC</text>
      <rect x="444" y="168" width="100" height="32" rx="4" class="bottone" />
      <text x="494" y="189" text-anchor="middle" class="t14 b bianco">Invia</text>
      <text x="36" y="204" class="nota">indirizzo d'esempio (BIP 173)</text>
    </g>

    <g v-click>
      <rect x="306" y="116" width="556" height="126" rx="8" class="ombra" />
      <rect x="300" y="110" width="556" height="126" rx="8" class="finestra dialogo" />
      <path d="M300,138 V118 a8,8 0 0 1 8,-8 H848 a8,8 0 0 1 8,8 V138 Z" class="barra" />
      <text x="316" y="129" class="t14 b">Conferma invio</text>
      <circle cx="334" cy="174" r="15" class="icona" />
      <text x="334" y="181" text-anchor="middle" class="t16 b bianco">?</text>
      <text x="362" y="168" class="t15">Confermi l'invio di <tspan class="b">0,2 BTC</tspan> a</text>
      <text x="362" y="190" class="mono t14">{{ BREVE }}?</text>
      <rect x="664" y="200" width="80" height="26" rx="4" class="bottone" />
      <text x="704" y="218" text-anchor="middle" class="t14 b bianco">Sì</text>
      <rect x="754" y="200" width="90" height="26" rx="4" class="campo" />
      <text x="799" y="218" text-anchor="middle" class="t14">Annulla</text>
    </g>

    <g v-click>
      <rect x="355" y="174" width="166" height="24" rx="5" class="evidenzia" />
      <rect x="128" y="77" width="420" height="32" rx="5" class="evidenzia" />
      <text x="440" y="268" text-anchor="middle" class="didascalia">il destinatario è solo un indirizzo: nessun nome</text>
    </g>
  </svg>
</template>

<style scoped>
.finestra { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.dialogo { stroke-width: 2; }
.ombra { fill: color-mix(in srgb, var(--grigio) 18%, var(--carta)); }
.barra { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.pallino { fill: var(--linea); }
.sottile { stroke: var(--linea); stroke-width: 1.2; }
.sottolinea { stroke: var(--rubrica); stroke-width: 3; }
.campo { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.bottone { fill: var(--rubrica); }
.icona { fill: var(--link); }
.evidenzia { fill: none; stroke: var(--rubrica); stroke-width: 2.5; }
.t13 { font-size: 13px; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.bianco { fill: var(--carta); }
.attiva { font-weight: 700; fill: var(--rubrica); }
.scheda { fill: var(--grigio); }
.didascalia { font-size: 17px; font-weight: 700; fill: var(--rubrica); }
</style>
