<!--
  Diagram (2025 deck, pp. 9 and 22): "Alice paga Bob 5 euro" through a payment service, client/server.
  Left: the client, Alice with the service's app on her phone. Right: the server of the payment service
  (e.g. PayPal) with its database. Numbered steps: 1 pay(Bob, 5) from the app to the server;
  2 update(Alice, −5) and 3 update(Bob, +5) from the server to its database; 4 "ok" back to the app.
  Last, the whole server box is outlined: one company holds the only register of balances, a single
  point of trust and of failure.
  Same positions as SchemaPagamentoBlockchain (client box, arrows 1 and 4, arrows 2 and 3), so the
  two can be compared on consecutive slides.
  6 clicks: client and server; step 1; step 2; step 3; step 4; the outline with the caption.
  <SchemaPagamentoServer />
-->
<script setup lang="ts">
const TEL = { x: 106, y: 46, w: 72, h: 128 } // Alice's phone
const RACK = { x: 345, w: 120 }
const UNITA = [72, 106, 140]
const DB = { cx: 760, top: 70, bottom: 170, rx: 60, ry: 14 }
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: Alice paga Bob 5 euro tramite il server di un servizio di pagamento, che aggiorna il proprio database in quattro passi">
    <!-- client and server -->
    <g v-click>
      <rect x="20" y="10" width="190" height="200" rx="8" class="cornice" />
      <SvPersona :x="60" :y="78" nome="Alice" :scala="0.9" />
      <rect :x="TEL.x" :y="TEL.y" :width="TEL.w" :height="TEL.h" rx="9" class="telefono" />
      <rect :x="TEL.x + 5" :y="TEL.y + 12" :width="TEL.w - 10" :height="TEL.h - 28" rx="2" class="schermo" />
      <path :d="`M${TEL.x + TEL.w / 2 - 8},${TEL.y + 6} h16`" class="tratto" />
      <circle :cx="TEL.x + TEL.w / 2" :cy="TEL.y + TEL.h - 8" r="4" class="tratto" />
      <circle :cx="TEL.x + TEL.w / 2" :cy="TEL.y + 62" r="26" class="app" />
      <text :x="TEL.x + TEL.w / 2" :y="TEL.y + 67" text-anchor="middle" class="app-testo">app</text>
      <text x="115" y="198" text-anchor="middle" class="nota">app di pagamento</text>
      <text x="115" y="234" text-anchor="middle" class="nome">Client</text>

      <rect x="330" y="10" width="530" height="200" rx="8" class="cornice" />
      <text x="595" y="38" text-anchor="middle" class="societa">servizio di pagamento (es. PayPal)</text>
      <g v-for="y in UNITA" :key="y">
        <rect :x="RACK.x" :y="y" :width="RACK.w" height="28" rx="5" class="unita" />
        <path :d="[0, 1, 2, 3].map(i => `M${RACK.x + 13 + i * 7},${y + 9} v10`).join(' ') + ` M${RACK.x + 48},${y + 14} H${RACK.x + RACK.w - 32}`" class="tratto" />
        <circle :cx="RACK.x + RACK.w - 17" :cy="y + 14" r="5" class="tratto" />
      </g>
      <path :d="`M${DB.cx - DB.rx},${DB.top} V${DB.bottom} A${DB.rx},${DB.ry} 0 0 0 ${DB.cx + DB.rx},${DB.bottom} V${DB.top}`" class="unita" />
      <ellipse :cx="DB.cx" :cy="DB.top" :rx="DB.rx" :ry="DB.ry" class="unita" />
      <text :x="DB.cx" y="140" text-anchor="middle" class="nome">DB</text>
      <text :x="DB.cx" y="198" text-anchor="middle" class="nota">saldi di tutti i clienti</text>
      <text x="595" y="234" text-anchor="middle" class="nome">Server</text>
    </g>

    <!-- 1: pay -->
    <g v-click>
      <SvFreccia :x1="212" :y1="80" :x2="328" :y2="80" variante="rubrica" />
      <text x="270" y="71" text-anchor="middle" class="mono codice">pay(Bob, 5)</text>
      <circle cx="230" cy="97" r="11" class="passo" />
      <text x="230" y="102" text-anchor="middle" class="passo-n">1</text>
    </g>
    <!-- 2: update Alice -->
    <g v-click>
      <SvFreccia :x1="468" :y1="96" :x2="698" :y2="96" variante="rubrica" />
      <text x="583" y="87" text-anchor="middle" class="mono codice">update(Alice, −5)</text>
      <circle cx="488" cy="113" r="11" class="passo" />
      <text x="488" y="118" text-anchor="middle" class="passo-n">2</text>
    </g>
    <!-- 3: update Bob -->
    <g v-click>
      <SvFreccia :x1="468" :y1="156" :x2="698" :y2="156" variante="rubrica" />
      <text x="583" y="147" text-anchor="middle" class="mono codice">update(Bob, +5)</text>
      <circle cx="488" cy="173" r="11" class="passo" />
      <text x="488" y="178" text-anchor="middle" class="passo-n">3</text>
    </g>
    <!-- 4: ok -->
    <g v-click>
      <SvFreccia :x1="328" :y1="160" :x2="212" :y2="160" variante="rubrica" />
      <text x="270" y="151" text-anchor="middle" class="mono codice">ok</text>
      <circle cx="298" cy="177" r="11" class="passo" />
      <text x="298" y="182" text-anchor="middle" class="passo-n">4</text>
    </g>
    <!-- one company, one register -->
    <g v-click>
      <rect x="323" y="3" width="544" height="214" rx="11" class="evidenza" />
      <text x="440" y="270" text-anchor="middle" class="didascalia">un'unica società custodisce il registro: punto unico di fiducia e di guasto</text>
    </g>
  </svg>
</template>

<style scoped>
.cornice { fill: none; stroke: var(--inchiostro); stroke-width: 2.5; }
.telefono { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.schermo { fill: var(--campo); }
.unita { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.8; }
.tratto { fill: none; stroke: var(--inchiostro); stroke-width: 1.8; }
.app { fill: color-mix(in srgb, var(--rubrica) 22%, var(--carta)); stroke: var(--rubrica); stroke-width: 2; }
.app-testo { font-size: 14px; font-weight: 700; }
.nome { font-size: 16px; font-weight: 700; }
.societa { font-size: 15px; font-weight: 700; }
.codice { font-size: 14px; }
.passo { fill: var(--rubrica); }
.passo-n { font-size: 14px; font-weight: 700; fill: var(--carta); }
.evidenza { fill: none; stroke: var(--rubrica); stroke-width: 3; }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
