<!--
  Diagram (2025 deck, p. 35): the vending machine, Szabo's ancestor of the smart contract. Alice inserts 1 €
  and gets the product: the machine executes the terms by itself. But the terms are set by the produttore,
  so the certainty of a correct execution is only as good as the trust in him; he can change the terms
  (here the price on the display becomes 2 €) and deceive the buyer.
  Sources: N. Szabo, "Formalizing and Securing Relationships on Public Networks", First Monday 2(9), 1997
  (the vending machine as primitive ancestor of smart contracts); the 2025 deck, pp. 34–35.
  3 clicks: Alice and the machine (coin in, product out); the produttore who sets the rules, with the caption
  on trust; the risk in orange (he changes the price, caption "può ingannare l'acquirente").
  <SchemaDistributore />
-->
<script setup lang="ts">
// Products behind the glass: 4 shelves × 3 items, colours from the tokens.
const COLORI = ['rubrica', 'ok', 'glossa', 'ko']
const PRODOTTI = [0, 1, 2, 3].flatMap(r => [0, 1, 2].map(c => ({ x: 384 + c * 27, y: 22 + r * 26, colore: COLORI[(r + c) % 4] })))
</script>

<template>
  <svg viewBox="0 0 880 262" class="schema" role="img" aria-label="Schema: Alice usa un distributore automatico; le regole le decide il produttore, che potrebbe cambiarle e ingannarla">
    <!-- 1. Alice e il distributore -->
    <g v-click>
      <rect x="365" y="6" width="150" height="180" rx="6" class="corpo" />
      <rect x="375" y="14" width="90" height="108" rx="2" class="vetro" />
      <rect v-for="(p, i) in PRODOTTI" :key="i" :x="p.x" :y="p.y" width="18" height="20" rx="3" :class="['prodotto', p.colore]" />
      <line v-for="r in 4" :key="`r${r}`" x1="377" x2="463" :y1="18 + r * 26" :y2="18 + r * 26" class="ripiano" />
      <rect x="473" y="20" width="34" height="22" rx="2" class="display" />
      <text x="490" y="36" text-anchor="middle" class="mono t13">1 €</text>
      <rect x="484" y="54" width="12" height="20" rx="2" class="fessura" />
      <line x1="490" y1="58" x2="490" y2="70" class="taglio" />
      <circle v-for="k in 6" :key="`k${k}`" :cx="481 + ((k - 1) % 2) * 18" :cy="88 + Math.floor((k - 1) / 2) * 12" r="3.5" class="tasto" />
      <rect x="383" y="140" width="114" height="30" rx="3" class="vetro" />
      <text x="440" y="206" text-anchor="middle" class="t15 b">distributore automatico</text>
      <SvPersona :x="110" :y="96" nome="Alice" />
      <SvFreccia :x1="148" :y1="112" :x2="362" :y2="112" etichetta="inserisce 1 €" />
      <SvFreccia :x1="380" :y1="156" :x2="148" :y2="156" etichetta="riceve il prodotto" lato="sotto" />
    </g>
    <!-- 2. il produttore decide le regole -->
    <g v-click>
      <SvPersona :x="770" :y="96" nome="Produttore" />
      <SvFreccia :x1="732" :y1="134" :x2="518" :y2="134" etichetta="stabilisce le regole" variante="grigio" tratteggiata />
      <text x="440" y="234" text-anchor="middle" class="t15">la certezza dell'esecuzione dipende dalla fiducia nel produttore</text>
    </g>
    <!-- 3. il rischio: cambia i termini -->
    <g v-click>
      <SvPersona :x="770" :y="96" variante="ko" />
      <SvFreccia :x1="770" :y1="90" :x2="510" :y2="31" angolo="vh" etichetta="cambia i termini" variante="ko" />
      <rect x="473" y="20" width="34" height="22" rx="2" class="display-ko" />
      <text x="490" y="36" text-anchor="middle" class="mono t13 b arancio">2 €</text>
      <text x="440" y="256" text-anchor="middle" class="t16 b arancio">… e potrebbe ingannare l'acquirente</text>
    </g>
  </svg>
</template>

<style scoped>
.t13 { font-size: 13px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.corpo { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 2; }
.vetro { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.2; }
.ripiano { stroke: var(--linea); stroke-width: 1.5; }
.prodotto { stroke: none; }
.prodotto.rubrica { fill: var(--rubrica); }
.prodotto.ok { fill: var(--ok); }
.prodotto.glossa { fill: var(--glossa); }
.prodotto.ko { fill: var(--ko); }
.display { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.2; }
.display-ko { fill: color-mix(in srgb, var(--ko) 22%, var(--carta)); stroke: var(--ko); stroke-width: 2; }
.fessura { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.2; }
.taglio { stroke: var(--inchiostro); stroke-width: 2; }
.tasto { fill: var(--grigio); }
.arancio { fill: var(--ko); }
</style>
