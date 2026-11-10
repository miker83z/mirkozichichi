<!--
  Diagram (2025 deck, p. 46): a dApp works like a traditional app, one level for one level.
  Left stack, a traditional app: the app on the phone → the API of the company's server → its database.
  Right stack, a dApp: the dApp on the phone (with the wallet) → the smart contracts → the blockchain.
  Dashed arrows pair the levels; the caption says the analogy in one sentence.
  Sources: ethereum.org, "Introduction to dapps": a dapp "combines a smart contract and a frontend user
  interface", smart contracts are "a dapp's backend", unlike "an app where the backend code is running
  on centralized servers"; docs.iota.org, "About IOTA": programmability "in both Layer 1 and Layer 2 using
  Move and EVM/Solidity smart contracts respectively".
  3 clicks: the traditional stack; the dApp stack; the correspondences with the caption.
  <SchemaStackDapp />
-->
<script setup lang="ts">
const BW = 280
const BH = 52
const LIVELLI = [30, 106, 182] // top of each level
const PILE = [
  {
    x: 120, titolo: 'app tradizionale', variante: 'trad',
    livelli: [
      { nome: 'app', nota: 'sul telefono', icona: 'telefono' },
      { nome: 'API', nota: "il server dell'azienda", icona: 'ingranaggio' },
      { nome: 'database', nota: "i dati, presso l'azienda", icona: 'db' },
    ],
  },
  {
    x: 480, titolo: 'dApp (app decentralizzata)', variante: 'dec',
    livelli: [
      { nome: 'dApp', nota: 'sul telefono, con il wallet', icona: 'telefono' },
      { nome: 'smart contract', nota: 'programmi sulla blockchain', icona: 'contratto' },
      { nome: 'blockchain', nota: 'registro condiviso dai nodi', icona: 'catena' },
    ],
  },
]

/** A gear centred in (cx, cy): 8 teeth between radii 11 and 15. */
function ingranaggio(cx: number, cy: number) {
  const pts: string[] = []
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4
    for (const [da, r] of [[-0.3, 11], [-0.17, 15], [0.17, 15], [0.3, 11]] as const) {
      pts.push(`${(cx + r * Math.cos(a + da)).toFixed(1)},${(cy + r * Math.sin(a + da)).toFixed(1)}`)
    }
  }
  return `M${pts.join(' L')} Z`
}
</script>

<template>
  <svg viewBox="0 0 880 292" class="schema" role="img" aria-label="Schema: app, API e database di un'app tradizionale corrispondono a dApp, smart contract e blockchain">
    <g v-for="p in PILE" :key="p.x" v-click>
      <text :x="p.x + BW / 2" y="20" text-anchor="middle" class="titolo">{{ p.titolo }}</text>
      <g v-for="(l, i) in p.livelli" :key="l.nome">
        <SvFreccia v-if="i > 0" :x1="p.x + BW / 2" :y1="LIVELLI[i - 1] + BH + 2" :x2="p.x + BW / 2" :y2="LIVELLI[i] - 2" />
        <rect :x="p.x" :y="LIVELLI[i]" :width="BW" :height="BH" rx="7" :class="['livello', p.variante]" />
        <!-- icon, centred at (ix, cy) -->
        <g v-if="l.icona === 'telefono'">
          <rect :x="p.x + 23" :y="LIVELLI[i] + 6" width="24" height="40" rx="4" class="icona" />
          <rect :x="p.x + 26" :y="LIVELLI[i] + 12" width="18" height="27" class="schermo" />
          <circle :cx="p.x + 35" :cy="LIVELLI[i] + 25.5" r="7" :class="p.variante === 'trad' ? 'app' : 'dapp'" />
        </g>
        <g v-else-if="l.icona === 'ingranaggio'">
          <path :d="ingranaggio(p.x + 35, LIVELLI[i] + BH / 2)" class="icona" />
          <circle :cx="p.x + 35" :cy="LIVELLI[i] + BH / 2" r="5" class="foro" />
        </g>
        <g v-else-if="l.icona === 'db'">
          <path :d="`M${p.x + 20},${LIVELLI[i] + 12} V${LIVELLI[i] + 40} A15,5 0 0 0 ${p.x + 50},${LIVELLI[i] + 40} V${LIVELLI[i] + 12}`" class="icona" />
          <ellipse :cx="p.x + 35" :cy="LIVELLI[i] + 12" rx="15" ry="5" class="icona" />
        </g>
        <g v-else-if="l.icona === 'contratto'">
          <path :d="`M${p.x + 22},${LIVELLI[i] + 8} h18 l8,8 v28 h-26 Z`" class="icona" />
          <path :d="`M${p.x + 40},${LIVELLI[i] + 8} v8 h8 M${p.x + 27},${LIVELLI[i] + 24} h16 M${p.x + 27},${LIVELLI[i] + 30} h16 M${p.x + 27},${LIVELLI[i] + 36} h10`" class="tratto" />
        </g>
        <g v-else-if="l.icona === 'catena'">
          <rect v-for="b in 3" :key="b" :x="p.x + 14 + (b - 1) * 15" :y="LIVELLI[i] + 20.5" width="11" height="11" rx="1.5" class="icona" />
          <path :d="`M${p.x + 25},${LIVELLI[i] + 26} h4 M${p.x + 40},${LIVELLI[i] + 26} h4`" class="tratto" />
        </g>
        <text :x="p.x + 66" :y="LIVELLI[i] + 23" class="nome">{{ l.nome }}</text>
        <text :x="p.x + 66" :y="LIVELLI[i] + 41" class="nota">{{ l.nota }}</text>
      </g>
    </g>

    <g v-click>
      <g v-for="y in LIVELLI" :key="y">
        <SvFreccia :x1="440" :y1="y + BH / 2" :x2="402" :y2="y + BH / 2" variante="grigio" tratteggiata />
        <SvFreccia :x1="440" :y1="y + BH / 2" :x2="478" :y2="y + BH / 2" variante="grigio" tratteggiata />
      </g>
      <text x="440" y="264" text-anchor="middle" class="didascalia">come un'app parla con il suo server,</text>
      <text x="440" y="286" text-anchor="middle" class="didascalia">la dApp parla con gli smart contract sulla blockchain (ad es. IOTA)</text>
    </g>
  </svg>
</template>

<style scoped>
.titolo { font-size: 16px; font-weight: 700; }
.livello { stroke-width: 1.8; }
.livello.trad { fill: color-mix(in srgb, var(--rubrica) 12%, var(--carta)); stroke: var(--rubrica); }
.livello.dec { fill: color-mix(in srgb, var(--glossa) 16%, var(--carta)); stroke: var(--glossa); }
.icona { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.6; }
.foro { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.4; }
.schermo { fill: var(--campo); }
.tratto { fill: none; stroke: var(--inchiostro); stroke-width: 1.5; }
.app { fill: color-mix(in srgb, var(--rubrica) 40%, var(--carta)); stroke: var(--rubrica); stroke-width: 1.5; }
.dapp { fill: color-mix(in srgb, var(--glossa) 45%, var(--carta)); stroke: var(--glossa); stroke-width: 1.5; }
.nome { font-size: 16px; font-weight: 700; }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
