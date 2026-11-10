<!--
  Diagram (new): the Ali Baba cave, the classic picture of a zero-knowledge proof. A ring-shaped cave: from
  the entrance two passages, A and B, meet at the back at a magic door that opens only with the secret
  word. Peggy (who claims to know the word) goes into a passage while Victor waits outside and cannot see
  which one; Victor then shouts at random from which side she must come out; with the word she can always
  obey (here she is in B, is asked A, and goes through the door). A cheater succeeds only if she happened to
  choose the right side: 1 time in 2. Repeating: 10 rounds 1 in 1,024, 20 rounds 1 in 1,048,576 (2^20,
  about one in a million). Victor is convinced but learns nothing about the word.
  Sources: J.-J. Quisquater, L. Guillou, T. Berson, "How to Explain Zero-Knowledge Protocols to Your
  Children", CRYPTO '89, LNCS 435, Springer 1990, pp. 628-631: the cave with two passages joined by a
  wall that opens with magic words; the reporter flips a coin and tells Mick Ali on which side to come
  out; "Each new test divided by two the chances of success for someone without the secret" (40 rounds in
  the story). The names Peggy (prover) and Victor (verifier), the ring shape and the paths A and B follow
  the usual retelling (en.wikipedia.org/wiki/Zero-knowledge_proof, "The Ali Baba cave": "1 in 2^20, or
  roughly one in a million").
  5 clicks: the cave; Peggy enters (Victor waits outside); Victor's random challenge; she exits on the
  requested side through the door; the repetition with the probabilities.
  <SchemaZkCaverna />
-->
<script setup lang="ts">
const CX = 190, CY = 125, R = 100, r = 52
const p = (raggio: number, gradi: number) => {
  const a = (gradi * Math.PI) / 180
  return `${(CX + raggio * Math.cos(a)).toFixed(1)},${(CY + raggio * Math.sin(a)).toFixed(1)}`
}
// The outer wall meets the entrance tunnel (x 172-208) at y ≈ 223.4.
const yBocca = CY + Math.sqrt(R * R - 18 * 18)
const grotta = `M208,${yBocca} A${R},${R} 0 1 0 172,${yBocca} L172,250 L208,250 Z`
const pareti = `M208,250 L208,${yBocca} A${R},${R} 0 1 0 172,${yBocca} L172,250`
// Peggy's way in (radius 72, entering at x = 182) and her way out through the door (radius 84).
const ingresso = `M182,264 L182,${(CY + Math.sqrt(72 * 72 - 64)).toFixed(1)} A72,72 0 0 0 ${p(72, 0)}`
const uscitaFine = { x: CX + 84 * Math.cos((83.9 * Math.PI) / 180), y: CY + 84 * Math.sin((83.9 * Math.PI) / 180) }
const uscita = `M${p(84, -35)} A84,84 0 1 0 ${uscitaFine.x.toFixed(1)},${uscitaFine.y.toFixed(1)}`
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: la caverna di Ali Babà; Peggy dimostra a Victor di conoscere la parola segreta senza rivelarla; dopo 20 prove chi bluffa passa circa una volta su un milione">
    <!-- 1. La caverna -->
    <g v-click>
      <path :d="grotta" class="corridoio" />
      <path :d="pareti" class="parete" />
      <circle :cx="CX" :cy="CY" :r="r" class="roccia" />
      <rect x="185" y="25" width="10" height="48" class="porta" />
      <text x="190" y="14" text-anchor="middle" class="porta-testo">porta magica</text>
      <text x="124" y="170" text-anchor="middle" class="lato">A</text>
      <text x="256" y="170" text-anchor="middle" class="lato">B</text>
      <text x="166" y="262" text-anchor="end" class="nota">ingresso</text>
      <text x="500" y="24" class="titoletto">La caverna di Ali Babà</text>
      <text x="500" y="42" class="nota">Quisquater e altri (1989)</text>
      <text x="500" y="66" class="testo">un anello con due corridoi, A e B,</text>
      <text x="500" y="84" class="testo">uniti in fondo da una porta magica</text>
    </g>

    <!-- 2. Peggy entra in un corridoio; Victor aspetta fuori -->
    <g v-click>
      <path :d="ingresso" class="traccia" />
      <SvPersona :x="259" :y="80" :scala="0.5" variante="rubrica" />
      <text x="305" y="92" class="nome">Peggy</text>
      <text x="305" y="109" class="nota">conosce la parola segreta</text>
      <SvPersona :x="240" :y="222" :scala="0.6" />
      <text x="262" y="236" class="nome">Victor</text>
      <text x="262" y="252" class="nota">aspetta fuori, non vede</text>
    </g>

    <!-- 3. La sfida di Victor, a caso -->
    <g v-click>
      <text x="262" y="273" class="sfida">«Esci da A!» <tspan class="nota">(a caso)</tspan></text>
    </g>

    <!-- 4. Peggy esce dal lato chiesto, passando per la porta -->
    <g v-click>
      <rect x="185" y="25" width="10" height="48" class="porta aperta" />
      <path :d="uscita" class="via" />
      <SvFreccia :x1="uscitaFine.x" :y1="uscitaFine.y" :x2="uscitaFine.x" :y2="272" variante="ok" />
      <text x="242" y="14" class="nota verde">si apre con la parola</text>
      <text x="500" y="116" class="testo">Con la parola esce sempre dal lato chiesto.</text>
      <text x="500" y="134" class="testo">Chi bluffa ci riesce solo se era già lì:</text>
      <text x="500" y="152" class="testo forte">1 volta su 2.</text>
    </g>

    <!-- 5. Si ripete: la probabilità di bluffare crolla -->
    <g v-click>
      <text x="500" y="184" class="testo forte">Si ripete. Chi bluffa le supera tutte:</text>
      <text x="510" y="206" class="testo">1 prova: 1 su 2</text>
      <text x="510" y="226" class="testo">10 prove: 1 su 1.024</text>
      <text x="510" y="246" class="testo">20 prove: 1 su 1.048.576 <tspan class="nota">(≈ un milione)</tspan></text>
      <text x="500" y="273" class="conclusione">Victor si convince, ma non impara la parola</text>
    </g>
  </svg>
</template>

<style scoped>
.corridoio { fill: var(--campo); }
.parete { fill: none; stroke: var(--inchiostro); stroke-width: 2; }
.roccia { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.porta { fill: var(--rubrica); }
.porta.aperta { fill: var(--ok); }
.porta-testo { font-size: 14px; font-weight: 700; fill: var(--rubrica); }
.lato { font-size: 22px; font-weight: 700; }
.nome { font-size: 15px; font-weight: 700; }
.traccia { fill: none; stroke: var(--rubrica); stroke-width: 2; stroke-dasharray: 5 4; }
.via { fill: none; stroke: var(--ok); stroke-width: 2.5; }
.sfida { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
.sfida .nota { font-weight: 400; }
.testo { font-size: 14px; }
.forte { font-weight: 700; }
.schema .verde { fill: var(--ok); }
.conclusione { font-size: 15px; font-weight: 700; fill: var(--rubrica); }
</style>
