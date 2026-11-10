<!--
  Diagram (new): front-running and the "sandwich". Alice's swap waits in the public mempool (the waiting room of
  transactions not yet in a block, readable by anyone); a bot sees it, gets its own purchase placed just before
  (pushing the price up), lets Alice buy at the higher price and sells just after. Same pool as SchemaAmm
  (10 ETH, 30,000 USDC, x · y = 300,000, fees and gas ignored), bot and Alice spend 3,000 USDC each, computed
  exactly: the bot gets 0.909 ETH (price 3,000 → 3,630); Alice gets 300,000/33,000 − 300,000/36,000 = 0.758 ETH
  instead of 0.909 (−16.7%; price → 4,320); the bot sells its 0.909 ETH for 36,000 − 300,000/9.2424 = 3,541 USDC,
  +541 (price → 3,512). In practice Alice's slippage tolerance caps how much the bot can take.
  Sources: ethereum.org, "Maximal extractable value (MEV)" (ethereum.org/en/developers/docs/mev/): sandwich trading,
  "a searcher will watch the mempool for large DEX trades", buys immediately before and sells immediately after;
  P. Daian et al., "Flash Boys 2.0", IEEE S&P 2020 (arXiv:1904.05234): bots pay higher fees to be ordered first.
  5 clicks: the mempool with Alice's order; the bot sees it; the bot buys first; Alice's trade; the bot sells.
  <SchemaMev />
-->
<script setup lang="ts">
const ALTRE = [40, 74, 108] // y of the other pending transactions
const SLOT = [38, 104, 170] // y of the three positions in the block
</script>

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: attacco sandwich. L'ordine di Alice aspetta nella mempool pubblica; un bot lo vede, compra subito prima, Alice compra a un prezzo peggiore, il bot rivende subito dopo e guadagna">
    <!-- 1. La mempool, con l'ordine di Alice -->
    <g v-click>
      <text x="102" y="16" class="titoletto">mempool <tspan class="t14 n grigio">(sala d'attesa pubblica)</tspan></text>
      <rect x="100" y="26" width="300" height="152" rx="8" class="mempool" />
      <g v-for="y in ALTRE" :key="y">
        <rect x="116" :y="y" width="268" height="28" rx="4" class="tx" />
        <text x="128" :y="y + 19" class="nota">transazione in attesa</text>
      </g>
      <rect x="116" y="142" width="268" height="28" rx="4" class="tx alice" />
      <text x="128" y="161" class="t14 b">Alice: compra ETH, 3.000 USDC</text>
      <SvPersona :x="44" :y="112" nome="Alice" :scala="0.9" />
      <SvFreccia :x1="68" :y1="156" :x2="114" :y2="156" variante="rubrica" />
    </g>

    <!-- 2. Il bot la vede -->
    <g v-click>
      <SvPersona :x="250" :y="206" nome="bot" :scala="0.9" variante="ko" />
      <SvFreccia :x1="250" :y1="204" :x2="250" :y2="174" variante="ko" tratteggiata />
      <text x="282" y="228" class="t14 b arancio">vede l'ordine</text>
      <text x="282" y="246" class="t14 b arancio">di Alice</text>
    </g>

    <!-- 3-5. Il prossimo blocco: compra prima, Alice, vende dopo -->
    <g v-click>
      <text x="442" y="16" class="titoletto">prossimo blocco <tspan class="t14 n grigio">(l'ordine conta)</tspan></text>
      <rect x="440" y="26" width="430" height="210" rx="8" class="blocco" />
      <rect x="456" :y="SLOT[0]" width="398" height="56" rx="6" class="slot ko" />
      <SvPersona :x="480" :y="SLOT[0] + 10" :scala="0.5" variante="ko" />
      <text x="504" :y="SLOT[0] + 23" class="t15 b arancio">1. il bot compra 0,909 ETH</text>
      <text x="504" :y="SLOT[0] + 43" class="t13">con 3.000 USDC, prima di Alice</text>
      <text x="842" :y="SLOT[0] + 34" text-anchor="end" class="t14">prezzo 3.630 ↑</text>
      <text x="250" y="284" text-anchor="middle" class="nota">il bot paga una commissione più alta per passare prima</text>
    </g>
    <g v-click>
      <SvFreccia :x1="386" :y1="156" :x2="454" :y2="136" variante="rubrica" />
      <rect x="456" :y="SLOT[1]" width="398" height="56" rx="6" class="slot alice" />
      <SvPersona :x="480" :y="SLOT[1] + 10" :scala="0.5" />
      <text x="504" :y="SLOT[1] + 23" class="t15 b rosso">2. Alice riceve 0,758 ETH</text>
      <text x="504" :y="SLOT[1] + 43" class="t13">invece di 0,909 (−17%)</text>
      <text x="842" :y="SLOT[1] + 34" text-anchor="end" class="t14">prezzo 4.320 ↑</text>
    </g>
    <g v-click>
      <rect x="456" :y="SLOT[2]" width="398" height="56" rx="6" class="slot ko" />
      <SvPersona :x="480" :y="SLOT[2] + 10" :scala="0.5" variante="ko" />
      <text x="504" :y="SLOT[2] + 23" class="t15 b arancio">3. il bot rivende 0,909 ETH</text>
      <text x="504" :y="SLOT[2] + 43" class="t13">incassa 3.541 USDC: +541</text>
      <text x="842" :y="SLOT[2] + 34" text-anchor="end" class="t14">prezzo 3.512 ↓</text>
      <text x="655" y="258" text-anchor="middle" class="nota">pool di 10 ETH e 30.000 USDC, senza commissioni</text>
    </g>
  </svg>
</template>

<style scoped>
.mempool { fill: none; stroke: var(--grigio); stroke-width: 1.3; stroke-dasharray: 5 4; }
.tx { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.tx.alice { fill: color-mix(in srgb, var(--rubrica) 12%, var(--carta)); stroke: var(--rubrica); stroke-width: 1.5; }
.blocco { fill: none; stroke: var(--inchiostro); stroke-width: 1.5; }
.slot { stroke-width: 1.5; }
.slot.ko { fill: color-mix(in srgb, var(--ko) 12%, var(--carta)); stroke: var(--ko); }
.slot.alice { fill: color-mix(in srgb, var(--rubrica) 12%, var(--carta)); stroke: var(--rubrica); }
.t13 { font-size: 13px; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.b { font-weight: 700; }
.n { font-weight: 400; }
.rosso { fill: var(--rubrica); }
.arancio { fill: var(--ko); }
.grigio { fill: var(--grigio); }
</style>
