<!--
  Diagram (new, identity chapter): a pseudonym is not anonymity. On a public ledger, several transactions involve
  the address 0x7c3f…b42d, which carries no name. An exchange's KYC record links that address to a person, and
  at once every past transaction becomes attributable to him. Addresses and amounts are illustrative.
  3 clicks: (1) the ledger and the address without a name; (2) the exchange's KYC record that links the address to
  "Mario Rossi"; (3) all transactions are attributed to him, caption "pseudonimo ≠ anonimo".
  <SchemaPseudonimo />
-->
<script setup lang="ts">
const IND = '0x7c3f…b42d'
// [from, to, amount]; IND marks the pseudonymous address
const RIGHE: [string, string, string][] = [
  [IND, '0xa91e…3d07', '0,8 ETH'],
  ['0x55b0…9c11', IND, '2,0 ETH'],
  [IND, '0x0d4e…a6f2', '0,3 ETH'],
  [IND, '0xe38b…51c9', '1,1 ETH'],
]
const RY = (i: number) => 36 + 36 * i // top of each ledger row
const LX = 16 // ledger left edge
const LW = 384
const A = { x: 430, y: 104, w: 170, h: 40 } // the address box
const P = { x: A.x + A.w / 2, y: 18 } // the person (top centre)
</script>

<template>
  <svg viewBox="0 0 880 262" class="schema" role="img" aria-label="Schema: un indirizzo senza nome, collegato da un exchange a una persona, rende a lei attribuibili tutte le transazioni">
    <g v-click>
      <text :x="LX" y="22" class="titoletto">registro pubblico (blockchain)</text>
      <g v-for="(r, i) in RIGHE" :key="i">
        <rect :x="LX" :y="RY(i)" :width="LW" height="30" rx="4" class="riga" />
        <text :x="LX + 10" :y="RY(i) + 20" class="mono tx">
          <tspan :class="{ ind: r[0] === IND }">{{ r[0] }}</tspan> → <tspan :class="{ ind: r[1] === IND }">{{ r[1] }}</tspan>  {{ r[2] }}
        </text>
        <line :x1="LX + LW" :y1="RY(i) + 15" :x2="A.x" :y2="A.y + 8 + 8 * i" class="filo" />
      </g>
      <SvRiquadro :x="A.x" :y="A.y" :w="A.w" :h="A.h" :testo="IND" variante="rubrica" mono />
      <SvPersona :x="P.x" :y="P.y" :scala="0.85" variante="grigio" />
      <text :x="P.x + 30" :y="P.y + 34" class="punto-domanda">?</text>
      <text :x="P.x" :y="A.y + A.h + 20" text-anchor="middle" class="nota">nessun nome</text>
    </g>

    <g v-click>
      <rect x="652" y="26" width="214" height="146" rx="6" class="scheda" />
      <text x="666" y="50" class="titoletto">exchange: scheda KYC</text>
      <text x="666" y="78" class="campo">nome: <tspan class="b">Mario Rossi</tspan></text>
      <text x="666" y="102" class="campo">documento d'identità ✓</text>
      <text x="666" y="128" class="campo">indirizzo di deposito:</text>
      <text x="666" y="152" class="mono campo ind">{{ IND }}</text>
      <SvFreccia :x1="652" :y1="146" :x2="A.x + A.w + 2" :y2="A.y + A.h / 2 + 6" variante="rubrica" />
      <text :x="(652 + A.x + A.w) / 2" :y="A.y + A.h + 26" text-anchor="middle" class="rosso">collega</text>
    </g>

    <g v-click>
      <rect :x="P.x + 22" :y="P.y + 8" width="24" height="32" class="copri" />
      <SvPersona :x="P.x" :y="P.y" :scala="0.85" variante="rubrica" />
      <text :x="P.x" :y="P.y + 72" text-anchor="middle" class="nome">Mario Rossi</text>
      <rect :x="P.x - 60" :y="A.y + A.h + 6" width="120" height="20" class="copri" />
      <text :x="P.x" :y="A.y + A.h + 20" text-anchor="middle" class="tag">ora ha un nome</text>
      <g v-for="(r, i) in RIGHE" :key="i">
        <rect :x="LX" :y="RY(i)" :width="LW" height="30" rx="4" class="riga-sua" />
        <text :x="LX + LW - 8" :y="RY(i) + 20" text-anchor="end" class="tag">Mario Rossi</text>
      </g>
      <text x="440" y="226" text-anchor="middle" class="didascalia">pseudonimo ≠ anonimo</text>
      <text x="440" y="250" text-anchor="middle" class="nota">basta un collegamento e tutte le transazioni dell'indirizzo, passate e future, sono sue</text>
    </g>
  </svg>
</template>

<style scoped>
.riga { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.riga-sua { fill: none; stroke: var(--rubrica); stroke-width: 1.8; }
.tx { font-size: 13px; }
.ind { fill: var(--rubrica); font-weight: 700; }
.filo { stroke: var(--linea); stroke-width: 1.5; }
.punto-domanda { font-size: 26px; font-weight: 700; fill: var(--grigio); }
.copri { fill: var(--carta); }
:deep(.sv-persona.sv-grigio circle), :deep(.sv-persona.sv-grigio path) { fill: #a9a7b0; }
.scheda { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.campo { font-size: 14px; }
.b { font-weight: 700; }
.rosso { font-size: 13px; fill: var(--rubrica); }
.nome { font-size: 15px; font-weight: 700; fill: var(--rubrica); }
.tag { font-size: 13px; font-weight: 700; fill: var(--rubrica); }
.didascalia { font-size: 18px; font-weight: 700; fill: var(--rubrica); }
</style>
