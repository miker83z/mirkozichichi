<!--
  Diagram (new): how a fiat-backed stablecoin works. Left, the bank world (euro); centre, the issuer; right, the
  blockchain (tokens). Alice deposits 1 € with the issuer, which mints 1 token to her wallet; the token circulates
  (Alice → Bob); Bob redeems it: the token goes back and is burned, Bob gets 1 €. Inside the issuer, the reserves
  (bank deposits and short-term government bonds): 1 token in circulation = 1 € in reserve. Last, the issuer's
  power: the token contract can freeze an address.
  Sources: Circle, Transparency (circle.com/transparency): USDC "always redeemable 1:1", reserves in the Circle
  Reserve Fund (cash, short-dated US Treasuries, overnight Treasury repos) and cash at banks; Regulation (EU)
  2023/1114 (MiCA), art. 49: e-money tokens are issued at par on receipt of funds and redeemed at any time and at
  par (ESMA Interactive Single Rulebook); freeze: Circle FiatToken (github.com/circlefin/stablecoin-evm,
  Blacklistable.sol: blacklist() by the "blacklister" role; transfer, transferFrom, approve, mint revert for a
  blacklisted address); Tether USDT on Ethereum (0xdAC17F958D2ee523a2206206994597C13D831ec7, verified ABI on
  Etherscan): addBlackList, removeBlackList, destroyBlackFunds. Tether and Circle used these functions in the
  Binance theft of 29 Oct 2026 (BleepingComputer, 29 Oct 2026).
  5 clicks: deposit and mint; circulation; redeem and burn (with MiCA's right of redemption); reserves; freeze.
  <SchemaStablecoin />
-->
<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: stablecoin. Alice deposita 1 euro, l'emittente conia 1 token; il token circola; Bob lo rimborsa, il token viene bruciato e Bob riceve 1 euro; l'emittente tiene le riserve e può congelare un indirizzo">
    <!-- 1. Deposito e conio -->
    <g v-click>
      <text x="10" y="15" class="titoletto grigio">in banca (euro)</text>
      <SvPersona :x="56" :y="26" nome="Alice" :scala="0.9" />
      <SvFreccia :x1="92" :y1="56" :x2="288" :y2="56" etichetta="deposita 1 €" variante="rubrica" />
      <rect x="290" y="24" width="210" height="240" rx="8" class="emittente" />
      <text x="395" y="48" text-anchor="middle" class="t16 b">emittente</text>
      <text x="395" y="66" text-anchor="middle" class="nota">es. Circle (USDC, EURC)</text>
      <text x="580" y="15" class="titoletto grigio">sulla blockchain (token)</text>
      <rect x="578" y="24" width="292" height="240" rx="8" class="catena" />
      <SvFreccia :x1="502" :y1="62" :x2="594" :y2="62" etichetta="conia" variante="rubrica" />
      <rect x="596" y="38" width="260" height="48" rx="6" class="wallet" />
      <circle cx="622" cy="62" r="14" class="moneta" />
      <text x="622" y="67" text-anchor="middle" class="cifra">1</text>
      <text x="646" y="58" class="t15 b">Alice: 1 token</text>
      <text x="646" y="76" class="nota">vale 1 €</text>
    </g>

    <!-- 2. Il token circola -->
    <g v-click>
      <SvFreccia :x1="830" :y1="88" :x2="830" :y2="194" variante="rubrica" />
      <text x="820" y="138" text-anchor="end" class="t14">circola</text>
      <text x="820" y="155" text-anchor="end" class="nota">24/7</text>
      <rect x="596" y="196" width="260" height="48" rx="6" class="wallet" />
      <circle cx="622" cy="220" r="14" class="moneta" />
      <text x="622" y="225" text-anchor="middle" class="cifra">1</text>
      <text x="646" y="216" class="t15 b">Bob: 1 token</text>
      <text x="646" y="234" class="nota">da Alice</text>
    </g>

    <!-- 3. Rimborso: il token è bruciato, Bob riceve 1 € -->
    <g v-click>
      <SvFreccia :x1="594" :y1="224" :x2="502" :y2="224" etichetta="brucia" variante="rubrica" />
      <g class="bruciato">
        <line x1="512" y1="234" x2="524" y2="246" />
        <line x1="524" y1="234" x2="512" y2="246" />
      </g>
      <SvFreccia :x1="288" :y1="214" :x2="92" :y2="214" etichetta="riceve 1 €" variante="rubrica" />
      <SvPersona :x="56" :y="166" nome="Bob" :scala="0.9" />
      <text x="10" y="258" class="nota">in UE (MiCA, art. 49): rimborso</text>
      <text x="10" y="275" class="nota">alla pari, in ogni momento</text>
    </g>

    <!-- 4. Le riserve -->
    <g v-click>
      <rect x="306" y="92" width="178" height="104" rx="6" class="riserve" />
      <text x="395" y="114" text-anchor="middle" class="t15 b verde">riserve</text>
      <text x="395" y="136" text-anchor="middle" class="t14">depositi in banca</text>
      <text x="395" y="154" text-anchor="middle" class="t14">titoli di Stato a breve</text>
      <text x="395" y="180" text-anchor="middle" class="nota">1 token in giro = 1 € qui</text>
    </g>

    <!-- 5. Il potere dell'emittente: congelare un indirizzo -->
    <g v-click>
      <SvFreccia :x1="502" :y1="144" :x2="594" :y2="144" etichetta="congela" variante="ko" tratteggiata />
      <rect x="596" y="116" width="140" height="56" rx="6" class="congelato" />
      <SvLucchetto :x="610" :y="136" :scala="0.8" />
      <text x="644" y="140" class="t14 b arancio">indirizzo</text>
      <text x="644" y="158" class="t14 b arancio">congelato</text>
      <text x="870" y="285" text-anchor="end" class="nota">nel contratto del token: blacklist() in USDC, addBlackList() in USDT</text>
    </g>
  </svg>
</template>

<style scoped>
.emittente { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.catena { fill: none; stroke: var(--grigio); stroke-width: 1.2; stroke-dasharray: 5 4; }
.wallet { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.3; }
.riserve { fill: color-mix(in srgb, var(--ok) 12%, var(--carta)); stroke: var(--ok); stroke-width: 1.5; }
.congelato { fill: color-mix(in srgb, var(--ko) 14%, var(--carta)); stroke: var(--ko); stroke-width: 1.5; }
.moneta { fill: #d9a520; stroke: #8a6a12; stroke-width: 1.5; }
.cifra { font-size: 15px; font-weight: 700; fill: #3b2a05; }
.bruciato line { stroke: var(--rubrica); stroke-width: 3; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.grigio { fill: var(--grigio); }
.verde { fill: var(--ok); }
.arancio { fill: var(--ko); }
</style>
