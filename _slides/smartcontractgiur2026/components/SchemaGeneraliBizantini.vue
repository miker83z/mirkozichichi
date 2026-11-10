<!--
  Diagram (new): the Byzantine generals problem. On the left, a city besieged by three generals (a
  commander and two generals) who can talk only through messengers: the commander sends the order, the
  two generals tell each other what they received. Then the commander is a traitor: "attacca" to
  general 1, "ritirata" to general 2; general 2, loyal, reports "mi ha detto: ritirata". General 1 hears
  both and cannot tell who is lying (the same picture as if general 2 were the traitor), so no rule can
  make the loyal generals agree. On the right: the rule n ≥ 3f + 1 (more than ⅔ loyal) and the
  correspondence with a blockchain (validators = generals).
  Sources: L. Lamport, R. Shostak, M. Pease, "The Byzantine Generals Problem", ACM TOPLAS 4(3), July 1982,
  pp. 382-401 (lamport.azurewebsites.net/pubs/byz.pdf): divisions "camped outside an enemy city", generals
  communicating "only by messenger", attack or retreat; Fig. 1-2 (three generals, one traitor: "no solution
  exists for three generals"); "with oral messages ... solvable if and only if more than two-thirds of the
  generals are loyal", "no solution with fewer than 3m + 1 generals can cope with m traitors", OM(m) works
  for 3m + 1 or more. With signed ("unforgeable written") messages the paper solves it for any number of
  traitors; real blockchains still need more than ⅔ honest because messages can be delayed (BFT
  protocols such as CometBFT commit with "more than 2/3" of the votes).
  5 clicks: the city and the generals; the messages; the traitor's contradictory messages and general 1's
  doubt; the rule n ≥ 3f + 1; the link to blockchains.
  <SchemaGeneraliBizantini />
-->
<template>
  <svg viewBox="0 0 880 278" class="schema" role="img" aria-label="Schema: i generali bizantini; con 3 generali e un traditore l'accordo è impossibile; regola n ≥ 3f + 1; nella blockchain i validatori sono i generali">
    <!-- 1. La città e i tre generali -->
    <g v-click>
      <g class="citta">
        <rect x="203" y="92" width="22" height="53" />
        <rect x="275" y="92" width="22" height="53" />
        <rect x="225" y="108" width="50" height="37" />
        <rect v-for="mx in [228, 241, 254, 266]" :key="mx" :x="mx" y="102" width="7" height="6" />
        <rect v-for="mx in [203, 211, 219, 275, 283, 291]" :key="mx" :x="mx" y="86" width="6" height="6" />
        <path d="M242,145 v-11 a8,8 0 0 1 16,0 v11 Z" class="porta" />
      </g>
      <text x="250" y="162" text-anchor="middle" class="nota">città nemica</text>
      <SvPersona :x="250" :y="0" nome="comandante" :scala="0.9" />
      <SvPersona :x="90" :y="160" nome="generale 1" :scala="0.9" />
      <SvPersona :x="410" :y="160" nome="generale 2" :scala="0.9" />
    </g>

    <!-- 2. I messaggi: l'ordine del comandante, poi i generali si riferiscono che cosa hanno ricevuto -->
    <g v-click>
      <SvFreccia :x1="218" :y1="30" :x2="110" :y2="156" variante="grigio" tratteggiata />
      <SvFreccia :x1="282" :y1="30" :x2="390" :y2="156" variante="grigio" tratteggiata />
      <text x="160" y="84" text-anchor="end" class="nota">ordine</text>
      <text x="340" y="84" class="nota">ordine</text>
      <SvFreccia :x1="382" :y1="196" :x2="118" :y2="196" variante="grigio" tratteggiata />
      <SvFreccia :x1="118" :y1="208" :x2="382" :y2="208" variante="grigio" tratteggiata />
      <text x="250" y="230" text-anchor="middle" class="nota">si riferiscono l'ordine ricevuto</text>
    </g>

    <!-- 3. Il traditore manda ordini contraddittori: il generale 1 non può sapere chi mente -->
    <g v-click>
      <SvPersona :x="250" :y="0" nome="comandante" :scala="0.9" variante="ko" />
      <text x="284" y="20" class="traditore">traditore</text>
      <text x="124" y="128" text-anchor="end" class="ordine">«attacca»</text>
      <text x="376" y="128" class="ordine">«ritirata»</text>
      <text x="250" y="188" text-anchor="middle" class="riferito">«mi ha detto: ritirata»</text>
      <text x="250" y="254" text-anchor="middle" class="dubbio">Il generale 1 sente «attacca» e «ritirata».</text>
      <text x="250" y="274" text-anchor="middle" class="dubbio">Chi mente? Non può saperlo.</text>
    </g>

    <!-- 4. La regola -->
    <g v-click>
      <rect x="545" y="4" width="330" height="164" rx="8" class="riquadro" />
      <text x="563" y="30" class="titoletto">La regola</text>
      <text x="859" y="30" text-anchor="end" class="nota">Lamport, Shostak, Pease (1982)</text>
      <text x="563" y="48" class="nota">con messaggi «orali» (non firmati)</text>
      <text x="710" y="90" text-anchor="middle" class="formula">n ≥ 3f + 1</text>
      <text x="710" y="114" text-anchor="middle" class="testo">n = generali · f = traditori</text>
      <text x="710" y="137" text-anchor="middle" class="forte">più di ⅔ devono essere leali</text>
      <text x="710" y="157" text-anchor="middle" class="nota">1 traditore: con 3 generali no, con 4 sì</text>
    </g>

    <!-- 5. Nella blockchain -->
    <g v-click>
      <rect x="545" y="178" width="330" height="98" rx="8" class="riquadro blockchain" />
      <text x="563" y="201" class="titoletto">Nelle blockchain a validatori</text>
      <text x="563" y="225" class="testo"><tspan class="forte">validatori</tspan> = generali</text>
      <text x="563" y="247" class="testo"><tspan class="forte">blocchi e voti</tspan> = messaggi</text>
      <text x="563" y="269" class="testo"><tspan class="forte">nodi guasti o disonesti</tspan> = traditori</text>
    </g>
  </svg>
</template>

<style scoped>
.citta rect, .citta .porta { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.4; }
.citta .porta { fill: var(--inchiostro); }
.traditore { font-size: 15px; font-weight: 700; fill: var(--ko); }
.ordine { font-size: 16px; font-weight: 700; fill: var(--ko); }
.riferito { font-size: 15px; font-weight: 600; }
.dubbio { font-size: 15px; fill: var(--rubrica); font-weight: 600; }
.riquadro { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.riquadro.blockchain { stroke: var(--rubrica); }
.formula { font-size: 34px; font-weight: 700; fill: var(--rubrica); }
.testo { font-size: 15px; }
.forte { font-size: 15px; font-weight: 700; }
</style>
