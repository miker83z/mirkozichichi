<!--
  Diagram (new, for 2024 deck p. 17): how phishing works.
  Eve sends a fake e-mail ("La tua banca: verifica l'account"), Alice clicks the link and lands on a fake
  site identical to the real one, types user name and password, the credentials go to Eve, and Eve logs into
  the real bank as Alice.
  5 clicks: the fake e-mail, Alice clicks, the fake site, the credentials go to Eve, Eve enters the real bank.
  <SchemaPhishing />
-->
<template>
  <svg viewBox="0 0 880 284" class="schema" role="img" aria-label="Schema del phishing: e-mail falsa, clic, sito falso, credenziali all'attaccante, accesso alla banca vera">
    <g v-click>
      <SvPersona :x="55" :y="36" nome="Eve" variante="ko" />
      <SvFreccia :x1="84" :y1="64" :x2="132" :y2="64" etichetta="invia" variante="ko" />
      <rect x="136" y="18" width="200" height="106" rx="6" class="falso" />
      <rect x="148" y="30" width="24" height="17" class="tratto" />
      <path d="M148,30 l12,9 l12,-9" class="tratto" />
      <text x="180" y="44" class="intestazione">La tua banca</text>
      <text x="148" y="70" class="testo">verifica l'account</text>
      <text x="148" y="91" class="urgenza">entro 24 ore!</text>
      <text x="148" y="114" class="link">clicca qui</text>
      <text x="236" y="144" text-anchor="middle" class="etichetta-ko">e-mail falsa</text>
    </g>
    <g v-click>
      <SvFreccia :x1="340" :y1="64" :x2="388" :y2="64" />
      <SvPersona :x="418" :y="36" nome="Alice" />
      <SvFreccia :x1="448" :y1="64" :x2="496" :y2="64" etichetta="clicca" />
    </g>
    <g v-click>
      <rect x="500" y="14" width="210" height="156" rx="6" class="falso" />
      <line x1="500" y1="40" x2="710" y2="40" class="bordo" />
      <circle cx="512" cy="27" r="3.5" class="pallino" />
      <circle cx="524" cy="27" r="3.5" class="pallino" />
      <circle cx="536" cy="27" r="3.5" class="pallino" />
      <text x="548" y="32" class="indirizzo">banca-verifica.xyz</text>
      <text x="605" y="62" text-anchor="middle" class="intestazione">La tua banca</text>
      <rect x="530" y="72" width="150" height="24" rx="3" class="campo" />
      <text x="538" y="89" class="segnaposto">utente</text>
      <rect x="530" y="102" width="150" height="24" rx="3" class="campo" />
      <text x="538" y="119" class="segnaposto">password</text>
      <rect x="570" y="134" width="70" height="24" rx="4" class="bottone" />
      <text x="605" y="151" text-anchor="middle" class="testo-bottone">Accedi</text>
      <text x="722" y="84" class="etichetta-ko">sito falso,</text>
      <text x="722" y="104" class="etichetta-ko">identico al vero</text>
    </g>
    <g v-click>
      <path d="M605,170 V206 H72" class="rubato" />
      <SvFreccia :x1="72" :y1="206" :x2="72" :y2="116" variante="ko" />
      <text x="330" y="198" text-anchor="middle" class="etichetta-ko">utente e password</text>
    </g>
    <g v-click>
      <SvFreccia :x1="42" :y1="116" :x2="742" :y2="250" angolo="vh" variante="ko" />
      <text x="400" y="242" text-anchor="middle" class="accesso">entra nel conto al posto di Alice</text>
      <path d="M746,206 L803,180 L860,206 Z" class="banca" />
      <rect x="750" y="206" width="106" height="8" class="banca" />
      <rect x="758" y="216" width="12" height="28" class="banca" />
      <rect x="781" y="216" width="12" height="28" class="banca" />
      <rect x="813" y="216" width="12" height="28" class="banca" />
      <rect x="836" y="216" width="12" height="28" class="banca" />
      <rect x="746" y="244" width="114" height="10" class="banca" />
      <text x="803" y="274" text-anchor="middle" class="etichetta-ok">banca vera</text>
    </g>
  </svg>
</template>

<style scoped>
.falso {
  fill: var(--carta);
  stroke: var(--ko);
  stroke-width: 2;
}
.tratto {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 1.5;
}
.intestazione {
  font-weight: 700;
  font-size: 15px;
}
.testo {
  font-size: 15px;
}
.urgenza {
  font-size: 14px;
  font-weight: 700;
  fill: var(--ko);
}
.link {
  font-size: 15px;
  fill: var(--rubrica);
  text-decoration: underline;
}
.etichetta-ko {
  font-weight: 700;
  font-size: 15px;
  fill: var(--ko);
}
.etichetta-ok {
  font-weight: 700;
  font-size: 15px;
  fill: var(--ok);
}
.bordo {
  stroke: var(--linea);
  stroke-width: 1.5;
}
.pallino {
  fill: var(--linea);
}
.indirizzo {
  font-family: var(--mono);
  font-size: 13px;
  fill: var(--ko);
}
.campo {
  fill: var(--carta);
  stroke: var(--grigio);
  stroke-width: 1;
}
.segnaposto {
  font-size: 13px;
  fill: var(--grigio);
}
.bottone {
  fill: var(--rubrica);
}
.testo-bottone {
  font-weight: 700;
  font-size: 14px;
  fill: var(--carta);
}
.rubato {
  fill: none;
  stroke: var(--ko);
  stroke-width: 2;
}
.accesso {
  font-size: 15px;
  fill: var(--ko);
}
.banca {
  fill: var(--campo);
  stroke: var(--ok);
  stroke-width: 1.8;
}
</style>
