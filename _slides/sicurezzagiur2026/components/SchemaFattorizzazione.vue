<!--
  Diagram (new, for 2024 deck p. 40): the asymmetry RSA relies on (in part).
  p = 7.919 and q = 104.729 (the 1.000th and the 10.000th prime) multiply instantly into n = 829.348.951;
  going back from n to p × q is very hard when the numbers are large. Last, two bars to scale:
  the example n has 9 digits, an RSA-2048 modulus has 617.
  3 clicks: the multiplication, the reverse arrow (factoring), the size of RSA-2048.
  <SchemaFattorizzazione />
-->
<script setup lang="ts">
const p = 7919
const q = 104729
const n = p * q
const it = (v: number) => v.toLocaleString('it-IT')
const cifre = String(n).length
const CIFRE_RSA = 617
const LARGHEZZA = 610
</script>

<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: moltiplicare p per q è facile, risalire da n a p e q è difficilissimo; un modulo RSA-2048 ha 617 cifre">
    <g v-click>
      <rect x="20" y="20" width="180" height="44" rx="6" class="riquadro" />
      <text x="110" y="49" text-anchor="middle" class="numero">p = {{ it(p) }}</text>
      <rect x="20" y="76" width="180" height="44" rx="6" class="riquadro" />
      <text x="110" y="105" text-anchor="middle" class="numero">q = {{ it(q) }}</text>
      <path d="M200,42 L250,62 M200,98 L250,78" class="filo" />
      <circle cx="270" cy="70" r="20" class="per" />
      <text x="270" y="78" text-anchor="middle" class="segno">×</text>
      <SvFreccia :x1="290" :y1="70" :x2="530" :y2="70" variante="ok" />
      <text x="410" y="56" text-anchor="middle" class="facile">facile, istantaneo</text>
      <rect x="534" y="42" width="290" height="56" rx="6" class="riquadro rubrica" />
      <text x="679" y="78" text-anchor="middle" class="numero grande">n = {{ it(n) }}</text>
    </g>
    <g v-click>
      <SvFreccia :x1="679" :y1="100" :x2="204" :y2="172" angolo="vh" variante="ko" />
      <rect x="20" y="150" width="180" height="44" rx="6" class="riquadro ko" />
      <text x="110" y="179" text-anchor="middle" class="numero">? × ?</text>
      <text x="440" y="162" text-anchor="middle" class="difficile">difficilissimo per numeri grandi</text>
    </g>
    <g v-click>
      <text x="20" y="231" class="barra-testo">n dell'esempio: {{ cifre }} cifre</text>
      <rect x="236" y="220" :width="(cifre / CIFRE_RSA) * LARGHEZZA" height="14" class="barra piccola" />
      <text x="20" y="259" class="barra-testo forte">RSA-2048: n ha {{ CIFRE_RSA }} cifre</text>
      <rect x="236" y="248" :width="LARGHEZZA" height="14" class="barra" />
    </g>
  </svg>
</template>

<style scoped>
.riquadro {
  fill: var(--campo);
  stroke: var(--linea);
  stroke-width: 1.5;
}
.riquadro.rubrica {
  fill: #fbeeee;
  stroke: var(--rubrica);
}
.riquadro.ko {
  fill: #fdf0e8;
  stroke: var(--ko);
}
.numero {
  font-family: var(--mono);
  font-weight: 600;
  font-size: 19px;
}
.numero.grande {
  font-size: 22px;
  fill: var(--rubrica);
}
.filo {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 2;
}
.per {
  fill: var(--carta);
  stroke: var(--inchiostro);
  stroke-width: 2;
}
.segno {
  font-weight: 700;
  font-size: 24px;
}
.facile {
  font-weight: 700;
  font-size: 17px;
  fill: var(--ok);
}
.difficile {
  font-weight: 700;
  font-size: 17px;
  fill: var(--ko);
}
.barra-testo {
  font-size: 15px;
}
.barra-testo.forte {
  font-weight: 700;
  fill: var(--rubrica);
}
.barra {
  fill: var(--rubrica);
}
.barra.piccola {
  fill: var(--grigio);
}
</style>
