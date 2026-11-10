<!--
  Diagram (2024 deck, p. 67, a terminal screenshot): `echo "…" | sha256sum` for ciao, miao, ciao mare, ciao care.
  The digests are real, computed with utils/crypto.ts on the text plus "\n", because echo adds a newline (they
  match the original screenshot). Last step: the same "ciao" without newline (printf) gives another impronta.
  5 clicks: one command per click; then printf "ciao" and the note on the newline.
  <SchemaTerminale />
-->
<script setup lang="ts">
import { sha256 } from '../utils/crypto'

const comandi = ['ciao', 'miao', 'ciao mare', 'ciao care'].map((t, i) => ({
  cmd: `echo "${t}" | sha256sum`, out: sha256(`${t}\n`), y: 50 + i * 42,
}))
const [c1, c2, c3, c4] = comandi
const senzaACapo = { cmd: 'printf "ciao" | sha256sum', out: sha256('ciao'), y: 218 }
</script>

<template>
  <svg viewBox="0 0 880 285" class="schema" role="img" aria-label="Schema: terminale con le impronte SHA-256 di ciao, miao, ciao mare e ciao care">
    <rect x="20" y="4" width="840" height="248" rx="8" class="finestra" />
    <path d="M20,30 V12 a8,8 0 0 1 8,-8 H852 a8,8 0 0 1 8,8 V30 Z" class="barra" />
    <circle cx="38" cy="17" r="5" class="bottone" />
    <circle cx="56" cy="17" r="5" class="bottone" />
    <circle cx="74" cy="17" r="5" class="bottone" />
    <text x="440" y="22" text-anchor="middle" class="tx-13 titolo">Terminale</text>
    <g v-click>
      <text x="36" :y="c1.y" class="mono tx-14"><tspan class="prompt">$ </tspan><tspan class="comando">{{ c1.cmd }}</tspan></text>
      <text x="36" :y="c1.y + 20" class="mono tx-14 uscita">{{ c1.out }}  -</text>
    </g>
    <g v-click>
      <text x="36" :y="c2.y" class="mono tx-14"><tspan class="prompt">$ </tspan><tspan class="comando">{{ c2.cmd }}</tspan></text>
      <text x="36" :y="c2.y + 20" class="mono tx-14 uscita">{{ c2.out }}  -</text>
    </g>
    <g v-click>
      <text x="36" :y="c3.y" class="mono tx-14"><tspan class="prompt">$ </tspan><tspan class="comando">{{ c3.cmd }}</tspan></text>
      <text x="36" :y="c3.y + 20" class="mono tx-14 uscita">{{ c3.out }}  -</text>
    </g>
    <g v-click>
      <text x="36" :y="c4.y" class="mono tx-14"><tspan class="prompt">$ </tspan><tspan class="comando">{{ c4.cmd }}</tspan></text>
      <text x="36" :y="c4.y + 20" class="mono tx-14 uscita">{{ c4.out }}  -</text>
    </g>
    <g v-click>
      <text x="36" :y="senzaACapo.y" class="mono tx-14"><tspan class="prompt">$ </tspan><tspan class="comando">{{ senzaACapo.cmd }}</tspan></text>
      <text x="36" :y="senzaACapo.y + 20" class="mono tx-14 uscita-diversa">{{ senzaACapo.out }}  -</text>
      <text x="440" y="276" text-anchor="middle" class="tx-15">echo aggiunge un a capo: per questo l'impronta è diversa da quella di «ciao» senza a capo</text>
    </g>
  </svg>
</template>

<style scoped>
.finestra { fill: #24222b; }
.barra { fill: #3a3843; }
.bottone { fill: #6b6875; }
.titolo { fill: #d8d6dd; }
.prompt { fill: #8fd19e; font-weight: 700; }
.comando { fill: #ffffff; }
.uscita { fill: #d8d6dd; }
.uscita-diversa { fill: #f4b88f; }
.tx-13 { font-size: 13px; }
.tx-14 { font-size: 14px; }
.tx-15 { font-size: 15px; }
</style>
