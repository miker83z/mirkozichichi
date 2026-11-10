<!--
  Diagram (new): Ethereum's monetary policy since EIP-1559 (London upgrade, 5 Aug 2021) and The Merge (15 Sep
  2022, move to Proof of Stake). A user pays a fee = base fee + priority fee (tip). The base fee is burned:
  destroyed by the protocol, it goes to nobody; the tip goes to the validator who proposes the block. The protocol
  also creates new ETH and gives them to validators as staking rewards. Right, a tub: all the ETH in existence,
  with a tap (new ETH, mint) and a drain (burned ETH); no maximum supply; the level rises or falls with the
  activity of the network (a busy network raises the base fee, so more is burned than created).
  Sources (checked 10 Nov 2026):
  - EIP-1559 (eips.ethereum.org/EIPS/eip-1559): "The base fee is always burned (i.e. it is destroyed by the
    protocol)"; "miners only get to keep the priority fee"; the base fee rises when blocks are above the gas
    target and falls when below (since The Merge, the block proposer is a validator);
  - ethereum.org/developers/docs/gas: fee = gas used × (base fee + priority fee); the base fee "is burned,
    removing it from circulation"; "The validator receives the tip";
  - ethereum.org/roadmap/merge/issuance: validators "are rewarded with ETH"; fee burning "went live with the
    London upgrade in August 2021"; at ≥ 16 gwei average gas price the burn brings "net ETH inflation to zero or
    less"; "Total ETH supply: ~120,520,000 ETH (at time of The Merge in September 2022)";
  - ethereum.org/eth/supply: "Ethereum's future supply isn't fixed"; "when network activity is high, ETH burn rates
    can surpass issuance, creating a deflationary effect";
  - dates: ethereum.org/ethereum-forks (London, 5 Aug 2021, block 12,965,000; Paris/The Merge, 15 Sep 2022);
  - current supply: CoinGecko API (api.coingecko.com/api/v3/coins/ethereum), market_data.circulating_supply =
    total_supply = 122,206,811 ETH, max_supply null, last_updated 2026-11-10T17:44:55Z; cross-checked the same day
    with ultrasound.money/api/v2/fees/supply-parts (execution balances + beacon balances − beacon deposits =
    122,206,687 ETH, block 26,386,104). So since The Merge the supply has grown by about 1.7 million ETH.
  4 clicks: the fee and its two parts; base fee burned, tip to the validator; new ETH to validators (staking);
  the tub: all ETH, tap and drain, no cap, current supply.
  <SchemaTokenomicsEthereum />
-->

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: su Ethereum chi fa una transazione paga una commissione fatta di base fee, che viene bruciata, e mancia, che va al validatore; il protocollo crea nuovi ETH come ricompensa di staking; gli ETH totali salgono o scendono a seconda di quanti se ne creano e se ne bruciano, senza un tetto massimo">
    <!-- 1. La commissione: base fee + mancia -->
    <g v-click>
      <SvPersona :x="44" :y="98" nome="Alice" />
      <SvFreccia :x1="72" :y1="136" :x2="110" :y2="136" />
      <rect x="112" y="56" width="176" height="144" rx="8" class="conto" />
      <text x="200" y="76" text-anchor="middle" class="t15 b">commissione (fee)</text>
      <SvRiquadro :x="124" :y="86" :w="152" :h="40" testo="base fee" variante="rubrica" />
      <text x="200" y="142" text-anchor="middle" class="t16 b">+</text>
      <SvRiquadro :x="124" :y="148" :w="152" :h="40" testo="mancia (tip)" variante="ok" />
      <text x="112" y="222" class="nota">la base fee sale quando</text>
      <text x="112" y="238" class="nota">la rete è affollata</text>
    </g>

    <!-- 2. La base fee è bruciata, la mancia va al validatore -->
    <g v-click>
      <SvFreccia :x1="278" :y1="106" :x2="334" :y2="106" variante="rubrica" />
      <g transform="translate(352,108)" class="fiamma">
        <path d="M0,-22 C6,-12 13,-6 11,4 C10,12 5,16 0,16 C-5,16 -11,12 -11,4 C-11,-4 -5,-6 -4,-14 C-1,-9 1,-8 0,-22 Z" />
        <path d="M0,-4 C3,1 5,4 4,8 C3,11 1,12 0,12 C-2,12 -4,11 -4,8 C-4,4 -1,2 0,-4 Z" class="cuore" />
      </g>
      <text x="372" y="101" class="t15 b rosso">bruciata (burn)</text>
      <text x="372" y="119" class="nota">distrutta: non va a nessuno</text>
      <SvFreccia :x1="278" :y1="168" :x2="423" :y2="168" variante="ok" />
      <SvRiquadro :x="425" :y="146" :w="135" :h="44" testo="validatore" variante="vuoto" />
    </g>

    <!-- 3. Il protocollo crea nuovi ETH per i validatori -->
    <g v-click>
      <SvRiquadro :x="415" :y="226" :w="155" :h="46" testo="il protocollo crea\nnuovi ETH (mint)" variante="ok" />
      <SvFreccia :x1="492" :y1="224" :x2="492" :y2="192" variante="ok" />
      <text x="483" y="212" text-anchor="end" class="t14">ricompensa di staking</text>
    </g>

    <!-- 4. La vasca: tutti gli ETH -->
    <g v-click>
      <text x="692" y="26" class="t14 b verde">+ nuovi ETH (mint)</text>
      <SvFreccia :x1="680" :y1="14" :x2="680" :y2="104" variante="ok" />
      <text x="852" y="54" text-anchor="end" class="nota">↑ nessun tetto massimo</text>
      <rect x="642" y="110" width="216" height="86" class="acqua" />
      <path d="M640,62 V198 H860 V62" class="vasca" />
      <text x="750" y="138" text-anchor="middle" class="t15 b">tutti gli ETH: ≈ 122,2 milioni</text>
      <text x="750" y="157" text-anchor="middle" class="t13">al 10 novembre 2026</text>
      <text x="750" y="182" text-anchor="middle" class="t13 tenue">(settembre 2022: ≈ 120,5 milioni)</text>
      <SvFreccia :x1="810" :y1="198" :x2="810" :y2="230" variante="rubrica" />
      <text x="800" y="224" text-anchor="end" class="t14 b rosso">− bruciati (burn)</text>
      <text x="870" y="254" text-anchor="end" class="t14">rete affollata: bruciati &gt; creati → calano</text>
      <text x="870" y="272" text-anchor="end" class="t14">rete tranquilla: bruciati &lt; creati → salgono</text>
    </g>
  </svg>
</template>

<style scoped>
.t13 { font-size: 13px; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.rosso { fill: var(--rubrica); }
.verde { fill: var(--ok); }
.tenue { fill: var(--grigio); }
.conto { fill: none; stroke: var(--grigio); stroke-width: 1.2; stroke-dasharray: 5 4; }
.fiamma path { fill: var(--rubrica); }
.fiamma .cuore { fill: var(--glossa); }
.acqua { fill: color-mix(in srgb, var(--acqua) 30%, var(--carta)); }
.vasca { fill: none; stroke: var(--inchiostro); stroke-width: 2.5; stroke-linejoin: round; }
</style>
