<!--
  Diagram (2024 deck, p. 90): the PGP web of trust. Seven certificates (Alice, Bob, Charlie, Dana,
  Elena, Franco, Gwen) and "firma" arrows between people: A → B means A has signed B's certificate.
  Same signatures as the original, except Charlie → Bob, turned into Bob → Charlie so that the
  example of transitive trust works. No certification authority anywhere.
  4 clicks: the certificates; the signatures ("nessuna autorità centrale"); Alice trusts Bob directly
  (she knows him and signs his certificate); through Bob she trusts Charlie ("per transitività").
  <SchemaReteFiducia />
-->
<script setup lang="ts">
interface Nodo { nome: string, x: number, y: number }
const W = 112
const H = 50
const n: Record<string, Nodo> = {
  Bob: { nome: 'Bob', x: 190, y: 14 },
  Elena: { nome: 'Elena', x: 530, y: 14 },
  Charlie: { nome: 'Charlie', x: 370, y: 116 },
  Gwen: { nome: 'Gwen', x: 754, y: 116 },
  Alice: { nome: 'Alice', x: 10, y: 218 },
  Dana: { nome: 'Dana', x: 210, y: 218 },
  Franco: { nome: 'Franco', x: 560, y: 218 },
}
const nodi = Object.values(n)

/** Point where the segment from the centre of `a` towards the centre of `b` leaves the card `a` (plus a gap). */
function bordo(a: Nodo, b: Nodo, gap: number) {
  const ax = a.x + W / 2, ay = a.y + H / 2
  const dx = b.x + W / 2 - ax, dy = b.y + H / 2 - ay
  const t = Math.min((W / 2 + gap) / Math.abs(dx || 1e-9), (H / 2 + gap) / Math.abs(dy || 1e-9))
  return { x: ax + dx * t, y: ay + dy * t }
}
function freccia(da: Nodo, a: Nodo) {
  const p = bordo(da, a, 3)
  const q = bordo(a, da, 4)
  return { x1: p.x, y1: p.y, x2: q.x, y2: q.y }
}
// who signs whom (signer → signed certificate)
const firme = [
  [n.Dana, n.Alice], [n.Charlie, n.Dana], [n.Bob, n.Elena], [n.Elena, n.Charlie],
  [n.Elena, n.Franco], [n.Gwen, n.Elena], [n.Franco, n.Dana], [n.Franco, n.Gwen],
].map(([a, b]) => freccia(a, b))
const bobCharlie = freccia(n.Bob, n.Charlie)
const aliceBob = freccia(n.Alice, n.Bob)
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: rete di fiducia PGP, gli utenti firmano i certificati gli uni degli altri">
    <!-- 1. I certificati -->
    <g v-click>
      <g v-for="k in nodi" :key="k.nome">
        <rect :x="k.x" :y="k.y" :width="W" :height="H" rx="5" class="cornice" />
        <text :x="k.x + W / 2" :y="k.y + 19" text-anchor="middle" class="nome">{{ k.nome }}</text>
        <SvChiave :x="k.x + 24" :y="k.y + 35" tipo="pubblica" :scala="0.6" />
        <text :x="k.x + 56" :y="k.y + 40" class="pub">P<tspan class="pedice">{{ k.nome }}</tspan></text>
      </g>
    </g>
    <!-- 2. Le firme reciproche -->
    <g v-click>
      <SvFreccia v-for="(f, i) in firme" :key="i" v-bind="f" variante="rubrica" />
      <SvFreccia v-bind="bobCharlie" variante="rubrica" />
      <text x="870" y="20" text-anchor="end" class="nota">A → B: A firma il certificato di B</text>
      <text x="870" y="262" text-anchor="end" class="titolo-nota">nessuna autorità centrale</text>
    </g>
    <!-- 3. Alice si fida di Bob direttamente -->
    <g v-click>
      <SvFreccia v-bind="aliceBob" variante="ok" />
      <rect :x="n.Bob.x - 3" :y="n.Bob.y - 3" :width="W + 6" :height="H + 6" rx="7" class="evidenza" />
      <rect :x="n.Alice.x - 3" :y="n.Alice.y - 3" :width="W + 6" :height="H + 6" rx="7" class="evidenza" />
      <text x="10" y="104" class="fiducia">Alice conosce Bob:</text>
      <text x="10" y="122" class="fiducia">firma il suo</text>
      <text x="10" y="140" class="fiducia">certificato</text>
    </g>
    <!-- 4. Attraverso Bob, Alice si fida di Charlie -->
    <g v-click>
      <SvFreccia v-bind="bobCharlie" variante="ok" />
      <rect :x="n.Charlie.x - 3" :y="n.Charlie.y - 3" :width="W + 6" :height="H + 6" rx="7" class="evidenza" />
      <text :x="n.Charlie.x + W / 2 + 24" :y="n.Charlie.y + H + 22" text-anchor="middle" class="fiducia">per transitività</text>
    </g>
  </svg>
</template>

<style scoped>
.cornice { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.3; }
.nome { font-size: 15px; font-weight: 700; }
.pub { font-size: 14px; font-weight: 700; fill: var(--ok); }
.titolo-nota { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
.evidenza { fill: none; stroke: var(--ok); stroke-width: 3; }
.fiducia { font-size: 15px; font-weight: 700; fill: var(--ok); }
</style>
