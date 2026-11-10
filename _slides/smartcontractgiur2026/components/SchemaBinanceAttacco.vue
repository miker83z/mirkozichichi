<!--
  Diagram (new): the theft from Binance of 29 October 2026 (about 6.3 billion dollars), as Binance told it: an
  attack path built over months, from a tampered package to a fake job interview to the hot wallet.
  June: an engineer installs a tampered software package; Binance replaces the computer, but the wallet team stays
  exposed. September: another engineer is contacted on a job platform; video interviews with a fake HR person and
  a fake CEO; the "coding assignment" carries zero-day malware. 20 October: through an internal AI tool the
  attackers reach the computers of two wallet engineers. 29 October: with stolen credentials they run a script
  and, via EIP-7702 (an Ethereum transaction type by which an account delegates its powers to a program), get
  execution rights over a hot wallet; funds leave from 20:05 UTC, containment at 00:10 UTC on 30 October.
  Outcome: about 2.85 billion frozen, much of it stablecoins blocked by their issuers (Tether, Circle); bitcoin has
  no issuer and nobody can freeze it.
  Sources: CoinDesk, 3 Nov 2026 (Binance briefing: dates, times, EIP-7702, MPC hot wallet, "about $2.85 billion"
  frozen) https://www.coindesk.com/business/2026/11/03/binance-s-usd6-3-billion-hack-began-with-a-fake-job-interview-exchange-says ;
  Il Post, 3 Nov 2026 https://www.ilpost.it/2026/11/03/indagini-furto-attacco-binance/ ; Tether froze more than
  1.567 billion USDT and Circle more than 800 million USDC (BleepingComputer and Forklog, 29–30 Oct 2026); the
  freeze is a function of the issuers' token contracts (Il Foglio, 30 Oct 2026); stolen bitcoin "all gone"
  (Bloomberg TV, B. Lee, via The Star, 30 Oct 2026); EIP-7702 "Set Code for EOAs" (eips.ethereum.org).
  The total frozen differs between sources (≈ 2.85 billion per Binance on 3 Nov; "about 3 billion" on 30 Oct).
  5 clicks: June; September; 20 October; 29 October; frozen stablecoins vs bitcoin.
  <SchemaBinanceAttacco />
