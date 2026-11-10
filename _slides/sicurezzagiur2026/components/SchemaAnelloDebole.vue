<!--
  Diagram (2024 deck, p. 18, originally a photo of a chain with one red link): security as a chain.
  Four links (hardware, software, persone, crittografia); the "persone" link is the thinnest, then it is
  highlighted as the weakest and finally broken.
  Quote (verified, Schneier, Secrets and Lies, preface): "Security is a chain; it's only as secure as the weakest link."
  3 clicks: the chain, the weakest link highlighted, the broken link with the caption.
  <SchemaAnelloDebole />
-->
<script setup lang="ts">
const anelli = [
  { x: 30, nome: 'hardware' },
  { x: 240, nome: 'software' },
  { x: 450, nome: 'persone', debole: true },
  { x: 660, nome: 'crittografia' },
]
const raccordi = [220, 430, 640]
</script>

<template>
  <svg viewBox="0 0 880 226" class="schema" role="img" aria-label="Schema: la sicurezza è una catena di hardware, software, persone e crittografia; si rompe nell'anello più debole, le persone">
    <g v-click>
      <g v-for="a in anelli" :key="a.nome">
        <rect :x="a.x" y="56" width="170" height="78" rx="39" :class="['anello', { sottile: a.debole }]" />
        <text :x="a.x + 85" y="101" text-anchor="middle" class="nome">{{ a.nome }}</text>
      </g>
      <rect v-for="c in raccordi" :key="c" :x="c - 48" y="86" width="96" height="18" rx="9" class="raccordo" />
    </g>
    <g v-click>
      <rect x="450" y="56" width="170" height="78" rx="39" class="anello sottile debole" />
      <rect x="382" y="86" width="96" height="18" rx="9" class="raccordo" />
      <rect x="592" y="86" width="96" height="18" rx="9" class="raccordo" />
      <text x="535" y="101" text-anchor="middle" class="nome debole-testo">persone</text>
      <text x="535" y="26" text-anchor="middle" class="avviso">l'anello più debole</text>
    </g>
    <g v-click>
      <rect x="584" y="46" width="15" height="20" class="taglio" />
      <rect x="584" y="124" width="15" height="20" class="taglio" />
      <path d="M580,43 l-5,-6 M603,43 l5,-6 M580,147 l-5,6 M603,147 l5,6" class="scintille" />
      <text x="440" y="190" text-anchor="middle" class="motto">la sicurezza è una catena: forte quanto l'anello più debole</text>
    </g>
  </svg>
</template>

<style scoped>
.anello {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 10;
}
.anello.sottile {
  stroke-width: 5;
}
.anello.debole {
  stroke: var(--ko);
}
.raccordo {
  fill: var(--inchiostro);
  stroke: var(--carta);
  stroke-width: 3;
}
.nome {
  font-weight: 700;
  font-size: 18px;
}
.debole-testo {
  fill: var(--ko);
}
.avviso {
  font-weight: 700;
  font-size: 18px;
  fill: var(--ko);
}
.taglio {
  fill: var(--carta);
}
.scintille {
  stroke: var(--ko);
  stroke-width: 2.2;
  stroke-linecap: round;
}
.motto {
  font-family: var(--serif);
  font-style: italic;
  font-size: 21px;
  fill: var(--rubrica);
}
</style>
