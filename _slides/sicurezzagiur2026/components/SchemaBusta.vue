<!--
  Diagram (2024 deck, p. 57): commitment as a sealed envelope. Today: the offer x plus a random secret nonce go
  into a closed envelope, i.e. only the impronta H(nonce ‖ x) is published (hiding). Later: the envelope is opened
  by revealing x and the nonce, and anyone recomputes the impronta and finds the published one (binding).
  Real values computed with utils/crypto.ts: nonce = SHA-256("nonce di esempio") (64 hex, shown shortened),
  impronta = SHA-256(nonce + "Offerta: 125.000 €") (UTF-8 string concatenation), shown shortened.
  4 clicks: x and the nonce; the closed envelope = the published impronta; time passes, the envelope is opened
  and x and the nonce are revealed; anyone recomputes the impronta ✓.
  <SchemaBusta />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const offerta = 'Offerta: 125.000 €'
const nonce = sha256('nonce di esempio')
const impronta = `H(nonce ‖ x) = ${short(sha256(nonce + offerta))}`
const testoNonce = `nonce ${short(nonce, 8, 4)}`
</script>

<template>
  <svg viewBox="0 0 880 285" class="schema" role="img" aria-label="Schema: impegno con busta chiusa, si pubblica l'impronta e più tardi si apre la busta">
    <g v-click>
      <SvRiquadro :x="20" :y="14" :w="200" :h="40" :testo="offerta" variante="vuoto" />
      <SvRiquadro :x="20" :y="62" :w="200" :h="32" :testo="testoNonce" mono piccolo />
      <text x="120" y="112" text-anchor="middle" class="nota">x + numero casuale segreto</text>
    </g>
    <g v-click>
      <SvFreccia :x1="224" :y1="54" :x2="290" :y2="54" etichetta="sigillo" />
      <rect x="294" y="22" width="110" height="66" rx="3" class="busta" />
      <path d="M294,22 L349,62 L404,22" class="lembo" />
      <circle cx="349" cy="62" r="7" class="sigillo" />
      <text x="349" y="106" text-anchor="middle" class="nota">busta chiusa</text>
      <SvFreccia :x1="408" :y1="54" :x2="470" :y2="54" etichetta="pubblico" />
      <SvRiquadro :x="472" :y="32" :w="390" :h="44" :testo="impronta" variante="vuoto" mono />
      <text x="667" y="96" text-anchor="middle" class="nota">si vede l'impronta, non l'offerta (hiding)</text>
    </g>
    <g v-click>
      <circle cx="44" cy="146" r="17" class="orologio" />
      <path d="M44,146 V136 M44,146 L52,150" class="lancette" />
      <text x="72" y="151" class="tx-15">passa il tempo… (es. scade il termine delle offerte)</text>
      <rect x="20" y="200" width="110" height="60" rx="3" class="busta" />
      <path d="M20,200 L75,172 L130,200" class="lembo" />
      <path d="M20,200 L75,232 L130,200" class="lembo sottile" />
      <SvFreccia :x1="134" :y1="226" :x2="196" :y2="226" etichetta="apro" />
      <SvRiquadro :x="200" :y="186" :w="200" :h="38" :testo="offerta" variante="vuoto" />
      <SvRiquadro :x="200" :y="230" :w="200" :h="30" :testo="testoNonce" mono piccolo />
    </g>
    <g v-click>
      <SvFreccia :x1="404" :y1="226" :x2="470" :y2="226" etichetta="ricalcolo" />
      <SvRiquadro :x="472" :y="204" :w="390" :h="44" :testo="`${impronta} ✓`" variante="ok" mono />
      <path d="M667,104 V200" class="uguale" />
      <text x="680" y="158" class="tx-20 tx-b tx-ok">=</text>
      <text x="667" y="268" text-anchor="middle" class="nota">chiunque verifica: l'offerta non è cambiata (binding)</text>
    </g>
  </svg>
</template>

<style scoped>
.busta { fill: #faf6ec; stroke: var(--inchiostro); stroke-width: 1.5; }
.lembo { fill: none; stroke: var(--inchiostro); stroke-width: 1.5; }
.lembo.sottile { stroke: var(--linea); }
.sigillo { fill: var(--rubrica); }
.orologio { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.lancette { fill: none; stroke: var(--inchiostro); stroke-width: 2; stroke-linecap: round; }
.uguale { fill: none; stroke: var(--ok); stroke-width: 1.5; stroke-dasharray: 5 4; }
.tx-15 { font-size: 15px; }
.tx-20 { font-size: 20px; }
.tx-b { font-weight: 700; }
.tx-ok { fill: var(--ok); }
</style>
