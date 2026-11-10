<!--
  Diagram (new, for 2024 p. 98, corrected: the modes are three, not two): the three ways XAdES
  (XML-DSig) links signature and data, side by side.
  interna (enveloped): the signature sits inside the signed XML document;
  avvolgente (enveloping): the signature contains the data;
  distaccata (detached): two separate files, the signature points to the data (dashed arrow).
  3 clicks: one mode per click.
  <SchemaXades />
-->
<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: firma XAdES interna, avvolgente e distaccata">
    <!-- 1. Interna (enveloped) -->
    <g v-click>
      <text x="150" y="20" text-anchor="middle" class="titolo">interna</text>
      <text x="150" y="38" text-anchor="middle" class="nota">(enveloped)</text>
      <path d="M50,52 h184 l16,16 v190 h-200 Z" class="file" />
      <path d="M234,52 v16 h16" class="file" />
      <text x="66" y="78" class="tag">&lt;contratto&gt;</text>
      <line x1="82" y1="96" x2="218" y2="96" class="testo-finto" />
      <line x1="82" y1="112" x2="206" y2="112" class="testo-finto" />
      <line x1="82" y1="128" x2="214" y2="128" class="testo-finto" />
      <rect x="78" y="146" width="148" height="72" rx="5" class="firma" />
      <text x="152" y="174" text-anchor="middle" class="tag rossa">&lt;Signature&gt;</text>
      <text x="152" y="198" text-anchor="middle" class="nota">firma</text>
      <text x="66" y="244" class="tag">&lt;/contratto&gt;</text>
    </g>
    <!-- 2. Avvolgente (enveloping) -->
    <g v-click>
      <text x="440" y="20" text-anchor="middle" class="titolo">avvolgente</text>
      <text x="440" y="38" text-anchor="middle" class="nota">(enveloping)</text>
      <rect x="340" y="52" width="200" height="206" rx="6" class="firma" />
      <text x="356" y="78" class="tag rossa">&lt;Signature&gt;</text>
      <path d="M372,96 h120 l14,14 v92 h-134 Z" class="file" />
      <path d="M492,96 v14 h14" class="file" />
      <text x="386" y="122" class="tag">&lt;dati&gt;</text>
      <line x1="390" y1="142" x2="486" y2="142" class="testo-finto" />
      <line x1="390" y1="158" x2="476" y2="158" class="testo-finto" />
      <line x1="390" y1="174" x2="482" y2="174" class="testo-finto" />
      <text x="440" y="226" text-anchor="middle" class="nota">firma</text>
      <text x="356" y="248" class="tag rossa">&lt;/Signature&gt;</text>
    </g>
    <!-- 3. Distaccata (detached) -->
    <g v-click>
      <text x="730" y="20" text-anchor="middle" class="titolo">distaccata</text>
      <text x="730" y="38" text-anchor="middle" class="nota">(detached)</text>
      <path d="M604,84 h72 l14,14 v100 h-86 Z" class="file" />
      <path d="M676,84 v14 h14" class="file" />
      <line x1="618" y1="118" x2="676" y2="118" class="testo-finto" />
      <line x1="618" y1="134" x2="668" y2="134" class="testo-finto" />
      <line x1="618" y1="150" x2="674" y2="150" class="testo-finto" />
      <text x="647" y="220" text-anchor="middle" class="nome-file">contratto.pdf</text>
      <path d="M764,84 h84 l14,14 v100 h-98 Z" class="file rossa" />
      <path d="M848,84 v14 h14" class="file rossa" />
      <text x="813" y="140" text-anchor="middle" class="tag rossa piccolo">&lt;Signature&gt;</text>
      <text x="813" y="220" text-anchor="middle" class="nome-file">firma.xml</text>
      <SvFreccia :x1="760" :y1="160" :x2="694" :y2="160" variante="rubrica" tratteggiata />
      <text x="733" y="250" text-anchor="middle" class="nota">due file separati</text>
    </g>
  </svg>
</template>

<style scoped>
.titolo { font-size: 17px; font-weight: 700; }
.file { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.file.rossa { stroke: var(--rubrica); fill: #fbeeee; }
.firma { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1.8; }
.tag { font-family: var(--mono); font-size: 14px; }
.tag.rossa { fill: var(--rubrica); font-weight: 700; }
.tag.piccolo { font-size: 13px; }
.testo-finto { stroke: var(--linea); stroke-width: 3; }
.nome-file { font-family: var(--mono); font-size: 13px; }
</style>
