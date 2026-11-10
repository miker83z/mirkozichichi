<!--
  Diagram (2025 deck, p. 8): the client/server architecture. On the left the client: Alice with her
  phone and an app; on the right the server (a rack). The client sends a request, the server answers
  with a response. Under each box, the role in one line (who asks for the service, who provides it).
  4 clicks: the client; the server; the request; the response.
  <SchemaClientServer />
-->
<script setup lang="ts">
const TEL = { x: 214, y: 40, w: 64, h: 120 } // Alice's phone
const RACK = { x: 620, y: 48, w: 130 } // server rack: three units
const UNITA = [0, 1, 2].map(i => RACK.y + i * 36)
</script>

<template>
  <svg viewBox="0 0 880 246" class="schema" role="img" aria-label="Schema: il client (Alice con la sua app) invia una richiesta al server, che risponde">
    <g v-click>
      <rect x="70" y="10" width="250" height="180" rx="8" class="cornice" />
      <SvPersona :x="140" :y="58" nome="Alice" />
      <rect :x="TEL.x" :y="TEL.y" :width="TEL.w" :height="TEL.h" rx="9" class="telefono" />
      <rect :x="TEL.x + 5" :y="TEL.y + 12" :width="TEL.w - 10" :height="TEL.h - 28" rx="2" class="schermo" />
      <path :d="`M${TEL.x + TEL.w / 2 - 8},${TEL.y + 6} h16`" class="tratto" />
      <circle :cx="TEL.x + TEL.w / 2" :cy="TEL.y + TEL.h - 8" r="4" class="tratto" />
      <circle :cx="TEL.x + TEL.w / 2" :cy="TEL.y + 58" r="22" class="app" />
      <text :x="TEL.x + TEL.w / 2" :y="TEL.y + 63" text-anchor="middle" class="app-testo">app</text>
      <text x="195" y="214" text-anchor="middle" class="nome">Client</text>
      <text x="195" y="236" text-anchor="middle" class="nota">chi chiede il servizio</text>
    </g>

    <g v-click>
      <rect x="560" y="10" width="250" height="180" rx="8" class="cornice" />
      <g v-for="y in UNITA" :key="y">
        <rect :x="RACK.x" :y="y" :width="RACK.w" height="30" rx="5" class="unita" />
        <path :d="[0, 1, 2, 3].map(i => `M${RACK.x + 14 + i * 7},${y + 10} v10`).join(' ') + ` M${RACK.x + 50},${y + 15} H${RACK.x + RACK.w - 34}`" class="tratto" />
        <circle :cx="RACK.x + RACK.w - 18" :cy="y + 15" r="5" class="tratto" />
      </g>
      <text x="685" y="214" text-anchor="middle" class="nome">Server</text>
      <text x="685" y="236" text-anchor="middle" class="nota">chi fornisce il servizio</text>
    </g>

    <g v-click>
      <SvFreccia :x1="322" :y1="70" :x2="558" :y2="70" etichetta="richiesta (request)" />
    </g>
    <g v-click>
      <SvFreccia :x1="558" :y1="130" :x2="322" :y2="130" etichetta="risposta (response)" lato="sotto" />
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
</style>
