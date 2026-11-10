<!--
  Diagram (new, for the 2024 deck p. 116, with the exact Bitcoin rule from VERIFICA.md): a time axis
  (15 November 2026, UTC) with the times of the last 11 blocks (the same sample as <BlockTimestamp />,
  not always increasing) and their median (09:52); the node's clock (11:00); the accepted window, from
  the median to the node's clock + 2 hours (13:00), shaded green. A new block at 10:20 is accepted ✓
  although it is earlier than the last block (10:48); one at 13:20 is rejected ✗ (beyond +2 hours).
  4 clicks: blocks and median, node clock and window, the accepted time, the rejected time.
  The groups carry explicit click numbers because the green window (click 2) is drawn under the axis.
  <SchemaOrarioBlocco />
-->
<script setup lang="ts">
const INIZIO = 9 * 60 // axis from 09:00 …
const FINE = 13 * 60 + 30 // … to 13:30
const X0 = 50
const X1 = 840
const minuti = (hms: string) => {
  const [h, m, s] = hms.split(':').map(Number)
  return h * 60 + m + (s ?? 0) / 60
}
const x = (hms: string) => X0 + ((minuti(hms) - INIZIO) / (FINE - INIZIO)) * (X1 - X0)

const blocchi = ['09:12:04', '09:19:47', '09:33:15', '09:29:58', '09:41:22', '09:52:40', '10:01:09', '10:13:37', '10:09:51', '10:31:05', '10:48:26']
const mediana = [...blocchi].sort((a, b) => minuti(a) - minuti(b))[5] // 09:52:40
const ultimo = blocchi[blocchi.length - 1]
const ore = ['09:00', '10:00', '11:00', '12:00', '13:00']
const xMed = x(mediana)
const xNodo = x('11:00')
const xLimite = x('13:00')
const xSi = x('10:20')
const xNo = x('13:20')
const AX = 150 // y of the axis
</script>

<template>
  <svg viewBox="0 0 880 244" class="schema" role="img" aria-label="Schema: quando un blocco Bitcoin ha un orario accettabile">
    <g v-click="2">
      <rect :x="xMed" y="40" :width="xLimite - xMed" :height="AX - 40" class="finestra" />
    </g>
    <g v-click="1">
      <line :x1="X0" :y1="AX" :x2="X1" :y2="AX" class="asse" />
      <template v-for="o in ore" :key="o">
        <line :x1="x(o)" :y1="AX" :x2="x(o)" :y2="AX + 6" class="asse" />
        <text :x="x(o)" :y="AX + 22" text-anchor="middle" class="nota">{{ o }}</text>
      </template>
      <line :x1="xMed" y1="36" :x2="xMed" :y2="AX" class="mediana" />
      <text :x="xMed" y="28" text-anchor="middle" class="etich rosso">mediana {{ mediana.slice(0, 5) }}</text>
      <text x="62" y="132" class="nota">ultimi 11 blocchi</text>
      <circle v-for="b in blocchi" :key="b" :cx="x(b)" :cy="AX" r="5" class="punto" :class="{ medio: b === mediana }" />
    </g>
    <g v-click="2">
      <line :x1="xNodo" y1="36" :x2="xNodo" :y2="AX" class="nodo" />
      <text :x="xNodo" y="28" text-anchor="middle" class="etich">ora del nodo 11:00</text>
      <line :x1="xLimite" y1="36" :x2="xLimite" :y2="AX" class="limite" />
      <text :x="xLimite" y="28" text-anchor="middle" class="etich verde">limite 13:00</text>
      <SvFreccia :x1="xNodo + 4" :y1="104" :x2="xLimite - 4" :y2="104" variante="ok" etichetta="+2 ore" />
      <text :x="(xMed + xNodo) / 2 + 4" y="66" text-anchor="middle" class="titolo verde">finestra</text>
      <text :x="(xMed + xNodo) / 2 + 4" y="84" text-anchor="middle" class="titolo verde">accettata</text>
    </g>
    <g v-click="3">
      <circle :cx="x(ultimo)" :cy="AX" r="9" class="anello" />
      <circle :cx="xSi" :cy="AX" r="7" class="proposta si" />
      <line :x1="xSi" :y1="AX + 9" :x2="xSi" :y2="AX + 42" class="guida si" />
      <text :x="xSi" :y="AX + 60" text-anchor="middle" class="titolo verde">nuovo blocco 10:20 ✓</text>
      <text :x="xSi" :y="AX + 78" text-anchor="middle" class="nota">prima dell'ultimo blocco ({{ ultimo.slice(0, 5) }}), ma accettato</text>
    </g>
    <g v-click="4">
      <circle :cx="xNo" :cy="AX" r="7" class="proposta no" />
      <line :x1="xNo" :y1="AX + 9" :x2="xNo" :y2="AX + 42" class="guida no" />
      <text x="862" :y="AX + 60" text-anchor="end" class="titolo arancio">nuovo blocco 13:20 ✗</text>
      <text x="862" :y="AX + 78" text-anchor="end" class="nota">oltre le 2 ore: rifiutato</text>
    </g>
  </svg>
</template>

<style scoped>
.finestra { fill: #e8f3ed; }
.asse { stroke: var(--inchiostro); stroke-width: 2; }
.mediana { stroke: var(--rubrica); stroke-width: 2; stroke-dasharray: 5 4; }
.nodo { stroke: var(--inchiostro); stroke-width: 2; }
.limite { stroke: var(--ok); stroke-width: 2; }
.punto { fill: var(--inchiostro); stroke: var(--carta); stroke-width: 1.5; }
.punto.medio { fill: var(--rubrica); }
.etich { font-size: 14px; font-weight: 600; }
.titolo { font-size: 15px; font-weight: 700; }
.rosso { fill: var(--rubrica); }
.verde { fill: var(--ok); }
.arancio { fill: var(--ko); }
.anello { fill: none; stroke: var(--grigio); stroke-width: 1.5; stroke-dasharray: 3 2; }
.proposta { fill: var(--carta); stroke-width: 3; }
.proposta.si { stroke: var(--ok); }
.proposta.no { stroke: var(--ko); }
.guida { stroke-width: 1.5; }
.guida.si { stroke: var(--ok); }
.guida.no { stroke: var(--ko); }
</style>
