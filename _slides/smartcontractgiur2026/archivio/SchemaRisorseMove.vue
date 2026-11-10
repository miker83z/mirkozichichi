<!--
  Diagram (new): Move's resources, in four panels. In Move every type declares its abilities: copy (can be
  duplicated), drop (can be thrown away), key (can be an object in storage), store (can be stored inside
  other values). (1) A number has copy and drop: it can be copied and forgotten. (2) A coin is declared
  without copy and drop (IOTA framework: `public struct Coin<phantom T> has key, store`): it can only be
  moved, like a banknote handed over; the giver no longer has it. (3) Trying to copy it (`copy c`) is
  rejected by the compiler. (4) Trying to lose it (`let _ = c;`, ignoring the value) is rejected too: a
  coin cannot disappear by mistake. Picture: a banknote that can be handed over but not photocopied nor
  shredded.
  Sources: The Move Book, move-book.com/move-basics/abilities-introduction: copy "the value can be
  duplicated", drop "the value can be discarded", key "a unit of storage", store "stored inside other
  values in storage"; the compiler "rejects any operation the type is not permitted to perform".
  move-book.com/move-basics/drop-ability: a value without drop "must be used - stored somewhere, passed on,
  or unpacked"; "A coin, a ticket, a receipt" as values that must never silently vanish. Move reference,
  move-book.com/reference/abilities: "let c_account2 = copy c_account; // Invalid ... does not have
  'copy'", "Cannot ignore ... because it does not have 'drop'". IOTA framework sources/coin.move (Coin
  has key, store); transfer::public_transfer(obj, recipient) for key + store objects.
  4 clicks: a number copied; a coin moved; the copy rejected; the loss rejected.
  <SchemaRisorseMove />
-->
<script setup lang="ts">
const C = [0, 222, 444, 666] // left edge of each panel
const W = 214
</script>

