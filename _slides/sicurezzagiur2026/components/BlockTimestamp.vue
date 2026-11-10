<!--
  Bitcoin's rule for the time written in a new block. The time is accepted only if it is
  (1) later than the median of the previous 11 blocks and (2) no more than 2 hours ahead of the
  node's own clock. The 11 previous times are a fixed sample (about 10 minutes apart, with
  jitter, not always increasing, 15 November 2026, UTC); the node's clock is fixed at 11:00 UTC.
  The slider proposes a time from median − 1 h to clock + 3 h, in 5-minute steps; the axis shades
  the accepted window.
  In the PDF the proposed time is clock + 1 h 30 min (accepted).

  <BlockTimestamp />
-->
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useNav } from '@slidev/client'

const { isPrintMode } = useNav()
const MIN = 60000
const GIORNO = Date.UTC(2026, 10, 15)

function ora(hms: string): number {
  const [h, m, s] = hms.split(':').map(Number)
  return GIORNO + ((h * 60 + m) * 60 + (s ?? 0)) * 1000
}
function hhmm(ms: number, secondi = false): string {
  return new Date(ms).toISOString().slice(11, secondi ? 19 : 16)
}

const blocchi = ['09:12:04', '09:19:47', '09:33:15', '09:29:58', '09:41:22', '09:52:40', '10:01:09', '10:13:37', '10:09:51', '10:31:05', '10:48:26'].map(ora)
const mediana = [...blocchi].sort((a, b) => a - b)[5]
const orologio = ora('11:00:00')
const limite = orologio + 120 * MIN

const inizio = Math.floor((mediana - 60 * MIN) / (5 * MIN)) * 5 * MIN
const fine = orologio + 180 * MIN
const passi = Math.round((fine - inizio) / (5 * MIN))

const indice = ref(Math.round(((isPrintMode.value ? orologio + 90 * MIN : orologio) - inizio) / (5 * MIN)))
const proposto = computed(() => inizio + indice.value * 5 * MIN)

const verdetto = computed(() => {
  const t = proposto.value
  if (t <= mediana) return { ok: false, testo: '✗ rifiutato: deve essere successivo alla mediana degli ultimi 11 blocchi' }
  if (t > limite) return { ok: false, testo: '✗ rifiutato, troppo nel futuro: oltre 2 ore rispetto all\'orologio del nodo' }
  const note: string[] = []
  if (t < blocchi[blocchi.length - 1]) note.push('anche se è prima dell\'ultimo blocco')
  if (t > orologio) {
    const d = (t - orologio) / MIN
    note.push(`anche se è ${Math.floor(d / 60) ? `${Math.floor(d / 60)} h ` : ''}${d % 60 ? `${d % 60} min ` : ''}nel futuro`)
  }
  return { ok: true, testo: `✓ accettato${note.length ? ` (${note.join(', ')})` : ''}` }
})

const indietro = blocchi.map((t, i) => i > 0 && t < blocchi[i - 1])

// Time axis, drawn at the real width so that its labels keep their size.
const asse = ref<HTMLElement | null>(null)
const L = ref(860)
const X0 = 22
const X1 = computed(() => L.value - 22)
function x(t: number): number {
  return X0 + ((t - inizio) / (fine - inizio)) * (X1.value - X0)
}
let osservatore: ResizeObserver | undefined
onMounted(() => {
  if (!asse.value) return
  const misura = () => { L.value = Math.max(320, Math.round(asse.value!.clientWidth)) || 860 }
  misura()
  osservatore = new ResizeObserver(misura)
  osservatore.observe(asse.value)
})
onUnmounted(() => osservatore?.disconnect())
const tacche: { t: number, ora: boolean }[] = []
for (let t = Math.ceil(inizio / (30 * MIN)) * 30 * MIN; t <= fine; t += 30 * MIN) tacche.push({ t, ora: t % (60 * MIN) === 0 })
</script>

