<!--
  Diagram (new): an automated market maker (Uniswap v2, constant product x · y = k), with a small worked example.
  The pool (a contract) holds 10 ETH and 30,000 USDC: k = 300,000, price 30,000 / 10 = 3,000 USDC per ETH (an
  example, not a market price); the 0.3% fee of every trade goes to the liquidity providers. Alice pays 3,000 USDC:
  the pool must keep x · y = 300,000, so it keeps 300,000 / 33,000 = 9.0909 ETH and gives her 10 − 9.0909 = 0.909
  ETH (fee ignored; with it 0.907). New balances 9.091 ETH and 33,000 USDC; average price paid 3,000 / 0.909 =
  3,300 (+10%), new pool price 33,000 / 9.0909 = 3,630. A trade of 300 USDC would pay 3,030 on average (+1%): the
  bigger the trade, the more it moves the price. Last, the curve y = 300,000 / x with the points before (A) and
  after (B). The average price is exactly (y + Δy) / x, so +Δy/y: 10% for 3,000, 1% for 300.
  Source: Uniswap v2 Core whitepaper (H. Adams, N. Zinsmeister, D. Robinson, 2020, app.uniswap.org/whitepaper.pdf):
  §1 "constant product formula", 30-basis-point fee to liquidity providers; §3.2.1 the 0.3% fee. Numbers computed
  exactly; the same example as the Amm.vue demo.
  4 clicks: the pool; Alice's trade; the new balances and price; the curve.
  <SchemaAmm />
-->
<script setup lang="ts">
const K = 300_000
// Plot: ETH from 6 to 14 on x, USDC from 20,000 to 50,000 on y.
const X0 = 590, Y0 = 240, SX = 270 / 8, SY = 210 / 30_000
const px = (eth: number) => X0 + (eth - 6) * SX
const py = (usdc: number) => Y0 - (usdc - 20_000) * SY
const curva = Array.from({ length: 41 }, (_, i) => 6 + i * 0.2)
  .map((e, i) => `${i ? 'L' : 'M'}${px(e).toFixed(1)},${py(K / e).toFixed(1)}`).join(' ')
const A = { x: px(10), y: py(30_000) }
const B = { x: px(K / 33_000), y: py(33_000) }
const tacche = [6, 8, 10, 12, 14]
const tacche_y = [20_000, 30_000, 40_000, 50_000]
const n = (v: number) => v.toLocaleString('it-IT')
// arc of the curve from A to B, for the arrow
const arco = Array.from({ length: 9 }, (_, i) => 10 - i * (10 - K / 33_000) / 8)
  .map((e, i) => `${i ? 'L' : 'M'}${px(e).toFixed(1)},${py(K / e).toFixed(1)}`).join(' ')
// bars: 90 px for the starting balance of each token (equal value on both sides)
const H = 90, BASE = 180
</script>

