<!--
  Diagram (new, for 2024 deck p. 11): Kerckhoffs's principle.
  The design of the lock (the algorithm) is public: everybody sees the blueprint, Eve too; only the key is secret.
  Then the opposite, "security by obscurity" (a secret design), crossed out.
  3 clicks: the public blueprint seen by everyone, the secret key, security by obscurity crossed out.
  On the slide it sits in a narrower column (about 80% width): text sizes are a little larger than usual.
  <SchemaKerckhoffs />
-->
<template>
  <svg viewBox="0 0 880 262" class="schema" role="img" aria-label="Schema: il progetto della serratura è pubblico, solo la chiave è segreta; la sicurezza tramite segretezza del progetto è da evitare">
    <g v-click>
      <text x="120" y="24" text-anchor="middle" class="titolo">il progetto (l'algoritmo)</text>
      <rect x="30" y="40" width="180" height="150" rx="3" class="foglio" />
      <path d="M50,40 v150 M70,40 v150 M90,40 v150 M110,40 v150 M130,40 v150 M150,40 v150 M170,40 v150 M190,40 v150 M30,60 h180 M30,80 h180 M30,100 h180 M30,120 h180 M30,140 h180 M30,160 h180 M30,180 h180" class="griglia" />
      <path d="M96,112 v-22 a24,24 0 0 1 48,0 v22" class="disegno" />
      <rect x="82" y="112" width="76" height="54" rx="4" class="disegno" />
      <circle cx="120" cy="134" r="6" class="disegno" />
      <path d="M120,140 v12" class="disegno" />
      <path d="M82,176 h76 M82,171 v10 M158,171 v10" class="quota" />
      <SvPersona :x="268" :y="36" :scala="0.62" />
      <SvPersona :x="268" :y="106" :scala="0.62" />
      <SvPersona :x="268" :y="176" :scala="0.62" variante="ko" />
      <text x="292" y="203" class="eve">Eve</text>
      <path d="M248,54 L216,78 M248,124 L216,116 M248,194 L216,164" class="sguardo" />
      <text x="160" y="240" text-anchor="middle" class="pubblico">pubblico: lo vedono tutti, anche Eve</text>
    </g>
    <g v-click>
      <text x="470" y="24" text-anchor="middle" class="titolo">la chiave</text>
      <SvLucchetto :x="432" :y="96" :scala="2.7" />
      <SvChiave :x="436" :y="190" tipo="segreta" :scala="1.4" />
      <text x="470" y="240" text-anchor="middle" class="segreta">solo la chiave è segreta</text>
    </g>
    <g v-click>
      <line x1="604" y1="10" x2="604" y2="250" class="divisore" />
      <text x="742" y="24" text-anchor="middle" class="titolo">il contrario: progetto segreto</text>
      <rect x="667" y="42" width="150" height="140" rx="4" class="nascosto" />
      <text x="742" y="136" text-anchor="middle" class="punto">?</text>
      <path d="M657,36 L827,188 M827,36 L657,188" class="croce" />
      <text x="742" y="212" text-anchor="middle" class="oscuro">«security by obscurity»</text>
      <text x="742" y="240" text-anchor="middle" class="trapela">prima o poi trapela</text>
    </g>
  </svg>
</template>

<style scoped>
.titolo {
  font-weight: 700;
  font-size: 18px;
}
.foglio {
  fill: var(--campo);
  stroke: var(--grigio);
  stroke-width: 1.5;
}
.griglia {
  stroke: var(--linea);
  stroke-width: 0.8;
}
.disegno {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 2;
}
.quota {
  stroke: var(--grigio);
  stroke-width: 1.2;
}
.sguardo {
  stroke: var(--grigio);
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
}
.eve {
  font-weight: 700;
  font-size: 17px;
  fill: var(--ko);
}
.pubblico {
  font-weight: 700;
  font-size: 18px;
  fill: var(--ok);
}
.segreta {
  font-weight: 700;
  font-size: 18px;
  fill: var(--rubrica);
}
.divisore {
  stroke: var(--linea);
  stroke-width: 1.5;
}
.nascosto {
  fill: var(--inchiostro);
}
.punto {
  font-family: var(--serif);
  font-weight: 700;
  font-size: 70px;
  fill: var(--carta);
}
.croce {
  stroke: var(--ko);
  stroke-width: 6;
  stroke-linecap: round;
}
.oscuro {
  font-size: 17px;
  font-style: italic;
}
.trapela {
  font-weight: 700;
  font-size: 18px;
  fill: var(--ko);
}
</style>