<template>
  <div class="demo blocchi">
    <div class="intestazione">
      <span class="grigio">Orari degli ultimi 11 blocchi (UTC), nell'ordine della catena:</span>
    </div>
    <ol class="elenco">
      <li v-for="(t, i) in blocchi" :key="i" :class="{ mediana: t === mediana, indietro: indietro[i] }">
        {{ hhmm(t, true) }}
      </li>
    </ol>
    <p class="riassunto">
      <span><span class="campione mediana" /> mediana degli ultimi 11 blocchi: <strong class="hex">{{ hhmm(mediana, true) }}</strong></span>
      <span><span class="campione indietro" /> anteriore al blocco precedente</span>
      <span>Orologio del nodo: <strong class="hex">{{ hhmm(orologio, true) }}</strong></span>
    </p>

    <div ref="asse" class="contenitore-asse">
    <svg class="asse" :viewBox="`0 0 ${L} 92`" role="img" aria-label="Asse del tempo con la finestra di orari accettati">
      <rect :x="x(mediana)" y="20" :width="x(limite) - x(mediana)" height="32" class="finestra" />
      <text :x="(x(mediana) + x(limite)) / 2" y="47" class="etichetta-finestra" text-anchor="middle">orari accettati</text>
      <line :x1="X0" :x2="X1" y1="52" y2="52" class="linea-asse" />
      <g v-for="tk in tacche" :key="tk.t">
        <line :x1="x(tk.t)" :x2="x(tk.t)" y1="52" :y2="tk.ora ? 58 : 55" class="linea-asse" />
        <text v-if="tk.ora" :x="x(tk.t)" y="71" text-anchor="middle" class="ore">{{ hhmm(tk.t) }}</text>
      </g>
      <circle v-for="(t, i) in blocchi" :key="i" :cx="x(t)" cy="30" r="3.6" :class="t === mediana ? 'punto-mediana' : 'punto'" />
      <line :x1="x(mediana)" :x2="x(mediana)" y1="14" y2="52" class="bordo-finestra" />
      <text :x="x(mediana)" y="12" text-anchor="middle" class="etichetta">mediana</text>
      <line :x1="x(orologio)" :x2="x(orologio)" y1="14" y2="52" class="linea-orologio" />
      <text :x="x(orologio)" y="12" text-anchor="middle" class="etichetta">orologio del nodo</text>
      <line :x1="x(limite)" :x2="x(limite)" y1="14" y2="52" class="bordo-finestra" />
      <text :x="x(limite)" y="12" text-anchor="middle" class="etichetta">orologio + 2 ore</text>
      <g :class="verdetto.ok ? 'proposto-ok' : 'proposto-ko'">
        <line :x1="x(proposto)" :x2="x(proposto)" y1="18" y2="60" class="linea-proposto" />
        <text :x="x(proposto)" y="89" :text-anchor="x(proposto) > L - 70 ? 'end' : x(proposto) < 70 ? 'start' : 'middle'" class="etichetta-proposto">
          proposto {{ hhmm(proposto) }}
        </text>
      </g>
    </svg>
    </div>

    <div class="cursore">
      <label for="bt-ora">Orario scritto nel nuovo blocco: <strong class="hex">{{ hhmm(proposto) }} UTC</strong></label>
      <input id="bt-ora" v-model.number="indice" type="range" min="0" :max="passi" step="1">
    </div>
    <p class="verdetto" :class="verdetto.ok ? 'esito-ok' : 'esito-ko'">{{ verdetto.testo }}</p>
    <p class="nota">Quindi un blocco può indicare un orario fino a 2 ore nel futuro, o anteriore a blocchi già accettati.</p>
  </div>
</template>

<style scoped>
.blocchi {
  padding: 0.5rem 0.9rem 0.55rem;
  container-type: inline-size;
}
.intestazione {
  font-size: 0.88rem;
}
.elenco {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(11, minmax(0, 1fr));
  gap: 0.25rem;
  margin: 0.2rem 0 0;
  padding: 0;
}
.elenco li {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.8rem;
  text-align: center;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 3px;
  padding: 0.05rem 0;
}
.elenco li::marker {
  content: none;
}
li.mediana,
.campione.mediana {
  border-color: var(--rubrica);
  box-shadow: inset 0 0 0 1px var(--rubrica);
  font-weight: 700;
}
li.indietro,
.campione.indietro {
  border-style: dashed;
  border-color: var(--glossa);
  background: #f7f0e1;
}
.riassunto {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem 1.4rem;
  margin: 0.3rem 0 0;
  font-size: 0.85rem;
  align-items: center;
}
.riassunto .hex {
  font-size: 0.9rem;
}
.campione {
  display: inline-block;
  width: 1.1rem;
  height: 0.75rem;
  border: 1px solid var(--linea);
  border-radius: 2px;
  vertical-align: -0.05rem;
  background: var(--carta);
}
.asse {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 0.2rem;
  font-family: var(--sans);
}
.finestra {
  fill: #dcefe3;
}
.etichetta-finestra {
  font-size: 13px;
  fill: var(--ok);
  font-weight: 600;
}
.linea-asse {
  stroke: var(--grigio);
  stroke-width: 1;
}
.ore {
  font-size: 13px;
  fill: var(--grigio);
  font-family: var(--mono);
}
.punto {
  fill: var(--inchiostro);
}
.punto-mediana {
  fill: var(--rubrica);
}
.bordo-finestra {
  stroke: var(--ok);
  stroke-width: 1.5;
  stroke-dasharray: 3 2;
}
.linea-orologio {
  stroke: var(--inchiostro);
  stroke-width: 1.5;
}
.etichetta {
  font-size: 13px;
  fill: var(--inchiostro);
}
.linea-proposto {
  stroke-width: 2.5;
}
.proposto-ok .linea-proposto {
  stroke: var(--ok);
}
.proposto-ko .linea-proposto {
  stroke: var(--ko);
}
.etichetta-proposto {
  font-size: 13px;
  font-weight: 700;
}
.proposto-ok .etichetta-proposto {
  fill: var(--ok);
}
.proposto-ko .etichetta-proposto {
  fill: var(--ko);
}
.cursore label {
  margin: 0;
  font-size: 0.9rem;
  color: var(--inchiostro);
}
.cursore .hex {
  font-size: 0.95rem;
}
.verdetto {
  margin: 0.15rem 0 0;
  font-size: 1.05rem;
}
.nota {
  margin: 0.15rem 0 0;
  font-size: 0.85rem;
  color: var(--glossa);
  font-style: italic;
}
/* Next to the margin column of the glossa layout: the 11 times on two rows. */
@container (max-width: 680px) {
  .elenco {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
</style>
