<!--
  Diagram (2025 deck, p. 7): two nodes of a distributed system. Each node is a device with its own
  memory, its own operating system and its own local resources (drawn as three small rows with an
  icon); they share nothing and talk only by exchanging messages (two arrows with an envelope).
  Source for the idea: Coulouris, Dollimore, Kindberg, Blair, "Distributed Systems: Concepts and
  Design", 5th ed., §1.1: components "communicate and coordinate their actions only by passing messages".
  3 clicks: node A; node B; the two messages with the caption "nessuna memoria condivisa".
  <SchemaNodi />
-->
<script setup lang="ts">
const NODI = [{ x: 70, nome: 'Nodo A' }, { x: 550, nome: 'Nodo B' }]
const W = 260
const RIGHE = [
  { y: 30, testo: 'memoria propria', icona: 'memoria' },
  { y: 82, testo: 'sistema operativo', icona: 'so' },
  { y: 134, testo: 'risorse locali', icona: 'disco' },
]
const H_RIGA = 42
</script>

<template>
  <svg viewBox="0 0 880 252" class="schema" role="img" aria-label="Schema: due nodi, ciascuno con memoria, sistema operativo e risorse propri, comunicano solo scambiandosi messaggi">
    <g v-for="n in NODI" :key="n.nome" v-click>
      <rect :x="n.x" y="12" :width="W" height="174" rx="8" class="nodo" />
      <g v-for="r in RIGHE" :key="r.testo">
        <rect :x="n.x + 16" :y="r.y" :width="W - 32" :height="H_RIGA" rx="5" class="riga" />
        <!-- memoria: a RAM chip with pins -->
        <g v-if="r.icona === 'memoria'">
          <rect :x="n.x + 30" :y="r.y + 13" width="30" height="16" rx="2" class="icona" />
          <path :d="[0, 1, 2, 3].map(i => `M${n.x + 36 + i * 6},${r.y + 13} v-5 M${n.x + 36 + i * 6},${r.y + 29} v5`).join(' ')" class="tratto" />
        </g>
        <!-- sistema operativo: a window -->
        <g v-else-if="r.icona === 'so'">
          <rect :x="n.x + 30" :y="r.y + 9" width="30" height="24" rx="2" class="icona" />
          <path :d="`M${n.x + 30},${r.y + 16} h30`" class="tratto" />
        </g>
        <!-- risorse locali: a disk -->
        <g v-else>
          <path :d="`M${n.x + 31},${r.y + 13} v16 a14,4 0 0 0 28,0 v-16`" class="icona" />
          <ellipse :cx="n.x + 45" :cy="r.y + 13" rx="14" ry="4" class="icona" />
        </g>
        <text :x="n.x + 74" :y="r.y + 26" class="riga-testo">{{ r.testo }}</text>
      </g>
      <text :x="n.x + W / 2" y="212" text-anchor="middle" class="nome">{{ n.nome }}</text>
    </g>

    <g v-click>
      <SvFreccia :x1="332" :y1="70" :x2="548" :y2="70" variante="rubrica" />
      <SvFreccia :x1="548" :y1="150" :x2="332" :y2="150" variante="rubrica" />
      <g v-for="y in [70, 150]" :key="y">
        <rect x="424" :y="y - 11" width="32" height="22" rx="2" class="busta" />
        <path :d="`M424,${y - 11} l16,12 l16,-12`" class="busta-piega" />
      </g>
      <text x="440" y="48" text-anchor="middle" class="messaggio">messaggio</text>
      <text x="440" y="182" text-anchor="middle" class="messaggio">messaggio</text>
      <text x="440" y="244" text-anchor="middle" class="didascalia">nessuna memoria condivisa: comunicano solo con messaggi</text>
    </g>
  </svg>
</template>

<style scoped>
.nodo { fill: none; stroke: var(--inchiostro); stroke-width: 2.5; }
.riga { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.icona { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.6; }
.tratto { fill: none; stroke: var(--inchiostro); stroke-width: 1.6; }
.riga-testo { font-size: 15px; }
.nome { font-size: 16px; font-weight: 700; }
.busta { fill: var(--carta); stroke: var(--rubrica); stroke-width: 1.8; }
.busta-piega { fill: none; stroke: var(--rubrica); stroke-width: 1.8; }
.messaggio { font-size: 15px; fill: var(--rubrica); }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
