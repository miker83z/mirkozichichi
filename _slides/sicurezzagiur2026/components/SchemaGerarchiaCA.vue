<!--
  Diagram (2024 deck, p. 89): the X.509 hierarchy of certification authorities, as small certificate
  cards (name, public key, signature) with "firma" arrows from the issuer to the certificate it signs.
  CA1 is the root (already in the browser, self-signed); CA1 signs CA2 and CA3; CA2 signs CA4 and CA5;
  CA3 signs CA6; CA6 signs Alice's certificate. Then the verification path from Alice up to the root
  is highlighted in green.
  4 clicks: the root; CA2 and CA3; CA4, CA5, CA6 and Alice; the verification path.
  <SchemaGerarchiaCA />
-->
<script setup lang="ts">
interface Carta { nome: string, x: number, y: number }
const W = 112
const H = 72
const c: Record<string, Carta> = {
  CA1: { nome: 'CA1', x: 744, y: 112 },
  CA2: { nome: 'CA2', x: 504, y: 40 },
  CA3: { nome: 'CA3', x: 504, y: 196 },
  CA4: { nome: 'CA4', x: 268, y: 4 },
  CA5: { nome: 'CA5', x: 268, y: 100 },
  CA6: { nome: 'CA6', x: 268, y: 196 },
  Alice: { nome: 'Alice', x: 24, y: 196 },
}
const livello2 = [c.CA2, c.CA3]
const livello3 = [c.CA4, c.CA5, c.CA6, c.Alice]
// "firma" arrows: from the issuer's left side to the signature strip of the certificate it signs
const firma = (da: Carta, a: Carta, dy = 36) => ({ x1: da.x - 2, y1: da.y + dy, x2: a.x + W + 2, y2: a.y + 58 })
const frecce2 = [firma(c.CA1, c.CA2, 20), firma(c.CA1, c.CA3, 62)]
const frecce3 = [firma(c.CA2, c.CA4, 30), firma(c.CA2, c.CA5, 46), firma(c.CA3, c.CA6, 46), firma(c.CA6, c.Alice, 46)]
const percorso = [c.Alice, c.CA6, c.CA3, c.CA1]
</script>

<template>
  <svg viewBox="0 0 880 296" class="schema" role="img" aria-label="Schema: gerarchia delle autorità di certificazione e percorso di verifica dal certificato di Alice alla radice">
    <!-- 1. La radice -->
    <g v-click>
      <g class="carta">
        <rect :x="c.CA1.x" :y="c.CA1.y" :width="W" :height="H" rx="5" class="cornice" />
        <text :x="c.CA1.x + W / 2" :y="c.CA1.y + 17" text-anchor="middle" class="nome">CA1</text>
        <SvChiave :x="c.CA1.x + 22" :y="c.CA1.y + 33" tipo="pubblica" :scala="0.62" />
        <text :x="c.CA1.x + 54" :y="c.CA1.y + 38" class="pub">P<tspan class="pedice">CA1</tspan></text>
        <rect :x="c.CA1.x + 8" :y="c.CA1.y + 48" :width="W - 16" height="18" rx="3" class="striscia" />
        <text :x="c.CA1.x + W / 2" :y="c.CA1.y + 61" text-anchor="middle" class="firma">autofirmato</text>
      </g>
      <text :x="c.CA1.x + W / 2" y="208" text-anchor="middle" class="radice">radice</text>
      <text :x="c.CA1.x + W / 2" y="226" text-anchor="middle" class="nota">già nel browser</text>
    </g>
    <!-- 2. CA1 firma CA2 e CA3 -->
    <g v-click>
      <g v-for="k in livello2" :key="k.nome" class="carta">
        <rect :x="k.x" :y="k.y" :width="W" :height="H" rx="5" class="cornice" />
        <text :x="k.x + W / 2" :y="k.y + 17" text-anchor="middle" class="nome">{{ k.nome }}</text>
        <SvChiave :x="k.x + 22" :y="k.y + 33" tipo="pubblica" :scala="0.62" />
        <text :x="k.x + 54" :y="k.y + 38" class="pub">P<tspan class="pedice">{{ k.nome }}</tspan></text>
        <rect :x="k.x + 8" :y="k.y + 48" :width="W - 16" height="18" rx="3" class="striscia" />
        <text :x="k.x + W / 2" :y="k.y + 61" text-anchor="middle" class="firma">firma</text>
      </g>
      <SvFreccia v-for="(f, i) in frecce2" :key="i" v-bind="f" variante="rubrica" />
      <text x="870" y="14" text-anchor="end" class="nota">→ firma il certificato</text>
    </g>
    <!-- 3. CA2 firma CA4 e CA5, CA3 firma CA6, CA6 firma il certificato di Alice -->
    <g v-click>
      <g v-for="k in livello3" :key="k.nome" class="carta">
        <rect :x="k.x" :y="k.y" :width="W" :height="H" rx="5" class="cornice" />
        <text :x="k.x + W / 2" :y="k.y + 17" text-anchor="middle" class="nome">{{ k.nome }}</text>
        <SvChiave :x="k.x + 22" :y="k.y + 33" tipo="pubblica" :scala="0.62" />
        <text :x="k.x + 54" :y="k.y + 38" class="pub">P<tspan class="pedice">{{ k.nome }}</tspan></text>
        <rect :x="k.x + 8" :y="k.y + 48" :width="W - 16" height="18" rx="3" class="striscia" />
        <text :x="k.x + W / 2" :y="k.y + 61" text-anchor="middle" class="firma">firma</text>
      </g>
      <SvFreccia v-for="(f, i) in frecce3" :key="i" v-bind="f" variante="rubrica" />
    </g>
    <!-- 4. Il percorso di verifica, da Alice alla radice -->
    <g v-click>
      <rect v-for="k in percorso" :key="k.nome" :x="k.x - 3" :y="k.y - 3" :width="W + 6" :height="H + 6" rx="7" class="evidenza" />
      <SvFreccia :x1="c.Alice.x + W + 3" :y1="c.Alice.y + 20" :x2="c.CA6.x - 4" :y2="c.CA6.y + 20" variante="ok" />
      <SvFreccia :x1="c.CA6.x + W + 3" :y1="c.CA6.y + 20" :x2="c.CA3.x - 4" :y2="c.CA3.y + 20" variante="ok" />
      <SvFreccia :x1="c.CA3.x + W + 3" :y1="c.CA3.y + 20" :x2="c.CA1.x - 4" :y2="c.CA1.y + 50" variante="ok" />
      <text x="440" y="290" text-anchor="middle" class="esito">✓ verifica risalendo la catena fino alla radice</text>
    </g>
  </svg>
</template>

<style scoped>
.cornice { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.3; }
.nome { font-size: 15px; font-weight: 700; }
.pub { font-size: 14px; font-weight: 700; fill: var(--ok); }
.striscia { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1; }
.firma { font-size: 13px; fill: var(--rubrica); }
.radice { font-size: 15px; font-weight: 700; fill: var(--rubrica); }
.evidenza { fill: none; stroke: var(--ok); stroke-width: 3; }
.esito { font-size: 16px; font-weight: 700; fill: var(--ok); }
</style>
