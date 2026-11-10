<!--
  Diagram (new): where the keys of an exchange live, and who holds yours.
  Inside the exchange: the hot wallet (online, signs withdrawals by itself; its key is split into shares held by
  several machines with multi-party computation, so no single machine holds it) and the cold wallet (offline, in a
  safe, signs rarely and by hand; it tops up the hot wallet). On the right: custody (funds left on the exchange: the
  keys are the exchange's, you see a balance in its own books) vs self-custody (your wallet, your key, backed up as
  a seed phrase of 12–24 words). At the bottom: the trade-off, availability vs security.
  Sources: "a hot wallet is ... connected to the internet, while a cold wallet is not", used for generating and
  storing private keys offline (Blockstream Help, "What is meant if a wallet is cold or hot?"); Binance's hot wallets use multi-party computation (CoinDesk, 3 Nov 2026,
  https://www.coindesk.com/business/2026/11/03/binance-s-usd6-3-billion-hack-began-with-a-fake-job-interview-exchange-says);
  threshold schemes for signatures built on MPC (NIST, Multi-Party Threshold Cryptography project,
  https://csrc.nist.gov/projects/threshold-cryptography); seed phrase of 12, 15, 18, 21 or 24 words (BIP-39);
  the 29 Oct 2026 theft hit a hot wallet (CoinDesk, same article).
  The three key pieces are a picture: MPC shares are not literal pieces of the key, and the key is never rebuilt.
  4 clicks: hot wallet; cold wallet (with the top-up arrow); custody vs self-custody; the trade-off.
  <SchemaHotCold />
-->
<script setup lang="ts">
const SERVER = [32, 102, 172] // left edge of the three machines of the hot wallet
</script>

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: dentro un exchange l'hot wallet è online e firma da solo con la chiave divisa tra più macchine, il cold wallet è offline; i fondi lasciati sull'exchange sono custoditi da lui, nell'autocustodia le chiavi sono tue">
    <!-- 1. Hot wallet: sempre online, chiave divisa tra più macchine -->
    <g v-click>
      <text x="12" y="15" class="titoletto">dentro un exchange</text>
      <rect x="10" y="24" width="550" height="176" rx="10" class="cornice" />
      <rect x="22" y="34" width="226" height="156" rx="6" class="caldo" />
      <text x="34" y="56" class="t16 b rosso">hot wallet <tspan class="t14 n grigio">(sempre online)</tspan></text>
      <g v-for="(sx, i) in SERVER" :key="sx">
        <rect :x="sx" y="68" width="62" height="50" rx="4" class="macchina" />
        <line :x1="sx + 8" :x2="sx + 54" y1="77" y2="77" class="rack" />
        <circle :cx="sx + 52" cy="77" r="2" class="led" />
        <!-- un pezzo della chiave per macchina -->
        <g v-if="i === 0" class="pezzo">
          <circle :cx="sx + 31" cy="99" r="10" />
          <circle :cx="sx + 31" cy="99" r="3.5" class="foro" />
        </g>
        <rect v-else-if="i === 1" :x="sx + 11" y="96" width="40" height="6" class="pezzo" />
        <path v-else :d="`M${sx + 11},96 h40 v6 h-4 v7 h-6 v-7 h-4 v5 h-6 v-5 h-20 Z`" class="pezzo" />
      </g>
      <text x="135" y="136" text-anchor="middle" class="nota">chiave divisa in quote (MPC)</text>
      <text x="34" y="160" class="t14">sempre online</text>
      <text x="34" y="179" class="t14">firma i prelievi in automatico</text>
    </g>

    <!-- 2. Cold wallet: offline, firma di rado e a mano; ricarica l'hot wallet -->
    <g v-click>
      <rect x="330" y="34" width="218" height="156" rx="6" class="freddo" />
      <text x="342" y="56" class="t16 b">cold wallet <tspan class="t14 n grigio">(offline)</tspan></text>
      <rect x="342" y="68" width="88" height="62" rx="5" class="cassaforte" />
      <circle cx="386" cy="99" r="17" class="manopola" />
      <line x1="386" y1="99" x2="396" y2="91" class="lancetta" />
      <SvChiave :x="458" :y="99" tipo="privata" :scala="0.8" />
      <text x="342" y="160" class="t14">offline, in cassaforte</text>
      <text x="342" y="179" class="t14">firma di rado, a mano</text>
      <SvFreccia :x1="328" :y1="104" :x2="250" :y2="104" variante="grigio" />
      <text x="289" y="124" text-anchor="middle" class="nota">ricarica</text>
    </g>

    <!-- 3. Custodia contro autocustodia -->
    <g v-click>
      <text x="590" y="15" class="titoletto">e i tuoi fondi?</text>
      <rect x="588" y="24" width="282" height="110" rx="8" class="riquadro" />
      <SvPersona :x="616" :y="36" :scala="0.62" />
      <text x="616" y="94" text-anchor="middle" class="t13">tu</text>
      <text x="664" y="50" class="t15 b">custodia</text>
      <text x="664" y="68" class="t13 grigio">fondi lasciati sull'exchange</text>
      <text x="664" y="92" class="t14">le chiavi sono sue:</text>
      <text x="664" y="110" class="t14">tu vedi un saldo</text>
      <text x="664" y="126" class="t14">nel suo registro</text>

      <rect x="588" y="144" width="282" height="110" rx="8" class="riquadro tuo" />
      <SvPersona :x="616" :y="156" :scala="0.62" variante="ok" />
      <text x="616" y="214" text-anchor="middle" class="t13">tu</text>
      <SvChiave :x="648" :y="176" tipo="privata" :scala="0.6" />
      <text x="684" y="170" class="t15 b verde">autocustodia</text>
      <text x="684" y="188" class="t13 grigio">il tuo wallet, la tua chiave</text>
      <text x="684" y="212" class="t14">copia di riserva:</text>
      <text x="684" y="230" class="t14">12–24 parole</text>
      <text x="684" y="246" class="t13 grigio">(seed phrase)</text>
      <text x="729" y="280" text-anchor="middle" class="motto">«not your keys, not your coins»</text>
    </g>

    <!-- 4. Il compromesso: disponibilità contro sicurezza -->
    <g v-click>
      <SvFreccia :x1="285" :y1="226" :x2="150" :y2="226" variante="rubrica" />
      <SvFreccia :x1="285" :y1="226" :x2="420" :y2="226" />
      <text x="140" y="231" text-anchor="end" class="t15 b rosso">disponibilità</text>
      <text x="430" y="231" class="t15 b">sicurezza</text>
      <text x="285" y="256" text-anchor="middle" class="t14">più è online, più è comodo e più è esposto</text>
      <text x="285" y="276" text-anchor="middle" class="nota">il furto a Binance (29 ottobre 2026) è partito da un hot wallet</text>
    </g>
  </svg>
</template>

<style scoped>
.cornice { fill: none; stroke: var(--grigio); stroke-width: 1.2; stroke-dasharray: 5 4; }
.caldo { fill: color-mix(in srgb, var(--rubrica) 10%, var(--carta)); stroke: var(--rubrica); stroke-width: 1.5; }
.freddo { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.macchina { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.3; }
.rack { stroke: var(--linea); stroke-width: 2; }
.led { fill: var(--ok); }
.pezzo, .pezzo circle { fill: #c94a3f; stroke: var(--rubrica); stroke-width: 1.2; }
.pezzo .foro { fill: var(--carta); }
.cassaforte { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.manopola { fill: none; stroke: var(--inchiostro); stroke-width: 2; }
.lancetta { stroke: var(--inchiostro); stroke-width: 2; }
.riquadro { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.riquadro.tuo { fill: color-mix(in srgb, var(--ok) 10%, var(--carta)); stroke: var(--ok); }
.motto { font-size: 15px; font-style: italic; }
.t13 { font-size: 13px; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.n { font-weight: 400; }
.rosso { fill: var(--rubrica); }
.verde { fill: var(--ok); }
.grigio { fill: var(--grigio); }
</style>
