<!--
  Diagram (new): what a DAO is, with the real rules of Uniswap governance (token UNI). Left, the token holders:
  three people with coins of different sizes (more tokens, heavier vote). One of them, who holds at least
  1 million UNI (own or delegated), submits a proposal: "give project X 1 million UNI from the common treasury".
  After 2 days of waiting, the vote is open for 7 days in the governance smart contract; every vote weighs as many
  UNI as the voter holds ("un token, un voto", not "una testa, un voto"). The proposal passes with at least
  40 million UNI in favour (quorum) and more votes for than against; then 2 more days of waiting (timelock), and
  the contract itself pays from the treasury: no board, no bank. The treasury of Uniswap is the Timelock contract
  (0x1a9C8182C09F50C8318d769245beA52c32BE35BC), which executes the approved actions.
  The bar lengths (30 + 14 for, 6 against, in millions of UNI) are illustrative and not written on the slide.
  Sources (Nov 2026): developers.uniswap.org/docs/ecosystem/governance/governance-process (updated April 2026):
  "Phase 3: Onchain Vote … 2-day waiting period, 7-day voting period, 2-day timelock (if passed) … 1M UNI delegated
  to submit the proposal … 40M UNI voting in favor to pass … the associated onchain actions are queued for anyone to
  execute after the timelock period ends"; …/governance/glossary ("When delegated, UNI determines the weight of
  voting power"; "quorum measures UNI votes cast in favor of a proposal, not total participation. Quorum is 40M UNI
  votes in favor"; Timelock "delays execution of passed proposals"); …/governance/overview (governance can "spend
  funds from the treasury", link to the Timelock address); …/governance/technical-reference (Timelock contract
  address). Same numbers in gov.uniswap.org, "Community Governance Process Update" (Jan 2023). Votes for > against:
  GovernorBravo (state() = Defeated if forVotes <= againstVotes or forVotes < quorumVotes).
  5 clicks: token holders; the proposal; the token-weighted vote; quorum reached, approved; timelock and
  execution on the treasury.
  <SchemaDao />
-->
<script setup lang="ts">
// The three holders: top of the figure (y), coin radius (area ∝ tokens), vote.
const SOCI = [
  { y: 30, r: 18, voto: 'sì' },
  { y: 92, r: 12.2, voto: 'sì' },
  { y: 154, r: 8, voto: 'no' },
]
const BX = 472 // start of the bars
const K = 3.6 // px per million UNI
const QX = BX + 40 * K // quorum line: 40 M UNI in favour
</script>

