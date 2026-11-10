<!--
  Diagram (2024 deck, p. 6): the five security properties around the data, each with a small pictogram.
  Corrected: riservatezza no longer includes "autenticità della fonte" (that is autenticazione, see VERIFICA.md).
  5 clicks: the data with riservatezza (crossed eye), integrità (document with a check), disponibilità (clock),
  autenticazione (person with a question mark), non ripudio (signature).
  <SchemaTerminologia />
-->
<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: riservatezza, integrità, disponibilità, autenticazione e non ripudio intorno ai dati">
    <g v-click>
      <circle cx="440" cy="135" r="50" class="dati" />
      <text x="440" y="142" text-anchor="middle" class="testo-dati">dati</text>
      <line x1="399" y1="107" x2="314" y2="49" class="raggio" />
      <rect x="14" y="14" width="300" height="70" rx="8" class="scheda" />
      <circle cx="48" cy="49" r="23" class="icona" />
      <path d="M33,49 Q48,36 63,49 Q48,62 33,49 Z" class="tratto" />
      <circle cx="48" cy="49" r="4.5" class="pieno" />
      <line x1="35" y1="61" x2="61" y2="37" class="barra" />
      <text x="82" y="43" class="nome">Riservatezza</text>
      <text x="82" y="66" class="descr">solo chi è autorizzato legge</text>
    </g>

    <g v-click>
      <line x1="481" y1="107" x2="566" y2="49" class="raggio" />
      <rect x="566" y="14" width="300" height="70" rx="8" class="scheda" />
      <circle cx="600" cy="49" r="23" class="icona" />
      <path d="M590,36 h14 l6,6 v20 h-20 Z" class="tratto foglio" />
      <path d="M594,51 l4,5 l8,-11" class="spunta" />
      <text x="634" y="43" class="nome">Integrità</text>
      <text x="634" y="66" class="descr">nessuna modifica non autorizzata</text>
    </g>

    <g v-click>
      <line x1="392" y1="149" x2="314" y2="171" class="raggio" />
      <rect x="14" y="136" width="300" height="70" rx="8" class="scheda" />
      <circle cx="48" cy="171" r="23" class="icona" />
      <circle cx="48" cy="171" r="13" class="tratto foglio" />
      <path d="M48,171 v-9 M48,171 h7" class="lancette" />
      <text x="82" y="165" class="nome">Disponibilità</text>
      <text x="82" y="188" class="descr">accessibili quando servono</text>
    </g>

    <g v-click>
      <line x1="488" y1="149" x2="566" y2="171" class="raggio" />
      <rect x="566" y="136" width="300" height="70" rx="8" class="scheda" />
      <circle cx="600" cy="171" r="23" class="icona" />
      <circle cx="595" cy="164" r="5.5" class="pieno" />
      <path d="M584,184 C584,174 589,172 595,172 C601,172 606,174 606,184 Z" class="pieno" />
      <text x="610" y="170" class="domanda">?</text>
      <text x="634" y="165" class="nome">Autenticazione</text>
      <text x="634" y="188" class="descr">con chi sto parlando?</text>
    </g>

    <g v-click>
      <line x1="440" y1="185" x2="440" y2="212" class="raggio" />
      <rect x="290" y="212" width="300" height="70" rx="8" class="scheda" />
      <circle cx="324" cy="247" r="23" class="icona" />
      <path d="M310,250 c3,-12 7,-12 8,-3 s4,6 7,-6 s5,4 9,0" class="firma" />
      <line x1="309" y1="256" x2="339" y2="256" class="tratto" />
      <text x="358" y="241" class="nome">Non ripudio</text>
      <text x="358" y="264" class="descr">non si può negare</text>
    </g>
  </svg>
</template>

<style scoped>
.dati {
  fill: color-mix(in srgb, var(--rubrica) 14%, var(--carta));
  stroke: var(--rubrica);
  stroke-width: 2;
}
.testo-dati {
  font-family: var(--serif);
  font-weight: 650;
  font-size: 22px;
  fill: var(--rubrica);
}
.raggio {
  stroke: var(--linea);
  stroke-width: 2;
}
.scheda {
  fill: var(--carta);
  stroke: var(--linea);
  stroke-width: 1.5;
}
.icona {
  fill: var(--campo);
  stroke: none;
}
.nome {
  font-weight: 700;
  font-size: 17px;
  fill: var(--rubrica);
}
.descr {
  font-size: 15px;
}
.tratto {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 1.8;
}
.tratto.foglio {
  fill: var(--carta);
}
.pieno {
  fill: var(--inchiostro);
}
.barra {
  stroke: var(--rubrica);
  stroke-width: 2.5;
  stroke-linecap: round;
}
.spunta {
  fill: none;
  stroke: var(--ok);
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lancette {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 2;
  stroke-linecap: round;
}
.domanda {
  font-weight: 800;
  font-size: 20px;
  fill: var(--rubrica);
}
.firma {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 1.8;
  stroke-linecap: round;
}
</style>
