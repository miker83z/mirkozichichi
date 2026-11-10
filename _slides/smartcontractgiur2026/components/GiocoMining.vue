<!--
  The mining game, one turn per click of "Turno", to explain Proof of Work step by step.
  Four miners with different computing power (tries per turn: Anna 1, Bruno 2, Carla 3, Dario 6, the
  "mining farm") compete for the next block. In a turn each miner tries its next nonces: the real SHA-256 of
  "Blocco n | prec: <hash of the previous block> | Alice paga Bob 5 | miner: <name> | nonce: k" (the winner's
  name is inside the block, as the miner's address is in a real coinbase transaction). Rule of the game:
  the first fingerprint that starts with "0" wins (1 chance in 16 per try; Bitcoin today asks for about 19
  zeros). The winner adds the block to the chain and takes the reward; the others check it with one hash.
  Then the race starts again on top of the new block. Ties in the same turn go to the first found (in reality
  they create a short fork). In the PDF: the game played for three blocks.

  <GiocoMining />
  <GiocoMining :zeri="2" />     harder: fingerprints that start with "00" (1 in 256)

  Props: zeri?: number (leading hex zeros required, 1–3, default 1)
-->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useNav } from '@slidev/client'
import { sha256 } from '../utils/crypto'

const props = withDefaults(defineProps<{ zeri?: number }>(), { zeri: 1 })
const { isPrintMode } = useNav()

const MINER = [
  { nome: 'Anna', potenza: 1 },
  { nome: 'Bruno', potenza: 2 },
  { nome: 'Carla', potenza: 3 },
  { nome: 'Dario', potenza: 6 },
]
const PREMIO = '3,125 BTC'
const GENESI = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f' // the real hash of Bitcoin's block 0

interface Blocco { n: number, hash: string, vincitore: string, nonce: number, turni: number }
interface Tentativo { nonce: number, hash: string, ok: boolean }

const prefisso = '0'.repeat(Math.min(3, Math.max(1, props.zeri)))
const catena = ref<Blocco[]>([])
const tentativi = ref<Tentativo[][]>(MINER.map(() => []))
const prossimoNonce = ref<number[]>(MINER.map(() => 0))
const turno = ref(0)
const totale = ref(0)
const esito = ref<{ vincitore: string, blocco: Blocco } | null>(null)

const precedente = computed(() => catena.value.at(-1)?.hash ?? GENESI)
const numero = computed(() => (catena.value.at(-1)?.n ?? 0) + 1)
const testo = (n: number, prec: string, chi: string, nonce: number) => `Blocco ${n} | prec: ${prec.slice(0, 12)} | Alice paga Bob 5 | miner: ${chi} | nonce: ${nonce}`

function gioca() {
  if (esito.value) {
    // a block was just found: the next turn starts the race for the next block
    esito.value = null
    tentativi.value = MINER.map(() => [])
    prossimoNonce.value = MINER.map(() => 0)
    turno.value = 0
  }
  turno.value++
  let vincitore: { i: number, t: Tentativo } | null = null
  tentativi.value = MINER.map((m, i) => {
    const prove: Tentativo[] = []
    for (let k = 0; k < m.potenza; k++) {
      const nonce = prossimoNonce.value[i]++
      const hash = sha256(testo(numero.value, precedente.value, m.nome, nonce))
      const ok = hash.startsWith(prefisso)
      prove.push({ nonce, hash, ok })
      totale.value++
      if (ok && !vincitore) vincitore = { i, t: prove.at(-1)! }
      if (ok) break
    }
    return prove
  })
  if (vincitore) {
    const { i, t } = vincitore as { i: number, t: Tentativo }
    const blocco = { n: numero.value, hash: t.hash, vincitore: MINER[i].nome, nonce: t.nonce, turni: turno.value }
    catena.value = [...catena.value, blocco]
    esito.value = { vincitore: MINER[i].nome, blocco }
  }
}

function ricomincia() {
  catena.value = []
  tentativi.value = MINER.map(() => [])
  prossimoNonce.value = MINER.map(() => 0)
  turno.value = 0
  totale.value = 0
  esito.value = null
}

onMounted(() => {
  if (isPrintMode.value) {
    let sicurezza = 0
    while (catena.value.length < 3 && sicurezza++ < 200) gioca()
  }
})

const blocchiVinti = (nome: string) => catena.value.filter(b => b.vincitore === nome).length
</script>