<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: una DAO. Chi ha i token vota con un peso pari ai token; qualcuno con almeno 1 milione di UNI propone di dare 1 milione dalla cassa comune al progetto X; dopo 2 giorni si vota per 7 giorni in uno smart contract; con almeno 40 milioni di UNI a favore la proposta passa e, dopo 2 giorni di timelock, il contratto paga dalla cassa comune">
    <!-- 1. Chi ha i token: più token, voto più pesante -->
    <g v-click>
      <text x="10" y="18" class="titoletto">chi ha i token</text>
      <g v-for="(s, i) in SOCI" :key="i">
        <SvPersona :x="34" :y="s.y" :scala="0.72" />
        <circle :cx="86" :cy="s.y + 20" :r="s.r" class="moneta" />
      </g>
      <text x="10" y="216" class="t14">più token = voto più pesante</text>
      <text x="10" y="262" class="nota">esempio reale: Uniswap (token UNI)</text>
    </g>

    <!-- 2. La proposta -->
    <g v-click>
      <SvFreccia :x1="150" :y1="50" :x2="210" :y2="50" etichetta="propone" variante="rubrica" />
      <path d="M212,28 H364 L378,42 V140 H212 Z" class="foglio" />
      <path d="M364,28 V42 H378" class="piega" />
      <text x="226" y="54" class="t15 b">proposta</text>
      <text x="226" y="80" class="t14">dare al progetto X</text>
      <text x="226" y="99" class="t14">1 milione di UNI</text>
      <text x="226" y="118" class="t14">dalla cassa comune</text>
      <text x="212" y="160" class="nota">per proporre servono</text>
      <text x="212" y="176" class="nota">almeno 1 milione di UNI</text>
    </g>

    <!-- 3. Il voto, pesato sui token, nel contratto -->
    <g v-click>
      <g v-for="(s, i) in SOCI" :key="i">
        <rect x="112" :y="s.y + 9" width="32" height="22" rx="11" :class="s.voto === 'sì' ? 'pillola-si' : 'pillola-no'" />
        <text x="128" :y="s.y + 25" text-anchor="middle" :class="['t14', 'b', s.voto === 'sì' ? 'verde' : 'arancio']">{{ s.voto }}</text>
      </g>
      <SvFreccia :x1="380" :y1="84" :x2="430" :y2="84" />
      <text x="405" y="75" text-anchor="middle" class="nota">2 giorni</text>
      <text x="405" y="102" text-anchor="middle" class="nota">di attesa</text>
      <rect x="432" y="28" width="213" height="184" rx="8" class="contratto" />
      <text x="446" y="52" class="t15 b">contratto di voto</text>
      <text x="446" y="70" class="nota">(smart contract) · 7 giorni</text>
      <text x="446" y="116" class="t14 b">sì</text>
      <rect :x="BX" y="100" :width="30 * K" height="22" class="barra-si" />
      <rect :x="BX + 30 * K" y="100" :width="14 * K" height="22" class="barra-si" />
      <text x="446" y="150" class="t14 b">no</text>
      <rect :x="BX" y="134" :width="6 * K" height="22" class="barra-no" />
      <text x="446" y="184" class="t15 b rosso">un token, un voto</text>
      <text x="446" y="202" class="nota">non «una testa, un voto»</text>
    </g>

    <!-- 4. Quorum raggiunto: approvata -->
    <g v-click>
      <line :x1="QX" :x2="QX" y1="92" y2="164" class="quorum" />
      <text x="638" y="88" text-anchor="end" class="nota">quorum: 40 M UNI a favore</text>
      <SvFreccia :x1="647" :y1="50" :x2="690" :y2="50" variante="ok" />
      <text x="696" y="56" class="t16 b verde">✓ approvata</text>
    </g>

    <!-- 5. Timelock, poi il contratto paga dalla cassa comune -->
    <g v-click>
      <g transform="translate(708,90)" class="clessidra">
        <line x1="-10" y1="-15" x2="10" y2="-15" />
        <line x1="-10" y1="15" x2="10" y2="15" />
        <path d="M-8,-15 L8,-15 L0,0 Z M-8,15 L8,15 L0,0 Z" />
      </g>
      <text x="726" y="88" class="t14">2 giorni di attesa</text>
      <text x="726" y="105" class="nota">(timelock)</text>
      <rect x="692" y="118" width="178" height="46" rx="6" class="cassa" />
      <circle cx="713" cy="146" r="8" class="moneta" />
      <circle cx="722" cy="136" r="8" class="moneta" />
      <text x="738" y="138" class="t15 b">cassa comune</text>
      <text x="738" y="155" class="nota">(anche lei un contratto)</text>
      <SvFreccia :x1="780" :y1="166" :x2="780" :y2="196" variante="rubrica" />
      <text x="790" y="186" class="t14 b rosso">1 M UNI</text>
      <rect x="720" y="198" width="120" height="30" rx="6" class="progetto" />
      <text x="780" y="218" text-anchor="middle" class="t14">progetto X</text>
      <text x="870" y="258" text-anchor="end" class="t15 b rosso">è il contratto a pagare: nessun consiglio, nessuna banca</text>
    </g>
  </svg>
</template>

<style scoped>
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.rosso { fill: var(--rubrica); }
.verde { fill: var(--ok); }
.arancio { fill: var(--ko); }
.moneta { fill: #d9a520; stroke: #8a6a12; stroke-width: 1.5; }
.foglio { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.piega { fill: none; stroke: var(--inchiostro); stroke-width: 1.5; }
.contratto { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.pillola-si { fill: color-mix(in srgb, var(--ok) 18%, var(--carta)); stroke: var(--ok); stroke-width: 1.3; }
.pillola-no { fill: color-mix(in srgb, var(--ko) 18%, var(--carta)); stroke: var(--ko); stroke-width: 1.3; }
.barra-si { fill: color-mix(in srgb, var(--ok) 55%, var(--carta)); stroke: var(--ok); stroke-width: 1.2; }
.barra-no { fill: color-mix(in srgb, var(--ko) 55%, var(--carta)); stroke: var(--ko); stroke-width: 1.2; }
.quorum { stroke: var(--inchiostro); stroke-width: 1.8; stroke-dasharray: 5 4; }
.clessidra line { stroke: var(--inchiostro); stroke-width: 2; }
.clessidra path { fill: none; stroke: var(--inchiostro); stroke-width: 1.5; }
.cassa { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.progetto { fill: var(--carta); stroke: var(--rubrica); stroke-width: 1.5; }
</style>
