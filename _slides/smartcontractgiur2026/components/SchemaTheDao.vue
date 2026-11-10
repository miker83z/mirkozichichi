<!--
  Diagram (new): The DAO (2016) and the reentrancy bug. The contract's withdraw pays first and updates the balance
  only afterwards; the attacker's contract, when it receives the ether, calls withdraw again, before the balance is
  zeroed, many times over; about 3.6 million ether end up in a "child DAO" of the attacker (17 June 2016). Then the
  hard fork of 20 July 2016: block 1,920,000 of Ethereum (in red) carries an irregular state change that moves the
  DAO's funds to a refund contract; those who rejected the fork kept the old rules, Ethereum Classic.
  The code is simplified pseudocode: in the real contract the payment happened inside splitDAO (through
  withdrawRewardFor) before the balance was set to zero.
  Sources: Ethereum Foundation blog, "CRITICAL UPDATE Re: DAO Vulnerability", 17 Jun 2016 ("recursive calling
  vulnerability", ether moved into a child DAO); ethereum.org, "Smart contract security" (reentrancy: sending ETH
  before applying the effects; "the DAO hack", 3.6M ETH stolen); ethereum.org/en/history ("DAO fork", 20 Jul 2016,
  block 1,920,000, "over 3.6 million ETH"; refund contract, 1 ETH per 100 DAO tokens; miners who refused created
  Ethereum Classic); Ethereum Foundation blog, "Hard Fork Completed", 20 Jul 2016 (block 1920000, WithdrawDAO).
  4 clicks: the vulnerable withdraw; the repeated calls; the drained ether; the fork into two chains.
  <SchemaTheDao />
-->
<script setup lang="ts">
const PRIMA = [20, 62, 104, 146] // blocks before the fork (x)
const DOPO = [276, 318, 360] // blocks after the fork, on both branches (x)
const L = 26 // block side
</script>

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: The DAO. La funzione ritira paga prima di azzerare il saldo; il contratto dell'attaccante la richiama molte volte; escono circa 3,6 milioni di ether; il fork del 20 luglio 2016 divide Ethereum ed Ethereum Classic">
    <!-- 1. La funzione vulnerabile -->
    <g v-click>
      <rect x="10" y="24" width="282" height="146" rx="8" class="contratto" />
      <text x="24" y="48" class="t16 b">The DAO <tspan class="t14 n grigio">(contratto, 2016)</tspan></text>
      <text x="24" y="76" class="mono t14">ritira():</text>
      <text x="42" y="100" class="mono t14 b rosso">1. invia gli ether</text>
      <text x="42" y="124" class="mono t14">2. azzera il saldo</text>
      <text x="24" y="156" class="t14 rosso">l'errore: prima paga, poi aggiorna</text>
    </g>

    <!-- 2. Le chiamate ripetute -->
    <g v-click>
      <SvFreccia :x1="294" :y1="58" :x2="478" :y2="58" etichetta="invia ether" variante="rubrica" />
      <SvFreccia :x1="478" :y1="86" :x2="294" :y2="86" etichetta="ritira() di nuovo" variante="ko" />
      <SvFreccia :x1="294" :y1="112" :x2="478" :y2="112" variante="rubrica" />
      <SvFreccia :x1="478" :y1="134" :x2="294" :y2="134" variante="ko" />
      <text x="386" y="160" text-anchor="middle" class="t14 b">… molte volte</text>
      <rect x="480" y="24" width="210" height="146" rx="8" class="attaccante" />
      <text x="494" y="48" class="t16 b arancio">attaccante <tspan class="t14 n grigio">(contratto)</tspan></text>
      <text x="494" y="76" class="mono t14">quando riceve:</text>
      <text x="512" y="100" class="mono t14 b arancio">chiama ritira()</text>
      <text x="494" y="132" class="nota">il saldo non è ancora</text>
      <text x="494" y="149" class="nota">azzerato: paga ancora</text>
    </g>

    <!-- 3. I fondi drenati -->
    <g v-click>
      <SvFreccia :x1="692" :y1="97" :x2="718" :y2="97" variante="ko" />
      <rect x="720" y="24" width="150" height="146" rx="8" class="drenati" />
      <text x="795" y="58" text-anchor="middle" class="t16 b rosso">≈ 3,6 milioni</text>
      <text x="795" y="78" text-anchor="middle" class="t16 b rosso">di ether</text>
      <text x="795" y="106" text-anchor="middle" class="t13">in una «child DAO»</text>
      <text x="795" y="123" text-anchor="middle" class="t13">dell'attaccante</text>
      <text x="795" y="154" text-anchor="middle" class="nota">17 giugno 2016</text>
    </g>

    <!-- 4. Il fork: due catene -->
    <g v-click>
      <text x="20" y="214" class="nota">una sola catena</text>
      <text x="276" y="192" class="t13 b rosso">blocco 1.920.000 · 20 luglio 2016</text>
      <rect v-for="x in PRIMA" :key="x" :x="x" y="222" :width="L" :height="L" rx="3" class="blocco" />
      <line v-for="x in PRIMA.slice(1)" :key="`l${x}`" :x1="x - 16" :x2="x" y1="235" y2="235" class="filo" />
      <rect x="188" y="222" :width="L" :height="L" rx="3" class="blocco" />
      <line :x1="PRIMA[3] + L" x2="188" y1="235" y2="235" class="filo" />
      <path :d="`M${188 + L},229 L${DOPO[0]},${200 + L / 2}`" class="filo" />
      <path :d="`M${188 + L},241 L${DOPO[0]},${256 + L / 2}`" class="filo" />
      <g v-for="(x, i) in DOPO" :key="`d${x}`">
        <rect :x="x" y="200" :width="L" :height="L" rx="3" :class="['blocco eth', { fork: i === 0 }]" />
        <rect :x="x" y="256" :width="L" :height="L" rx="3" class="blocco etc" />
        <line v-if="i > 0" :x1="DOPO[i - 1] + L" :x2="x" :y1="200 + L / 2" :y2="200 + L / 2" class="filo" />
        <line v-if="i > 0" :x1="DOPO[i - 1] + L" :x2="x" :y1="256 + L / 2" :y2="256 + L / 2" class="filo" />
      </g>
      <text x="410" y="214" class="t15 b verde">Ethereum (ETH)</text>
      <text x="410" y="232" class="t14">il fork sposta i fondi della DAO in un contratto di rimborso</text>
      <text x="410" y="264" class="t15 b">Ethereum Classic (ETC)</text>
      <text x="410" y="282" class="t14">chi rifiuta il fork resta sulla catena di prima, invariata</text>
    </g>
  </svg>
</template>

<style scoped>
.contratto { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.attaccante { fill: color-mix(in srgb, var(--ko) 12%, var(--carta)); stroke: var(--ko); stroke-width: 1.5; }
.drenati { fill: color-mix(in srgb, var(--rubrica) 12%, var(--carta)); stroke: var(--rubrica); stroke-width: 1.5; }
.blocco { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.4; }
.blocco.eth { stroke: var(--ok); }
.blocco.etc { stroke: var(--grigio); }
.blocco.fork { fill: color-mix(in srgb, var(--rubrica) 30%, var(--carta)); stroke: var(--rubrica); stroke-width: 2; }
.filo { stroke: var(--inchiostro); stroke-width: 1.5; fill: none; }
.t13 { font-size: 13px; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.n { font-weight: 400; }
.rosso { fill: var(--rubrica); }
.arancio { fill: var(--ko); }
.verde { fill: var(--ok); }
.grigio { fill: var(--grigio); }
</style>
