<!--
  Diagram (new): the digital product passport (DPP) in the IOTA demo, dpp.demo.iota.org. Top, the life of an
  e-bike battery: production, sale, use, repair, recycling ("from manufacturing to repairs, resale, and
  recycling", the demo's intro). Middle, the passport: one record per event, chained, on IOTA (Notarization),
  verifiable by anyone. Bottom, who may write: accreditations in a chain, public authority → manufacturer →
  repairer (Identity and Hierarchies, as in the demo's README), and the reward: a token (LCC, Lifecycle Credit)
  for the verified repair (docs.iota.org, "Digital Product Passport" example: 1 LCC after the annual
  maintenance, battery health 76%).
  Sources: github.com/iotaledger/dpp-demonstrator; docs.iota.org/developer/iota-notarization/audit-trails/
  real-world-examples/digital-product-passport; iota.org/learn/showcases/dpp. The demo is a conceptual
  reference, not a regulation-ready product.
  3 clicks: the life of the product; the passport; who writes and the reward.
  <SchemaPassaporto />
-->
<script setup lang="ts">
const TAPPE = [
  { x: 90, nome: 'produzione', chi: 'produttore', dato: 'materiali' },
  { x: 260, nome: 'vendita', chi: 'distributore', dato: 'spedizione' },
  { x: 430, nome: 'uso', chi: 'proprietario', dato: 'attivazione' },
  { x: 600, nome: 'riparazione', chi: 'riparatore', dato: 'salute: 76%' },
  { x: 770, nome: 'riciclo', chi: 'riciclatore', dato: 'recupero' },
]
const B = 55 // half width of a record
const CATENA = [
  { x: 12, w: 146, nome: 'autorità pubblica' },
  { x: 190, w: 110, nome: 'produttore' },
  { x: 332, w: 110, nome: 'riparatore' },
]
</script>

<template>
  <svg viewBox="0 0 880 232" class="schema" role="img" aria-label="Schema: il passaporto digitale di una batteria per e-bike. Ogni tappa della sua vita, dalla produzione al riciclo, è registrata su IOTA e verificabile da chiunque; scrive solo chi è accreditato, dall'autorità pubblica al produttore al riparatore; la riparazione registrata dà un premio in token">
    <!-- 1. La vita del prodotto -->
    <g v-click>
      <text x="12" y="15" class="titoletto">la vita di una batteria per e-bike</text>
      <line :x1="TAPPE[0].x" y1="44" :x2="TAPPE[4].x" y2="44" class="vita" />
      <g v-for="t in TAPPE" :key="t.nome">
        <circle :cx="t.x" cy="44" r="13" class="tappa" />
        <text :x="t.x" y="78" text-anchor="middle" class="t15 b">{{ t.nome }}</text>
        <text :x="t.x" y="95" text-anchor="middle" class="nota">{{ t.chi }}</text>
      </g>
    </g>

    <!-- 2. Il passaporto: un record per evento, in catena -->
    <g v-click>
      <text x="12" y="120" class="titoletto">il passaporto su IOTA: ogni evento registrato, verificabile da chiunque</text>
      <g v-for="(t, i) in TAPPE" :key="t.nome">
        <rect :x="t.x - B" y="128" :width="2 * B" height="36" rx="6" class="record" />
        <text :x="t.x" y="151" text-anchor="middle" class="t14">{{ t.dato }}</text>
        <SvFreccia v-if="i < TAPPE.length - 1" :x1="t.x + B + 2" :y1="146" :x2="TAPPE[i + 1].x - B - 2" :y2="146" variante="grigio" />
      </g>
    </g>

    <!-- 3. Chi può scrivere, e il premio -->
    <g v-click>
      <text x="12" y="188" class="titoletto">scrive solo chi è accreditato, a catena</text>
      <g v-for="(c, i) in CATENA" :key="c.nome">
        <rect :x="c.x" y="198" :width="c.w" height="30" rx="15" class="ruolo" />
        <text :x="c.x + c.w / 2" y="218" text-anchor="middle" class="t14">{{ c.nome }}</text>
        <SvFreccia v-if="i < CATENA.length - 1" :x1="c.x + c.w + 2" :y1="213" :x2="CATENA[i + 1].x - 2" :y2="213" variante="rubrica" />
      </g>
      <line x1="600" y1="166" x2="600" y2="196" class="premio-filo" />
      <circle cx="600" cy="212" r="15" class="moneta" />
      <text x="600" y="217" text-anchor="middle" class="sigla">+1</text>
      <text x="626" y="208" class="t15 b rosso">premio automatico</text>
      <text x="626" y="226" class="nota">un token (Lifecycle Credit) per la riparazione</text>
    </g>
  </svg>
</template>

<style scoped>
.vita { stroke: var(--grigio); stroke-width: 2; }
.tappa { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.8; }
.record { fill: var(--campo); stroke: var(--rubrica); stroke-width: 1.5; }
.ruolo { fill: none; stroke: var(--inchiostro); stroke-width: 1.4; }
.premio-filo { stroke: var(--rubrica); stroke-width: 1.5; stroke-dasharray: 4 4; }
.moneta { fill: #d9a520; stroke: #8a6a12; stroke-width: 1.5; }
.sigla { font-size: 13px; font-weight: 700; fill: #3b2a05; }
.t13 { font-size: 13px; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.b { font-weight: 700; }
.rosso { fill: var(--rubrica); }
</style>
