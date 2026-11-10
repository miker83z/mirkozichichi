<!--
  Diagram (2024 deck, p. 104, originally a screenshot of a Google sign-in prompt): two-step
  verification. The login page asks for the password (something you know); then it shows a number and
  the phone asks "Sei tu?" with three numbers to choose from (something you have); tapping the right
  one (90) grants access. Two factors of different categories.
  4 clicks: the password page; the number on the page and the prompt on the phone; the tap and access
  granted; "due fattori di categorie diverse".
  <SchemaDuePassaggi />
-->
<template>
  <svg viewBox="0 0 880 286" class="schema" role="img" aria-label="Schema: verifica in due passaggi con password e conferma sul telefono">
    <!-- 1. La pagina di accesso chiede la password -->
    <g v-click>
      <rect x="10" y="4" width="350" height="246" rx="8" class="finestra" />
      <path d="M10,12 a8,8 0 0 1 8,-8 h334 a8,8 0 0 1 8,8 v22 h-350 Z" class="barra" />
      <circle cx="26" cy="19" r="4" class="pallino" />
      <circle cx="40" cy="19" r="4" class="pallino" />
      <circle cx="54" cy="19" r="4" class="pallino" />
      <rect x="72" y="10" width="270" height="18" rx="9" class="indirizzo" />
      <text x="84" y="24" class="url">accedi.esempio.it</text>
      <text x="185" y="62" text-anchor="middle" class="accedi">Accedi</text>
      <rect x="60" y="76" width="250" height="30" rx="4" class="campo" />
      <text x="70" y="96" class="campo-testo">alice@esempio.it</text>
      <rect x="60" y="114" width="250" height="30" rx="4" class="campo" />
      <text x="70" y="135" class="campo-testo">••••••••••</text>
      <text x="304" y="134" text-anchor="end" class="nota">password</text>
      <rect x="230" y="152" width="80" height="28" rx="4" class="bottone" />
      <text x="270" y="171" text-anchor="middle" class="bottone-testo">Avanti</text>
      <text x="185" y="276" text-anchor="middle" class="fattore">1 · qualcosa che sai</text>
    </g>
    <!-- 2. La pagina mostra un numero, il telefono chiede conferma -->
    <g v-click>
      <line x1="40" y1="192" x2="330" y2="192" class="separatore" />
      <text x="140" y="228" text-anchor="middle" class="istruzione">sul telefono tocca</text>
      <text x="268" y="234" text-anchor="middle" class="numero-grande">90</text>
      <rect x="420" y="6" width="140" height="240" rx="16" class="telefono" />
      <rect x="430" y="24" width="120" height="196" rx="4" class="schermo" />
      <circle cx="490" cy="233" r="6" class="tasto" />
      <text x="490" y="54" text-anchor="middle" class="tel-titolo">Stai accedendo?</text>
      <text x="490" y="80" text-anchor="middle" class="tel-titolo">Sei tu?</text>
      <text x="490" y="112" text-anchor="middle" class="tel-nota">tocca il numero</text>
      <text x="490" y="127" text-anchor="middle" class="tel-nota">della pagina</text>
      <circle cx="455" cy="166" r="15" class="scelta" />
      <text x="455" y="171" text-anchor="middle" class="scelta-testo">17</text>
      <circle cx="490" cy="166" r="15" class="scelta" />
      <text x="490" y="171" text-anchor="middle" class="scelta-testo">90</text>
      <circle cx="525" cy="166" r="15" class="scelta" />
      <text x="525" y="171" text-anchor="middle" class="scelta-testo">42</text>
      <text x="490" y="276" text-anchor="middle" class="fattore">2 · qualcosa che hai</text>
    </g>
    <!-- 3. Alice tocca 90: accesso consentito -->
    <g v-click>
      <circle cx="490" cy="166" r="15" class="scelta-ok" />
      <text x="490" y="171" text-anchor="middle" class="scelta-testo bianco">90</text>
      <circle cx="490" cy="166" r="21" class="tocco" />
      <SvFreccia :x1="568" :y1="120" :x2="630" :y2="120" variante="ok" />
      <SvLucchetto :x="660" :y="104" :scala="1.2" aperto />
      <text x="712" y="118" class="esito">✓ accesso</text>
      <text x="712" y="138" class="esito">consentito</text>
    </g>
    <!-- 4. Due fattori di categorie diverse -->
    <g v-click>
      <text x="750" y="208" text-anchor="middle" class="conclusione">due fattori</text>
      <text x="750" y="230" text-anchor="middle" class="conclusione">di categorie diverse</text>
      <text x="750" y="252" text-anchor="middle" class="nota">la sola password rubata non basta</text>
    </g>
  </svg>
</template>

<style scoped>
.finestra { fill: var(--carta); stroke: var(--grigio); stroke-width: 1.5; }
.barra { fill: var(--campo); stroke: var(--grigio); stroke-width: 1.5; }
.pallino { fill: var(--linea); }
.indirizzo { fill: var(--carta); stroke: var(--linea); stroke-width: 1; }
.url { font-size: 13px; fill: var(--grigio); }
.accedi { font-size: 20px; font-weight: 700; }
.campo { fill: var(--carta); stroke: var(--linea); stroke-width: 1.5; }
.campo-testo { font-size: 15px; }
.bottone { fill: var(--rubrica); }
.bottone-testo { font-size: 15px; font-weight: 700; fill: var(--carta); }
.separatore { stroke: var(--linea); stroke-width: 1.5; }
.istruzione { font-size: 16px; }
.numero-grande { font-size: 32px; font-weight: 700; }
.telefono { fill: var(--inchiostro); }
.schermo { fill: var(--carta); }
.tasto { fill: none; stroke: var(--grigio); stroke-width: 1.5; }
.tel-titolo { font-size: 15px; font-weight: 700; }
.tel-nota { font-size: 13px; fill: var(--grigio); }
.scelta { fill: var(--carta); stroke: var(--grigio); stroke-width: 1.5; }
.scelta-ok { fill: var(--ok); stroke: var(--ok); stroke-width: 1.5; }
.scelta-testo { font-size: 14px; font-weight: 700; }
.bianco { fill: var(--carta); }
.tocco { fill: none; stroke: var(--ok); stroke-width: 2; stroke-dasharray: 3 3; }
.fattore { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
.esito { font-size: 18px; font-weight: 700; fill: var(--ok); }
.conclusione { font-size: 18px; font-weight: 700; fill: var(--rubrica); }
</style>
