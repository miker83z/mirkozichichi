<!--
  How many keys do n people need to talk privately two by two?
  Symmetric: one shared secret key per pair, n(n−1)/2. Asymmetric: one key pair per person, n.
  Two small drawings show up to 12 people on a circle. In the PDF n = 10, with the line for n = 1000.

  <KeyCount />
  <KeyCount :n="4" :max="200" />

  Props: n?: number (default 10), max?: number (slider maximum, default 1000; the slider is logarithmic)
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNav } from '@slidev/client'
import { migliaia } from '../utils/esponenti'

const props = withDefaults(defineProps<{ n?: number, max?: number }>(), { n: 10, max: 1000 })

const { isPrintMode } = useNav()
// The slider moves on a logarithmic scale, so that small groups (2, 3, 5…) are as easy to pick as 1000.
const PASSI = 1000
const daPosizione = (p: number) => Math.round(2 * (props.max / 2) ** (p / PASSI))
const aPosizione = (v: number) => Math.round((PASSI * Math.log(v / 2)) / Math.log(props.max / 2))
const posizione = ref(aPosizione(props.n))
const n = computed(() => (isPrintMode.value ? 10 : daPosizione(posizione.value)))

const simmetriche = computed(() => (n.value * (n.value - 1)) / 2)
const disegnate = computed(() => Math.min(n.value, 12))

const C = 70 // centre of the 140 × 140 drawings
const R = 47
const punti = computed(() =>
  Array.from({ length: disegnate.value }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / disegnate.value
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a), a }
  }),
)
const archi = computed(() => {
  const out: { x1: number, y1: number, x2: number, y2: number }[] = []
  const p = punti.value
  for (let i = 0; i < p.length; i++)
    for (let j = i + 1; j < p.length; j++) out.push({ x1: p[i].x, y1: p[i].y, x2: p[j].x, y2: p[j].y })
  return out
})
// Each person's own key pair hangs just outside the circle: public (outlined) and private (filled).
const coppie = computed(() =>
  punti.value.map(({ x: px, y: py, a }) => {
    const r = R + 14
    const dx = Math.cos(a + Math.PI / 2) * 3.8
    const dy = Math.sin(a + Math.PI / 2) * 3.8
    const x = C + r * Math.cos(a)
    const y = C + r * Math.sin(a)
    return { px, py, x, y, pub: { x: x - dx, y: y - dy }, priv: { x: x + dx, y: y + dy } }
  }),
)
const mille = (1000 * 999) / 2
</script>

<template>
  <div class="demo key-count">
    <div class="cursore">
      <label for="kc-n">Persone che vogliono scriversi in privato, a due a due: <strong class="rosso n">{{ migliaia(n) }}</strong></label>
      <input id="kc-n" v-model.number="posizione" type="range" min="0" :max="PASSI" :aria-valuetext="`${n} persone`" :disabled="isPrintMode">
    </div>

    <div class="colonne">
      <section class="colonna">
        <svg viewBox="0 0 140 140" class="disegno" role="img" :aria-label="`${disegnate} persone, una chiave per ogni coppia`">
          <line v-for="(e, i) in archi" :key="i" v-bind="e" class="arco" />
          <circle v-for="(p, i) in punti" :key="i" :cx="p.x" :cy="p.y" r="5" class="persona" />
        </svg>
        <div class="dati">
          <h3>Cifratura simmetrica</h3>
          <p class="grande">{{ migliaia(simmetriche) }}</p>
          <p class="cosa">chiavi segrete condivise</p>
          <p class="regola">una per ogni coppia: n(n − 1)/2</p>
        </div>
      </section>

      <section class="colonna">
        <svg viewBox="0 0 140 140" class="disegno" role="img" :aria-label="`${disegnate} persone, ognuna con la sua coppia di chiavi`">
          <g v-for="(k, i) in coppie" :key="i">
            <line :x1="k.px" :y1="k.py" :x2="k.x" :y2="k.y" class="gancio" />
            <rect :x="k.pub.x - 3" :y="k.pub.y - 3" width="6" height="6" class="pubblica" />
            <rect :x="k.priv.x - 3" :y="k.priv.y - 3" width="6" height="6" class="privata" />
          </g>
          <circle v-for="(p, i) in punti" :key="i" :cx="p.x" :cy="p.y" r="5" class="persona" />
        </svg>
        <div class="dati">
          <h3>Cifratura asimmetrica</h3>
          <p class="grande">{{ migliaia(n) }}</p>
          <p class="cosa">coppie di chiavi</p>
          <p class="regola">una per persona: {{ migliaia(n) }} pubbliche + {{ migliaia(n) }} private</p>
          <p class="legenda"><span class="q pubblica-q" /> pubblica <span class="q privata-q" /> privata</p>
        </div>
      </section>
    </div>

    <p class="didascalia">
      Il numero di chiavi simmetriche cresce con il quadrato di n (non esponenzialmente): il doppio delle persone, circa il quadruplo delle chiavi.
      <span v-if="n > 12" class="grigio">Disegno limitato a 12 persone.</span>
    </p>
    <p v-if="isPrintMode" class="mille">Con n = 1.000: <strong>{{ migliaia(mille) }}</strong> chiavi segrete contro <strong>1.000</strong> coppie di chiavi.</p>
  </div>
</template>

<style scoped>
.key-count {
  max-width: 880px;
}
.cursore label {
  font-size: 0.95rem;
  color: var(--inchiostro);
}
.n {
  font-size: 1.15rem;
}
.colonne {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1rem;
  margin-top: 0.4rem;
}
.colonna {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 6px;
  padding: 0.4rem 0.7rem;
  min-width: 0;
}
.disegno {
  width: 135px;
  height: 135px;
  flex: none;
}
.arco {
  stroke: var(--rubrica);
  stroke-width: 0.8;
  stroke-opacity: 0.55;
}
.gancio {
  stroke: var(--grigio);
  stroke-width: 1;
}
.persona {
  fill: var(--inchiostro);
  stroke: var(--carta);
  stroke-width: 1.5;
}
.pubblica {
  fill: var(--carta);
  stroke: var(--ok);
  stroke-width: 1.4;
}
.privata {
  fill: var(--rubrica);
}
.dati {
  min-width: 0;
}
.dati h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--inchiostro);
}
.dati p {
  margin: 0;
}
.grande {
  font-family: var(--serif);
  font-size: 2.3rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--rubrica);
}
.cosa {
  font-size: 1rem;
  font-weight: 700;
}
.regola {
  font-size: 0.85rem;
  color: var(--grigio);
}
.legenda {
  font-size: 0.8rem;
  color: var(--grigio);
  margin-top: 0.2rem !important;
}
.q {
  display: inline-block;
  width: 0.65rem;
  height: 0.65rem;
  vertical-align: -0.05rem;
  margin-left: 0.2rem;
}
.pubblica-q {
  border: 1.5px solid var(--ok);
  background: var(--carta);
}
.privata-q {
  background: var(--rubrica);
}
.didascalia {
  font-size: 0.9rem;
  margin: 0.5rem 0 0;
}
.mille {
  font-size: 0.95rem;
  margin: 0.2rem 0 0;
}
</style>