<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: in Move un numero si copia e si butta, una moneta si può solo spostare; il compilatore rifiuta la copia e la perdita di una moneta">
    <!-- 1. Un numero: si copia e si butta -->
    <g v-click>
      <rect :x="C[0] + 4" y="4" :width="W - 8" height="262" rx="8" class="pannello" />
      <text :x="C[0] + W / 2" y="28" text-anchor="middle" class="titolo">Un numero</text>
      <text :x="C[0] + W / 2" y="47" text-anchor="middle" class="mono codice">has copy, drop</text>
      <SvRiquadro :x="C[0] + 22" :y="78" :w="56" :h="36" testo="42" variante="vuoto" mono />
      <SvFreccia :x1="C[0] + 80" :y1="96" :x2="C[0] + 124" :y2="96" etichetta="copia" />
      <SvRiquadro :x="C[0] + 130" :y="62" :w="56" :h="32" testo="42" variante="vuoto" mono />
      <SvRiquadro :x="C[0] + 130" :y="100" :w="56" :h="32" testo="42" variante="vuoto" mono />
      <text :x="C[0] + W / 2" y="168" text-anchor="middle" class="esito ok">✓ si può copiare</text>
      <text :x="C[0] + W / 2" y="190" text-anchor="middle" class="esito ok">✓ e buttare via</text>
      <text :x="C[0] + W / 2" y="230" text-anchor="middle" class="mono codice">let b = a;</text>
      <text :x="C[0] + W / 2" y="249" text-anchor="middle" class="nota">a e b valgono 42</text>
    </g>

    <!-- 2. Una moneta: si può solo spostare -->
    <g v-click>
      <rect :x="C[1] + 4" y="4" :width="W - 8" height="262" rx="8" class="pannello" />
      <text :x="C[1] + W / 2" y="28" text-anchor="middle" class="titolo">Una moneta</text>
      <text :x="C[1] + W / 2" y="47" text-anchor="middle" class="mono codice">has key, store</text>
      <rect :x="C[1] + 14" y="78" width="64" height="36" rx="4" class="vuota" />
      <SvFreccia :x1="C[1] + 82" :y1="96" :x2="C[1] + 132" :y2="96" etichetta="passa" variante="rubrica" />
      <g :transform="`translate(${C[1] + 136},78)`">
        <rect width="64" height="36" rx="4" class="banconota" />
        <rect x="4" y="4" width="56" height="28" rx="2" class="filetto" />
        <text x="32" y="23" text-anchor="middle" class="sigla">Coin</text>
      </g>
      <text :x="C[1] + 46" y="134" text-anchor="middle" class="nota">Alice</text>
      <text :x="C[1] + 168" y="134" text-anchor="middle" class="nota">Bob</text>
      <text :x="C[1] + W / 2" y="168" text-anchor="middle" class="esito">si può solo spostare:</text>
      <text :x="C[1] + W / 2" y="190" text-anchor="middle" class="esito">chi la dà non l'ha più</text>
      <text :x="C[1] + W / 2" y="230" text-anchor="middle" class="mono codice">public_transfer(c, bob)</text>
      <text :x="C[1] + W / 2" y="249" text-anchor="middle" class="nota">niente copy, niente drop</text>
    </g>

    <!-- 3. Copiarla? Il compilatore rifiuta -->
    <g v-click>
      <rect :x="C[2] + 4" y="4" :width="W - 8" height="262" rx="8" class="pannello" />
      <text :x="C[2] + W / 2" y="28" text-anchor="middle" class="titolo">Copiarla?</text>
      <text :x="C[2] + W / 2" y="47" text-anchor="middle" class="nota">Coin non ha copy</text>
      <g :transform="`translate(${C[2] + 14},78)`">
        <rect width="64" height="36" rx="4" class="banconota" />
        <rect x="4" y="4" width="56" height="28" rx="2" class="filetto" />
        <text x="32" y="23" text-anchor="middle" class="sigla">Coin</text>
      </g>
      <SvFreccia :x1="C[2] + 82" :y1="96" :x2="C[2] + 132" :y2="96" etichetta="copia" variante="ko" />
      <rect :x="C[2] + 136" y="78" width="64" height="36" rx="4" class="fantasma" />
      <text :x="C[2] + 168" y="109" text-anchor="middle" class="croce">✗</text>
      <text :x="C[2] + W / 2" y="168" text-anchor="middle" class="esito ko">✗ il compilatore</text>
      <text :x="C[2] + W / 2" y="190" text-anchor="middle" class="esito ko">rifiuta la copia</text>
      <text :x="C[2] + W / 2" y="230" text-anchor="middle" class="mono codice">let d = copy c;</text>
      <text :x="C[2] + W / 2" y="249" text-anchor="middle" class="nota">errore di compilazione</text>
    </g>

    <!-- 4. Perderla? Il compilatore rifiuta -->
    <g v-click>
      <rect :x="C[3] + 4" y="4" :width="W - 8" height="262" rx="8" class="pannello" />
      <text :x="C[3] + W / 2" y="28" text-anchor="middle" class="titolo">Perderla?</text>
      <text :x="C[3] + W / 2" y="47" text-anchor="middle" class="nota">Coin non ha drop</text>
      <g :transform="`translate(${C[3] + 14},78)`">
        <rect width="64" height="36" rx="4" class="banconota" />
        <rect x="4" y="4" width="56" height="28" rx="2" class="filetto" />
        <text x="32" y="23" text-anchor="middle" class="sigla">Coin</text>
      </g>
      <SvFreccia :x1="C[3] + 82" :y1="96" :x2="C[3] + 132" :y2="96" etichetta="butta" variante="ko" />
      <g :transform="`translate(${C[3] + 140},70)`" class="cestino">
        <rect x="16" y="0" width="12" height="6" rx="1" />
        <line x1="0" y1="8" x2="44" y2="8" />
        <path d="M4,12 L8,48 L36,48 L40,12 Z" />
        <line x1="15" y1="18" x2="16" y2="42" />
        <line x1="22" y1="18" x2="22" y2="42" />
        <line x1="29" y1="18" x2="28" y2="42" />
      </g>
      <text :x="C[3] + 162" y="112" text-anchor="middle" class="croce">✗</text>
      <text :x="C[3] + W / 2" y="168" text-anchor="middle" class="esito ko">✗ il compilatore non</text>
      <text :x="C[3] + W / 2" y="190" text-anchor="middle" class="esito ko">la lascia sparire</text>
      <text :x="C[3] + W / 2" y="230" text-anchor="middle" class="mono codice">let _ = c;</text>
      <text :x="C[3] + W / 2" y="249" text-anchor="middle" class="nota">errore di compilazione</text>
    </g>
  </svg>
</template>

<style scoped>
.pannello { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.titolo { font-size: 16px; font-weight: 700; }
.codice { font-size: 13px; }
.esito { font-size: 15px; font-weight: 700; }
.schema .ok { fill: var(--ok); }
.schema .ko { fill: var(--ko); }
.banconota { fill: color-mix(in srgb, var(--glossa) 24%, var(--carta)); stroke: var(--glossa); stroke-width: 1.5; }
.filetto { fill: none; stroke: var(--glossa); stroke-width: 0.8; }
.sigla { font-size: 13px; font-weight: 700; fill: var(--glossa); }
.vuota { fill: none; stroke: var(--grigio); stroke-width: 1.4; stroke-dasharray: 5 4; }
.fantasma { fill: color-mix(in srgb, var(--ko) 12%, var(--carta)); stroke: var(--ko); stroke-width: 1.5; stroke-dasharray: 5 4; }
.croce { font-size: 34px; font-weight: 700; fill: var(--ko); }
.cestino rect, .cestino path { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.cestino line { stroke: var(--inchiostro); stroke-width: 1.5; }
</style>
