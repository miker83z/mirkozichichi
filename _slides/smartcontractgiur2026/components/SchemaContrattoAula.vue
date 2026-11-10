<!--
  Diagram (new): the class smart contract that the students use from their phones. Left, the phone wallet (an
  address, a balance). Centre, two shared objects that everyone can use: "Rubinetto" (faucet) mints the class coin
  AULA: iscriviti(nome) gives 10 AULA, once per address, and writes the nickname into a public register; and
  "Sondaggio" (poll): vota(scelta), one vote per address, the counts visible to everyone. Right, classmates: a
  transfer of 3 AULA to a classmate by nickname (the wallet looks the name up in the register and sends to the
  address it finds).
  The design (names, 10 AULA, once per address, one vote per address) is the lecturer's brief for the class
  contract; the bars of the poll are illustrative, no real counts. Addresses are shown as "0x…" only.
  Sources: IOTA docs, "Shared objects" (docs.iota.org/developer/iota-101/objects/object-ownership/shared): shared
  objects "can be accessed by anyone", created with transfer::share_object; IOTA docs, "Coin Standard"
  (docs.iota.org/developer/standards/coin): minting needs the TreasuryCap, so the faucet object must hold it.
  5 clicks: the phone wallet; iscriviti → 10 AULA; the register of nicknames (and two classmates); vota → counts;
  sending 3 AULA to a classmate by nickname.
  <SchemaContrattoAula />
-->
<script setup lang="ts">
const REGISTRO = ['mario', 'giulia', 'luca']
const VOTI = [{ s: 'A', l: 92 }, { s: 'B', l: 58 }, { s: 'C', l: 30 }] // illustrative lengths, no real counts
</script>

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: il contratto di classe. Dal telefono ci si iscrive al Rubinetto e si ricevono 10 AULA, il nome finisce in un registro pubblico; si vota nel Sondaggio, i conteggi sono visibili a tutti; si inviano AULA a un compagno indicandone il nome">
    <!-- 1. Il wallet sul telefono -->
    <g v-click>
      <rect x="14" y="14" width="130" height="240" rx="16" class="telefono" />
      <rect x="22" y="34" width="114" height="200" rx="4" class="schermo" />
      <line x1="64" x2="94" y1="24" y2="24" class="altoparlante" />
      <text x="79" y="56" text-anchor="middle" class="t15 b">wallet</text>
      <text x="30" y="80" class="nota">il tuo indirizzo</text>
      <text x="30" y="98" class="mono t14">0x…</text>
      <text x="30" y="124" class="nota">saldo</text>
    </g>

    <!-- 2. iscriviti(nome) → 10 AULA -->
    <g v-click>
      <rect x="210" y="10" width="352" height="128" rx="8" class="oggetto" />
      <text x="224" y="34" class="t16 b">Rubinetto <tspan class="t13 n grigio">(oggetto condiviso)</tspan></text>
      <text x="224" y="62" class="mono t14 b">iscriviti(nome)</text>
      <text x="224" y="84" class="t14 b rosso">→ 10 AULA</text>
      <text x="224" y="104" class="nota">una volta sola</text>
      <text x="224" y="120" class="nota">per indirizzo</text>
      <SvFreccia :x1="146" :y1="58" :x2="208" :y2="58" etichetta="iscriviti" variante="rubrica" />
      <SvFreccia :x1="208" :y1="92" :x2="146" :y2="92" etichetta="10 AULA" lato="sotto" variante="rubrica" />
      <circle cx="44" cy="145" r="12" class="moneta" />
      <text x="62" y="151" class="t16 b rosso">10 AULA</text>
    </g>

    <!-- 3. Il registro pubblico dei nomi -->
    <g v-click>
      <rect x="394" y="46" width="156" height="86" rx="5" class="registro" />
      <text x="406" y="64" class="t13 b">registro pubblico</text>
      <text v-for="(n, i) in REGISTRO" :key="n" x="406" :y="86 + i * 18" class="mono t13">{{ n }} → 0x…</text>
      <SvPersona :x="676" :y="150" nome="giulia" :scala="0.9" />
      <SvPersona :x="806" :y="150" nome="luca" :scala="0.9" />
          </g>

    <!-- 4. vota(scelta) → conteggi -->
    <g v-click>
      <rect x="210" y="148" width="352" height="106" rx="8" class="oggetto" />
      <text x="224" y="172" class="t16 b">Sondaggio <tspan class="t13 n grigio">(oggetto condiviso)</tspan></text>
      <text x="224" y="198" class="mono t14 b">vota(scelta)</text>
      <text x="224" y="220" class="nota">un voto per indirizzo</text>
      <text x="224" y="240" class="nota">conteggi visibili a tutti</text>
      <g v-for="(v, i) in VOTI" :key="v.s">
        <text x="420" :y="199 + i * 22" class="t13 b">{{ v.s }}</text>
        <rect x="436" :y="187 + i * 22" :width="v.l" height="15" rx="2" class="barra" />
      </g>
      <SvFreccia :x1="146" :y1="200" :x2="208" :y2="200" etichetta="vota" variante="rubrica" />
    </g>

    <!-- 5. Invio di AULA a un compagno, per nome -->
    <g v-click>
      <rect x="28" y="172" width="102" height="50" rx="6" class="bottone" />
      <text x="79" y="193" text-anchor="middle" class="t13 b">invia 3 AULA</text>
      <text x="79" y="211" text-anchor="middle" class="t13">a «giulia»</text>
      <path d="M552,104 H676 V146" class="cerca" />
      <text x="684" y="126" class="nota">nome → indirizzo</text>
      <path d="M79,256 V282 H676 V236" class="invio" />
      <polygon points="676,232 670.5,243 681.5,243" class="punta" />
      <text x="430" y="276" text-anchor="middle" class="t14 b rosso">3 AULA all'indirizzo di «giulia»</text>
      <circle cx="716" cy="178" r="10" class="moneta" />
      <text x="731" y="183" class="t14 b ok">+3</text>
    </g>
  </svg>
</template>

<style scoped>
.telefono { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.schermo { fill: var(--campo); stroke: var(--linea); stroke-width: 1; }
.altoparlante { stroke: var(--grigio); stroke-width: 3; stroke-linecap: round; }
.oggetto { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.registro { fill: var(--carta); stroke: var(--rubrica); stroke-width: 1.5; }
.barra { fill: color-mix(in srgb, var(--rubrica) 55%, var(--carta)); }
.bottone { fill: color-mix(in srgb, var(--rubrica) 16%, var(--carta)); stroke: var(--rubrica); stroke-width: 1.5; }
.moneta { fill: #d9a520; stroke: #8a6a12; stroke-width: 1.5; }
.cerca { fill: none; stroke: var(--grigio); stroke-width: 1.5; stroke-dasharray: 5 4; }
.invio { fill: none; stroke: var(--rubrica); stroke-width: 2; }
.punta { fill: var(--rubrica); }
.t13 { font-size: 13px; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.n { font-weight: 400; }
.rosso { fill: var(--rubrica); }
.ok { fill: var(--ok); }
.grigio { fill: var(--grigio); }
</style>