-->
<script setup lang="ts">
type Riga = { t: string, c?: 'n' | 'r' | 'b' }
const CARTE: { x: number, w: number, data: string, righe: Riga[] }[] = [
  { x: 9, w: 176, data: 'giugno', righe: [
    { t: 'un ingegnere installa' }, { t: 'un pacchetto software' }, { t: 'manomesso' },
    { t: 'PC sostituito, ma il', c: 'n' }, { t: 'team dei wallet resta', c: 'n' }, { t: 'esposto', c: 'n' },
  ] },
  { x: 209, w: 206, data: 'settembre', righe: [
    { t: 'un altro ingegnere viene' }, { t: 'contattato per un lavoro:' }, { t: 'video con finti HR e CEO' },
    { t: 'il «compito di prova»' }, { t: 'contiene un malware' }, { t: 'zero-day (mai visto prima)', c: 'n' },
  ] },
  { x: 439, w: 172, data: '20 ottobre', righe: [
    { t: 'con uno strumento' }, { t: 'interno di IA' }, { t: 'raggiungono i PC' }, { t: 'di due ingegneri' },
    { t: 'dei wallet' },
  ] },
  { x: 635, w: 236, data: '29 ottobre', righe: [
    { t: 'con credenziali rubate' }, { t: 'lanciano uno script; con' }, { t: 'EIP-7702 comandano', c: 'b' },
    { t: 'un hot wallet', c: 'b' }, { t: '20:05 UTC: escono i fondi', c: 'r' }, { t: '00:10 UTC (30/10): bloccati' },
    { t: 'rubati ≈ 6,3 miliardi di $', c: 'r' },
  ] },
]
</script>

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: il percorso dell'attacco a Binance del 2026, da un pacchetto manomesso a un falso colloquio fino all'hot wallet; poi le stablecoin congelate e i bitcoin non congelabili">
    <!-- 1-4. Le tappe dell'attacco -->
    <g v-for="(c, i) in CARTE" :key="c.data" v-click>
      <SvFreccia v-if="i > 0" :x1="CARTE[i - 1].x + CARTE[i - 1].w + 2" :y1="82" :x2="c.x - 2" :y2="82" variante="ko" />
      <rect :x="c.x" y="4" :width="c.w" height="166" rx="6" :class="['carta-tappa', { finale: i === 3 }]" />
      <text :x="c.x + 12" y="27" :class="['data', { rosso: i === 3 }]">{{ c.data }}</text>
      <!-- piccola icona in alto a destra: pacchetto, videochiamata, portatile, portafoglio che si svuota -->
      <g :transform="`translate(${c.x + c.w - 46},10)`" :class="['icona', { finale: i === 3 }]">
        <g v-if="i === 0">
          <path d="M2,8 h28 v16 h-28 Z M2,8 l6,-6 h28 l-6,6 M30,24 l6,-6 v-16" />
          <line x1="16" y1="8" x2="16" y2="24" />
        </g>
        <g v-else-if="i === 1">
          <rect x="2" y="0" width="34" height="22" rx="2" />
          <circle cx="19" cy="8" r="4" />
          <path d="M11,20 c0,-7 16,-7 16,0 M19,22 v4 M13,26 h12" />
        </g>
        <g v-else-if="i === 2">
          <rect x="6" y="2" width="26" height="17" rx="2" />
          <path d="M1,22 h36 l-3,4 h-30 Z" />
        </g>
        <g v-else>
          <rect x="0" y="4" width="26" height="20" rx="3" />
          <rect x="16" y="10" width="10" height="8" rx="2" />
          <path d="M28,14 h10 M34,10 l4,4 l-4,4" />
        </g>
      </g>
      <text v-for="(r, j) in c.righe" :key="j" :x="c.x + 12" :y="50 + j * 18"
        :class="['riga', r.c === 'n' ? 'nota' : '', r.c === 'r' ? 'rosso b' : '', r.c === 'b' ? 'b' : '']">{{ r.t }}</text>
    </g>

    <!-- 5. Congelati: le stablecoin sì, i bitcoin no -->
    <g v-click>
      <rect x="9" y="186" width="426" height="100" rx="8" class="esito-ok" />
      <g v-for="(m, i) in ['USDT', 'USDC']" :key="m">
        <circle :cx="48 + i * 62" cy="236" r="24" class="moneta" />
        <text :x="48 + i * 62" y="241" text-anchor="middle" class="sigla">{{ m }}</text>
        <SvLucchetto :x="62 + i * 62" :y="252" :scala="0.62" />
      </g>
      <text x="152" y="214" class="t16 b verde">≈ 2,85 miliardi di $ congelati</text>
      <text x="152" y="236" class="t14">in gran parte stablecoin, bloccate</text>
      <text x="152" y="254" class="t14">dai loro emittenti (Tether, Circle)</text>
      <text x="152" y="274" class="nota">una funzione del loro contratto</text>

      <rect x="451" y="186" width="420" height="100" rx="8" class="esito-ko" />
      <circle cx="496" cy="236" r="24" class="moneta" />
      <text x="496" y="244" text-anchor="middle" class="btc">₿</text>
      <text x="536" y="214" class="t16 b arancio">bitcoin: non congelabili</text>
      <text x="536" y="236" class="t14">nessun emittente: nessuno può</text>
      <text x="536" y="254" class="t14">bloccarli, una volta usciti</text>
      <text x="536" y="274" class="nota">recuperarli è quasi impossibile</text>
    </g>
  </svg>
</template>

<style scoped>
.carta-tappa { fill: var(--campo); stroke: var(--ko); stroke-width: 1.5; }
.carta-tappa.finale { fill: color-mix(in srgb, var(--rubrica) 12%, var(--carta)); stroke: var(--rubrica); }
.data { font-size: 16px; font-weight: 700; fill: var(--ko); }
.icona path, .icona rect, .icona circle, .icona line { fill: none; stroke: var(--ko); stroke-width: 1.6; stroke-linejoin: round; }
.icona.finale path, .icona.finale rect, .icona.finale circle, .icona.finale line { stroke: var(--rubrica); }
.data.rosso { fill: var(--rubrica); }
.riga { font-size: 14px; }
.riga.nota { font-size: 13px; }
.esito-ok { fill: color-mix(in srgb, var(--ok) 12%, var(--carta)); stroke: var(--ok); stroke-width: 1.5; }
.esito-ko { fill: color-mix(in srgb, var(--ko) 12%, var(--carta)); stroke: var(--ko); stroke-width: 1.5; }
.moneta { fill: #d9a520; stroke: #8a6a12; stroke-width: 1.5; }
.sigla { font-size: 13px; font-weight: 700; fill: #3b2a05; }
.btc { font-size: 24px; font-weight: 700; fill: #3b2a05; }
.t14 { font-size: 14px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.rosso { fill: var(--rubrica); }
.verde { fill: var(--ok); }
.arancio { fill: var(--ko); }
</style>
