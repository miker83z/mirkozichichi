<!--
  Diagram (2024 deck, p. 5): the two kinds of security, side by side.
  Left, sicurezza fisica: a building with a locked door and a safe (it protects devices and places).
  Right, sicurezza logica: data turned into unreadable data by a key (it protects the information itself).
  2 clicks: the physical panel, the logical panel.
  <SchemaFisicaLogica />
-->
<template>
  <svg viewBox="0 0 880 250" class="schema" role="img" aria-label="Schema: sicurezza fisica (edifici, porte, casseforti) e sicurezza logica (dati protetti da una chiave)">
    <g v-click>
      <rect x="10" y="6" width="420" height="238" rx="10" class="pannello" />
      <text x="220" y="36" text-anchor="middle" class="titolo">Sicurezza fisica</text>
      <text x="220" y="58" text-anchor="middle" class="sotto">protegge i dispositivi e i locali</text>
      <!-- building with a locked door -->
      <path d="M48,112 L135,76 L222,112 Z" class="tratto" />
      <rect x="60" y="112" width="150" height="88" class="tratto" />
      <rect x="74" y="126" width="26" height="22" class="tratto" />
      <rect x="170" y="126" width="26" height="22" class="tratto" />
      <rect x="113" y="140" width="44" height="60" class="porta" />
      <SvLucchetto :x="121" :y="162" />
      <!-- safe -->
      <rect x="262" y="112" width="100" height="88" rx="5" class="cassaforte" />
      <rect x="271" y="121" width="82" height="70" rx="3" class="tratto" />
      <circle cx="312" cy="156" r="16" class="tratto" />
      <circle cx="312" cy="156" r="3" class="pieno" />
      <path d="M312,140 v5 M312,167 v5 M296,156 h5 M323,156 h5" class="tratto" />
      <path d="M341,146 v20" class="maniglia" />
      <path d="M272,200 v7 M352,200 v7" class="maniglia" />
      <text x="220" y="230" text-anchor="middle" class="esempi">porte blindate, allarmi, casseforti</text>
    </g>
    <g v-click>
      <rect x="450" y="6" width="420" height="238" rx="10" class="pannello" />
      <text x="660" y="36" text-anchor="middle" class="titolo">Sicurezza logica</text>
      <text x="660" y="58" text-anchor="middle" class="sotto">protegge le informazioni</text>
      <SvDocumento :x="478" :y="102" etichetta="dati" />
      <SvFreccia :x1="542" :y1="140" :x2="664" :y2="140" />
      <SvChiave :x="580" :y="116" etichetta="chiave" />
      <SvRiquadro :x="670" :y="104" :w="176" :h="72" :testo="'x7#Qa9!e\nk2$Lp0@z'" mono variante="scuro" />
      <text x="758" y="196" text-anchor="middle" class="nota">dati cifrati: illeggibili</text>
      <text x="660" y="230" text-anchor="middle" class="esempi">crittografia, password, firma elettronica</text>
    </g>
  </svg>
</template>

<style scoped>
.pannello {
  fill: none;
  stroke: var(--linea);
  stroke-width: 1.5;
}
.titolo {
  font-family: var(--serif);
  font-weight: 650;
  font-size: 20px;
  fill: var(--rubrica);
}
.sotto {
  font-size: 15px;
}
.esempi {
  font-size: 15px;
  fill: var(--grigio);
  font-style: italic;
}
.tratto {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 1.8;
}
.porta {
  fill: var(--campo);
  stroke: var(--inchiostro);
  stroke-width: 1.8;
}
.cassaforte {
  fill: var(--campo);
  stroke: var(--inchiostro);
  stroke-width: 2.5;
}
.pieno {
  fill: var(--inchiostro);
}
.maniglia {
  stroke: var(--inchiostro);
  stroke-width: 4;
  stroke-linecap: round;
}
</style>
