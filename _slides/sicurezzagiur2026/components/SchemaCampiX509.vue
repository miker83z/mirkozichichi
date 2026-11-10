<!--
  Diagram (2024 deck, p. 88, originally a screenshot of the Windows certificate viewer): a mock
  certificate window, "Dettagli" tab, with the main X.509 fields appearing one per click and a short
  explanation on the right. Values are illustrative (Alice Rossi, Esempio Qualified CA).
  5 clicks: Emittente; Valido dal / al; Soggetto; Chiave pubblica; Firma dell'emittente.
  <SchemaCampiX509 />
-->
<script setup lang="ts">
const campi = [
  { campo: 'Emittente', valore: 'CN=Esempio Qualified CA, C=IT', nota: 'chi lo garantisce: la CA' },
  { campo: 'Valido dal / al', valore: '01/03/2026 – 01/03/2029', nota: 'periodo di validità' },
  { campo: 'Soggetto', valore: 'CN=Alice Rossi, O=Studio Legale Esempio', nota: 'a chi appartiene la chiave' },
  { campo: 'Chiave pubblica', valore: 'EC P-256 (256 bit)', nota: 'la chiave pubblica di Alice' },
  { campo: "Firma dell'emittente", valore: 'ECDSA con SHA-256', nota: 'la CA firma tutti i campi' },
]
const Y0 = 98
const PASSO = 35
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: i campi principali di un certificato X.509 in una finestra di visualizzazione">
    <!-- La finestra (sempre visibile: è la cornice) -->
    <rect x="8" y="4" width="560" height="272" rx="6" class="finestra" />
    <path d="M8,10 a6,6 0 0 1 6,-6 h548 a6,6 0 0 1 6,6 v22 h-560 Z" class="barra" />
    <text x="22" y="24" class="titolo-finestra">Certificato</text>
    <text x="550" y="24" text-anchor="end" class="titolo-finestra">✕</text>
    <rect x="22" y="40" width="86" height="24" class="scheda" />
    <text x="65" y="57" text-anchor="middle" class="testo-scheda">Generale</text>
    <rect x="108" y="38" width="86" height="27" class="scheda attiva" />
    <text x="151" y="57" text-anchor="middle" class="testo-scheda forte">Dettagli</text>
    <rect x="194" y="40" width="168" height="24" class="scheda" />
    <text x="278" y="57" text-anchor="middle" class="testo-scheda">Percorso certificazione</text>
    <rect x="22" y="64" width="532" height="204" class="tabella" />
    <rect x="22" y="64" width="532" height="24" class="intestazione" />
    <text x="34" y="81" class="testo-scheda forte">Campo</text>
    <text x="210" y="81" class="testo-scheda forte">Valore</text>
    <line x1="200" y1="64" x2="200" y2="268" class="divisorio" />

    <!-- 1–5. I campi, uno per clic -->
    <g v-for="(c, i) in campi" :key="c.campo" v-click>
      <rect x="23" :y="Y0 + i * PASSO - 6" width="530" :height="PASSO - 4" class="riga" />
      <line x1="200" :y1="Y0 + i * PASSO - 6" x2="200" :y2="Y0 + i * PASSO + PASSO - 10" class="divisorio" />
      <text x="34" :y="Y0 + i * PASSO + 15" class="campo">{{ c.campo }}</text>
      <text x="210" :y="Y0 + i * PASSO + 15" class="valore">{{ c.valore }}</text>
      <SvFreccia :x1="610" :y1="Y0 + i * PASSO + 10" :x2="574" :y2="Y0 + i * PASSO + 10" variante="rubrica" />
      <text x="618" :y="Y0 + i * PASSO + 15" class="spiegazione">{{ c.nota }}</text>
    </g>
  </svg>
</template>

<style scoped>
.finestra { fill: var(--carta); stroke: var(--grigio); stroke-width: 1.5; }
.barra { fill: var(--campo); stroke: var(--grigio); stroke-width: 1.5; }
.titolo-finestra { font-size: 14px; fill: var(--grigio); }
.scheda { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.scheda.attiva { fill: var(--carta); stroke: var(--grigio); }
.testo-scheda { font-size: 13px; }
.forte { font-weight: 700; }
.tabella { fill: var(--carta); stroke: var(--linea); stroke-width: 1.2; }
.intestazione { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.divisorio { stroke: var(--linea); stroke-width: 1.2; }
.riga { fill: #fbeeee; stroke: none; }
.campo { font-size: 15px; font-weight: 700; }
.valore { font-size: 15px; }
.spiegazione { font-size: 15px; fill: var(--rubrica); }
</style>