<template>
  <svg viewBox="0 0 880 296" class="schema" role="img" aria-label="Schema: un AMM. Il pool ha 10 ETH e 30.000 USDC; Alice paga 3.000 USDC e riceve 0,909 ETH perché il prodotto resti 300.000; il prezzo sale; la curva x per y uguale a k">
    <!-- 1. Il pool -->
    <g v-click>
      <rect x="190" y="24" width="280" height="204" rx="10" class="pool" />
      <text x="330" y="46" text-anchor="middle" class="t16 b">pool <tspan class="t14 n grigio">(contratto)</tspan></text>
      <text x="330" y="68" text-anchor="middle" class="mono t15">x · y = k</text>
      <rect x="226" :y="BASE - H" width="70" :height="H" class="barra usdc" />
      <rect x="364" :y="BASE - H" width="70" :height="H" class="barra eth" />
      <text x="261" y="198" text-anchor="middle" class="t14 b">30.000 USDC</text>
      <text x="399" y="198" text-anchor="middle" class="t14 b">10 ETH</text>
      <text x="330" y="250" text-anchor="middle" class="t14">prezzo: 30.000 / 10 = 3.000 USDC per ETH</text>
      <text x="330" y="270" text-anchor="middle" class="nota">lo 0,3% di ogni scambio va ai fornitori di liquidità</text>
    </g>

    <!-- 2. Lo scambio di Alice -->
    <g v-click>
      <SvPersona :x="48" :y="58" nome="Alice" :scala="0.9" />
      <SvFreccia :x1="80" :y1="92" :x2="188" :y2="92" etichetta="3.000 USDC" variante="rubrica" />
      <SvFreccia :x1="188" :y1="150" :x2="80" :y2="150" etichetta="0,909 ETH" lato="sotto" variante="rubrica" />
      <text x="10" y="194" class="nota">ETH che restano:</text>
      <text x="10" y="210" class="mono t13">300.000/33.000</text>
      <text x="10" y="226" class="mono t13">= 9,091</text>
    </g>

    <!-- 3. Nuovi saldi e nuovo prezzo -->
    <g v-click>
      <rect x="226" :y="BASE - H * 1.1" width="70" :height="H * 0.1" class="aggiunta" />
      <rect x="364" :y="BASE - H" width="70" :height="H * (1 - 9.0909 / 10)" class="tolta" />
      <text x="261" y="214" text-anchor="middle" class="t14 b rosso">→ 33.000</text>
      <text x="399" y="214" text-anchor="middle" class="t14 b rosso">→ 9,091</text>
      <text x="10" y="250" class="t14 b rosso">prezzo medio 3.300</text>
      <text x="10" y="267" class="nota">+10% (slippage); con</text>
      <text x="10" y="283" class="nota">300 USDC solo +1%</text>
      <text x="330" y="290" text-anchor="middle" class="t14 b">nuovo prezzo: 33.000 / 9,091 = 3.630</text>
    </g>

    <!-- 4. La curva x · y = k -->
    <g v-click>
      <line :x1="X0" :y1="Y0" x2="866" :y2="Y0" class="asse" />
      <line :x1="X0" :y1="Y0" :x2="X0" y2="22" class="asse" />
      <g v-for="t in tacche" :key="t">
        <line :x1="px(t)" :x2="px(t)" :y1="Y0" :y2="Y0 + 5" class="asse" />
        <text :x="px(t)" :y="Y0 + 19" text-anchor="middle" class="nota">{{ t }}</text>
      </g>
      <g v-for="t in tacche_y" :key="t">
        <line :x1="X0 - 5" :x2="X0" :y1="py(t)" :y2="py(t)" class="asse" />
        <text :x="X0 - 8" :y="py(t) + 4" text-anchor="end" class="nota">{{ n(t) }}</text>
      </g>
      <text x="866" :y="Y0 + 38" text-anchor="end" class="t13">ETH nel pool</text>
      <text :x="X0 + 8" y="22" class="t13">USDC nel pool</text>
      <path :d="curva" class="curva" />
      <text x="862" y="104" text-anchor="end" class="t14 b">x · y = 300.000</text>
      <text x="862" y="122" text-anchor="end" class="nota">in ogni punto della curva</text>
      <path :d="arco" class="arco" />
      <circle :cx="A.x" :cy="A.y" r="5" class="punto" />
      <circle :cx="B.x" :cy="B.y" r="5" class="punto dopo" />
      <text :x="A.x + 10" :y="A.y + 5" class="t13">A: prima (10; 30.000)</text>
      <text :x="B.x + 12" :y="B.y - 6" class="t13 rosso">B: dopo (9,09; 33.000)</text>
    </g>
  </svg>
</template>

<style scoped>
.pool { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.barra { stroke: var(--inchiostro); stroke-width: 1.3; }
.barra.usdc { fill: color-mix(in srgb, var(--ok) 35%, var(--carta)); }
.barra.eth { fill: color-mix(in srgb, var(--grigio) 45%, var(--carta)); }
.aggiunta { fill: color-mix(in srgb, var(--rubrica) 40%, var(--carta)); stroke: var(--rubrica); stroke-width: 1.5; }
.tolta { fill: var(--carta); stroke: var(--ko); stroke-width: 1.5; stroke-dasharray: 4 3; }
.asse { stroke: var(--grigio); stroke-width: 1.2; }
.curva { fill: none; stroke: var(--inchiostro); stroke-width: 2.2; }
.arco { fill: none; stroke: var(--rubrica); stroke-width: 4; stroke-linecap: round; }
.punto { fill: var(--inchiostro); }
.punto.dopo { fill: var(--rubrica); }
.t13 { font-size: 13px; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.n { font-weight: 400; }
.rosso { fill: var(--rubrica); }
.grigio { fill: var(--grigio); }
</style>