<template>
  <div class="demo gioco">
    <div class="testa">
      <p class="regola">Regola: vince chi trova per primo un'impronta che inizia con <code>{{ prefisso }}</code></p>
      <div class="comandi">
        <button class="btn pieno" @click="gioca">{{ esito ? 'Nuova gara: blocco successivo' : 'Turno' }}</button>
        <button class="btn" :disabled="!totale" @click="ricomincia">Ricomincia</button>
      </div>
    </div>

    <div class="catena" aria-label="La catena dei blocchi">
      <div class="blocco genesi"><span class="n">blocco 0</span><span class="mono">{{ GENESI.slice(0, 10) }}…</span></div>
      <template v-for="b in catena" :key="b.n">
        <span class="freccia" aria-hidden="true">←</span>
        <div class="blocco"><span class="n">blocco {{ b.n }} · {{ b.vincitore }}</span><span class="mono"><strong>{{ b.hash.slice(0, prefisso.length) }}</strong>{{ b.hash.slice(prefisso.length, 10) }}…</span></div>
      </template>
      <span class="freccia" aria-hidden="true">←</span>
      <div class="blocco prossimo"><span class="n">blocco {{ numero }}?</span><span class="grigio piccolo">in gara</span></div>
    </div>

    <table class="miner">
      <thead><tr><th>Miner</th><th>Potenza</th><th>Tentativi di questo turno (impronte)</th><th>Blocchi vinti</th></tr></thead>
      <tbody>
        <tr v-for="(m, i) in MINER" :key="m.nome" :class="{ vince: esito?.vincitore === m.nome }">
          <td class="nome">{{ m.nome }}</td>
          <td><span class="potenza" :style="{ width: `${m.potenza * 0.9}rem` }" :title="`${m.potenza} tentativi per turno`" /> {{ m.potenza }}</td>
          <td class="prove">
            <span v-for="t in tentativi[i]" :key="t.nonce" class="mono" :class="{ ok: t.ok }"><strong>{{ t.hash.slice(0, prefisso.length) }}</strong>{{ t.hash.slice(prefisso.length, 6) }}</span>
            <span v-if="!tentativi[i].length" class="grigio">—</span>
          </td>
          <td>{{ blocchiVinti(m.nome) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="esito" class="esito esito-ok" role="status">
      {{ esito.vincitore }} trova <span class="mono">{{ esito.blocco.hash.slice(0, 10) }}…</span> al turno {{ esito.blocco.turni }}: aggiunge il blocco {{ esito.blocco.n }} e incassa {{ PREMIO }}.
      Gli altri lo controllano con un solo calcolo ✓ e ripartono da lì.
    </p>
    <p v-else class="esito grigio" role="status">Turno {{ turno }} · tentativi di tutta la rete: {{ totale }}<template v-if="turno"> · nessuno ha vinto: si continua</template></p>
  </div>
</template>

<style scoped>
.gioco {
  padding: 0.6rem 0.9rem;
}
.testa {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem 1rem;
}
.regola {
  margin: 0 !important;
  font-weight: 600;
}
.comandi {
  display: flex;
  gap: 0.5rem;
}
.catena {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
  margin: 0.55rem 0;
}
.blocco {
  display: flex;
  flex-direction: column;
  border: 1.5px solid var(--linea);
  border-radius: 4px;
  padding: 0.15rem 0.45rem;
  font-size: 0.8rem;
  background: var(--carta);
}
.blocco.genesi {
  border-style: dashed;
}
.blocco.prossimo {
  border-style: dotted;
}
.blocco .n {
  font-weight: 700;
}
.freccia {
  color: var(--grigio);
}
.mono {
  font-family: var(--mono);
  font-size: 0.78rem;
}
.mono strong {
  color: var(--rubrica);
}
.miner {
  font-size: 0.9rem !important;
}
.miner th {
  font-size: 0.8rem;
}
.miner td {
  padding: 0.15rem 0.5rem;
  vertical-align: middle;
}
.miner tr.vince td {
  background: color-mix(in srgb, var(--ok) 16%, var(--carta));
}
.nome {
  font-weight: 700;
}
.potenza {
  display: inline-block;
  height: 0.6rem;
  background: var(--glossa);
  border-radius: 2px;
  vertical-align: middle;
}
.prove {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 0.5rem;
}
.prove .ok {
  color: var(--ok);
  font-weight: 700;
}
.prove .ok strong {
  color: var(--ok);
}
.esito {
  margin: 0.5rem 0 0 !important;
  font-size: 0.95rem;
}
</style>
