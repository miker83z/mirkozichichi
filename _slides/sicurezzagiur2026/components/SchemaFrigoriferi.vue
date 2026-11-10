<!--
  Diagram (new, for the opening news of 2 November 2026): an attacker on the Internet reaches the
  remote-management software of the supermarket fridges, exposed online and not updated; the set
  temperatures (−18 °C freezer, +4 °C fridge) are raised from remote (orange up-marks on the
  displays, thermometer rising);
  the food has to be thrown away. Labels: integrità (parametri modificati), disponibilità (merce persa).
  No invented "new" temperature: the news only says the temperature was raised.
  4 clicks: attacker on the Internet, the exposed software, the fridge with its settings changed,
  the food thrown away.
  <SchemaFrigoriferi />
-->
<template>
  <svg viewBox="0 0 880 232" class="schema" role="img" aria-label="Schema: attacco ai frigoriferi dei supermercati tramite il software di telegestione">
    <g v-click>
      <path d="M77,54 C61,54 61,34 77,33 C77,18 99,12 109,24 C117,14 139,18 137,34 C151,35 151,54 135,54 Z" class="nuvola" />
      <text x="106" y="46" text-anchor="middle" class="nota">Internet</text>
      <SvPersona :x="106" :y="66" nome="attaccante" variante="ko" />
    </g>
    <g v-click>
      <SvFreccia :x1="135" :y1="100" :x2="225" :y2="100" variante="ko" etichetta="da remoto" />
      <SvRiquadro :x="225" :y="66" :w="150" :h="68" :testo="'software di\ntelegestione'" />
      <text x="300" y="156" text-anchor="middle" class="avviso">esposto su Internet</text>
      <text x="300" y="174" text-anchor="middle" class="avviso forte">non aggiornato</text>
    </g>
    <g v-click>
      <SvFreccia :x1="375" :y1="100" :x2="493" :y2="100" variante="ko" etichetta="comandi" />
      <rect x="495" y="24" width="90" height="152" rx="6" class="frigo" />
      <line x1="495" y1="80" x2="585" y2="80" class="frigo-linea" />
      <line x1="577" y1="40" x2="577" y2="64" class="maniglia" />
      <line x1="577" y1="96" x2="577" y2="128" class="maniglia" />
      <rect x="501" y="36" width="70" height="26" rx="3" class="display" />
      <text x="528" y="54" text-anchor="middle" class="mono gradi">−18 °C</text>
      <path d="M562,42 L567,52 L557,52 Z" class="su" />
      <rect x="501" y="92" width="70" height="26" rx="3" class="display" />
      <text x="528" y="110" text-anchor="middle" class="mono gradi">+4 °C</text>
      <path d="M562,98 L567,108 L557,108 Z" class="su" />
      <rect x="605" y="30" width="12" height="122" rx="6" class="tubo" />
      <rect x="608" y="44" width="6" height="112" class="mercurio" />
      <circle cx="611" cy="160" r="12" class="mercurio" />
      <line v-for="i in 5" :key="i" x1="620" x2="626" :y1="34 + i * 20" :y2="34 + i * 20" class="tacca" />
      <SvFreccia :x1="642" :y1="136" :x2="642" :y2="40" variante="ko" />
      <text x="568" y="204" text-anchor="middle" class="proprieta">integrità</text>
      <text x="568" y="222" text-anchor="middle" class="nota">(parametri modificati)</text>
    </g>
    <g v-click>
      <SvFreccia :x1="660" :y1="100" :x2="726" :y2="100" variante="ko" />
      <rect x="752" y="44" width="20" height="36" class="cartone" />
      <path d="M752,44 L762,35 L772,44 Z" class="cartone" />
      <circle cx="793" cy="60" r="11" class="cibo" />
      <path d="M741,72 L809,72 L801,152 L749,152 Z" class="cestino" />
      <line x1="734" y1="72" x2="816" y2="72" class="bordo" />
      <line v-for="dx in [-13, 0, 13]" :key="dx" :x1="775 + dx" y1="84" :x2="775 + dx * 0.8" y2="142" class="costola" />
      <text x="775" y="204" text-anchor="middle" class="proprieta">disponibilità</text>
      <text x="775" y="222" text-anchor="middle" class="nota">(merce persa)</text>
    </g>
  </svg>
</template>

<style scoped>
.nuvola { fill: var(--campo); stroke: var(--grigio); stroke-width: 1.5; }
.avviso { font-size: 14px; fill: var(--ko); }
.forte { font-weight: 700; }
.frigo { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.frigo-linea { stroke: var(--inchiostro); stroke-width: 2; }
.maniglia { stroke: var(--grigio); stroke-width: 4; stroke-linecap: round; }
.display { fill: var(--inchiostro); }
.schema .gradi { font-size: 14px; fill: var(--carta); }
.su { fill: var(--ko); }
.tubo { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.mercurio { fill: var(--ko); }
.tacca { stroke: var(--grigio); stroke-width: 1.5; }
.proprieta { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
.cartone { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.cibo { fill: #e3b35e; stroke: var(--inchiostro); stroke-width: 1.2; }
.cestino { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.bordo { stroke: var(--inchiostro); stroke-width: 3; stroke-linecap: round; }
.costola { stroke: var(--linea); stroke-width: 2; }
</style>
