<!--
  Diagram (2024 deck, p. 123, corrected per W3C DID Core v1.0): a DID (the specification's example
  did:example:123456789abcdefghi: scheme, method, method-specific identifier) is resolved into a DID document with
  id (the DID itself), verificationMethod (public keys), authentication (which keys authenticate the subject) and
  service (where to contact the subject). Creation and update dates are NOT in the document: they are resolution
  metadata returned by the resolver (the 2024 slide also listed "timestamp" and "signature" inside the document).
  5 clicks: the DID, its resolution and the document with id; verificationMethod; authentication; service;
  the metadata, outside the document.
  <SchemaDID />
-->
<script setup lang="ts">
const CW = 8.4 // advance of a 14 px monospace character
const X0 = 20 // start of the DID string
const parti = [
  { t: 'did', da: 0, a: 3, nota: 'schema' },
  { t: 'example', da: 4, a: 11, nota: 'metodo' },
  { t: '123456789abcdefghi', da: 12, a: 30, nota: 'identificativo' },
]
const RIGHE = [
  { nome: 'id', desc: 'il DID stesso' },
  { nome: 'verificationMethod', desc: 'chiavi pubbliche' },
  { nome: 'authentication', desc: 'con quali chiavi ci si autentica' },
  { nome: 'service', desc: 'dove contattare il soggetto' },
]
const RY = (i: number) => 50 + 44 * i
</script>

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: un DID si risolve in un documento DID con id, chiavi, metodi di autenticazione e servizi; le date sono metadati della risoluzione">
    <g v-click>
      <text x="146" y="80" text-anchor="middle" class="titoletto">identificatore decentralizzato</text>
      <rect x="6" y="92" width="280" height="44" rx="6" class="did" />
      <text :x="X0" y="119" class="mono t14">did:<tspan class="metodo">example</tspan>:123456789abcdefghi</text>
      <g v-for="p in parti" :key="p.t">
        <path :d="`M${X0 + p.da * CW + 1},144 v5 H${X0 + p.a * CW - 1} v-5`" class="graffa" />
        <text :x="X0 + (p.da + p.a) / 2 * CW" y="166" text-anchor="middle" class="nota">{{ p.nota }}</text>
      </g>
      <SvFreccia :x1="288" :y1="114" :x2="390" :y2="114" etichetta="risoluzione" variante="rubrica" />
      <rect x="392" y="10" width="478" height="216" rx="8" class="documento" />
      <text x="408" y="36" class="titoletto">documento DID</text>
      <rect x="402" :y="RY(0)" width="458" height="38" rx="4" class="riga" />
      <text x="416" :y="RY(0) + 24" class="mono t14 b">{{ RIGHE[0].nome }}</text>
      <text x="590" :y="RY(0) + 24" class="t15">{{ RIGHE[0].desc }}</text>
    </g>
    <g v-for="(r, i) in RIGHE.slice(1)" :key="r.nome" v-click>
      <rect x="402" :y="RY(i + 1)" width="458" height="38" rx="4" class="riga" />
      <text x="416" :y="RY(i + 1) + 24" class="mono t14 b">{{ r.nome }}</text>
      <text x="590" :y="RY(i + 1) + 24" class="t15">{{ r.desc }}</text>
    </g>
    <g v-click>
      <SvFreccia :x1="339" :y1="124" :x2="390" :y2="260" angolo="vh" variante="grigio" tratteggiata />
      <rect x="392" y="238" width="478" height="46" rx="8" class="metadati" />
      <text x="408" y="257" class="t15"><tspan class="b">metadati</tspan>: data di creazione e di aggiornamento</text>
      <text x="408" y="276" class="nota">restituiti da chi risolve il DID, fuori dal documento</text>
    </g>
  </svg>
</template>

<style scoped>
.did { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1.5; }
.metodo { fill: var(--rubrica); font-weight: 700; }
.graffa { fill: none; stroke: var(--grigio); stroke-width: 1.2; }
.documento { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.riga { fill: var(--campo); stroke: var(--linea); stroke-width: 1; }
.metadati { fill: none; stroke: var(--grigio); stroke-width: 1.5; stroke-dasharray: 6 5; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.b { font-weight: 700; }
</style>
