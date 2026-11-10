<!--
  Diagram (new, for 2024 deck p. 8): what measures the degree of security, from the attacker's side.
  Three bars (time needed, investment needed, probability of success) converge into "grado di sicurezza";
  then the reminder that absolute security does not exist.
  4 clicks: time (with the "grado di sicurezza" box), investment, probability of success, "sicurezza assoluta: non esiste".
  <SchemaGradoSicurezza />
-->
<template>
  <svg viewBox="0 0 880 262" class="schema" role="img" aria-label="Schema: tempo, investimento e probabilità di successo dell'attaccante determinano il grado di sicurezza; la sicurezza assoluta non esiste">
    <g v-click>
      <text x="78" y="18" class="nota">per chi vuole violare il sistema:</text>
      <!-- hourglass -->
      <path d="M27,32 h26 M27,72 h26" class="tratto spesso" />
      <path d="M30,34 L50,34 L40,52 L50,70 L30,70 L40,52 Z" class="tratto" />
      <path d="M33,69 L47,69 L40,59 Z" class="pieno" />
      <text x="78" y="46" class="voce">tempo necessario</text>
      <rect x="78" y="56" width="240" height="14" rx="3" class="traccia" />
      <rect x="78" y="56" width="196" height="14" rx="3" class="livello" />
      <text x="332" y="68" class="spiega">più è lungo, più è sicuro</text>
      <SvFreccia :x1="500" :y1="63" :x2="620" :y2="114" variante="grigio" />
      <rect x="624" y="94" width="236" height="72" rx="8" class="risultato" />
      <text x="742" y="137" text-anchor="middle" class="grado">grado di sicurezza</text>
    </g>
    <g v-click>
      <circle cx="40" cy="128" r="18" class="tratto" />
      <circle cx="40" cy="128" r="13.5" class="tratto sottile" />
      <text x="40" y="135" text-anchor="middle" class="euro">€</text>
      <text x="78" y="122" class="voce">investimento necessario</text>
      <rect x="78" y="132" width="240" height="14" rx="3" class="traccia" />
      <rect x="78" y="132" width="172" height="14" rx="3" class="livello" />
      <text x="332" y="144" class="spiega">più è alto, più è sicuro</text>
      <SvFreccia :x1="500" :y1="139" :x2="620" :y2="130" variante="grigio" />
    </g>
    <g v-click>
      <circle cx="40" cy="204" r="18" class="tratto" />
      <circle cx="40" cy="204" r="11" class="tratto" />
      <circle cx="40" cy="204" r="4" class="pieno" />
      <text x="78" y="198" class="voce">probabilità di successo</text>
      <rect x="78" y="208" width="240" height="14" rx="3" class="traccia" />
      <rect x="78" y="208" width="34" height="14" rx="3" class="livello" />
      <text x="332" y="220" class="spiega">più è bassa, più è sicuro</text>
      <SvFreccia :x1="500" :y1="215" :x2="620" :y2="146" variante="grigio" />
    </g>
    <g v-click>
      <text x="742" y="208" text-anchor="middle" class="cento">100% sicuro</text>
      <line x1="680" y1="202" x2="804" y2="202" class="barrato" />
      <text x="742" y="238" text-anchor="middle" class="assoluta">sicurezza assoluta: non esiste</text>
    </g>
  </svg>
</template>

<style scoped>
.tratto {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 1.8;
}
.tratto.spesso {
  stroke-width: 3;
  stroke-linecap: round;
}
.tratto.sottile {
  stroke-width: 1;
}
.pieno {
  fill: var(--inchiostro);
}
.euro {
  font-weight: 700;
  font-size: 19px;
}
.voce {
  font-weight: 700;
  font-size: 16px;
}
.spiega {
  font-size: 14px;
  fill: var(--grigio);
}
.traccia {
  fill: var(--campo);
  stroke: var(--linea);
  stroke-width: 1;
}
.livello {
  fill: var(--rubrica);
}
.risultato {
  fill: #fbeeee;
  stroke: var(--rubrica);
  stroke-width: 2;
}
.grado {
  font-family: var(--serif);
  font-weight: 650;
  font-size: 21px;
  fill: var(--rubrica);
}
.cento {
  font-weight: 700;
  font-size: 18px;
  fill: var(--grigio);
}
.barrato {
  stroke: var(--ko);
  stroke-width: 3;
}
.assoluta {
  font-weight: 700;
  font-size: 17px;
  fill: var(--ko);
}
</style>
