<!--
  What the issuer of a stablecoin can do, played with buttons. Three holders (Alice, Bob and Mallory, who
  received stolen funds) and the token's total supply. "Mallory invia a Bob" and "Bob invia a Mallory" try a
  transfer of 100. The issuer can freeze Mallory ("congela") and, in the USDT mode, wipe the frozen balance
  ("azzera il saldo bloccato"), which also lowers the supply.
  The two modes follow the real contracts (verifica/D):
  - USDC (Circle, Blacklistable.sol): a frozen address can neither send nor receive (notBlacklisted on sender
    and recipient); there is no function to wipe a balance.
  - USDT (Tether, TetherToken on Etherscan): a frozen address cannot send (only the sender is checked);
    destroyBlackFunds sets its balance to 0 and subtracts it from the total supply.
  In the PDF: USDT mode after freeze and wipe.

  <CongelaStablecoin />
-->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useNav } from '@slidev/client'

const { isPrintMode } = useNav()
type Modo = 'USDC' | 'USDT'
const modo = ref<Modo>('USDC')
const saldi = ref<Record<string, number>>({ Alice: 500, Bob: 300, Mallory: 1_000 })
const bloccati = ref<Set<string>>(new Set())
const offerta = ref(1_800)
const registro = ref<{ testo: string, ok: boolean }[]>([])

const emittente = computed(() => (modo.value === 'USDC' ? 'Circle' : 'Tether'))

function annota(testo: string, ok: boolean) {
  registro.value = [{ testo, ok }, ...registro.value].slice(0, 4)
}
function invia(da: string, a: string) {
  if (bloccati.value.has(da)) return annota(`${da} → ${a}: rifiutato, ${da} è bloccato`, false)
  if (modo.value === 'USDC' && bloccati.value.has(a)) return annota(`${da} → ${a}: rifiutato, ${a} è bloccato e non può ricevere`, false)
  if (saldi.value[da] < 100) return annota(`${da} → ${a}: saldo insufficiente`, false)
  saldi.value[da] -= 100
  saldi.value[a] += 100
  annota(`${da} → ${a}: 100 ${modo.value} inviati`, true)
}
function congela() {
  bloccati.value = new Set([...bloccati.value, 'Mallory'])
  annota(`${emittente.value} blocca Mallory (${modo.value === 'USDC' ? 'blacklist' : 'addBlackList'})`, true)
}
function azzera() {
  const tolti = saldi.value.Mallory
  saldi.value.Mallory = 0
  offerta.value -= tolti
  annota(`Tether azzera il saldo di Mallory: −${tolti} dall'offerta (destroyBlackFunds)`, true)
}
function ricomincia(m: Modo = modo.value) {
  modo.value = m
  saldi.value = { Alice: 500, Bob: 300, Mallory: 1_000 }
  bloccati.value = new Set()
  offerta.value = 1_800
  registro.value = []
}
onMounted(() => {
  if (isPrintMode.value) {
    ricomincia('USDT'); congela(); invia('Mallory', 'Bob'); azzera()
  }
})
</script>

<template>
  <div class="demo congela">
    <div class="modi" role="group" aria-label="Quale stablecoin">
      <button class="btn" :class="{ pieno: modo === 'USDC' }" @click="ricomincia('USDC')">USDC (Circle)</button>
      <button class="btn" :class="{ pieno: modo === 'USDT' }" @click="ricomincia('USDT')">USDT (Tether)</button>
      <span class="grigio piccolo">Il contratto del token, sulla blockchain, ha funzioni che solo l'emittente può chiamare.</span>
    </div>

    <div class="griglia">
      <table class="saldi">
        <thead><tr><th>Titolare</th><th>Saldo</th><th /></tr></thead>
        <tbody>
          <tr v-for="(s, chi) in saldi" :key="chi" :class="{ bloccato: bloccati.has(String(chi)) }">
            <td>{{ chi }}<span v-if="chi === 'Mallory'" class="grigio piccolo"> (ha ricevuto fondi rubati)</span></td>
            <td class="num">{{ s.toLocaleString('it-IT') }}</td>
            <td><span v-if="bloccati.has(String(chi))" class="stato">bloccato</span></td>
          </tr>
          <tr class="totale"><td>Offerta totale</td><td class="num">{{ offerta.toLocaleString('it-IT') }}</td><td /></tr>
        </tbody>
      </table>
      <div class="azioni">
        <p class="etichetta">Utenti</p>
        <button class="btn" @click="invia('Mallory', 'Bob')">Mallory invia 100 a Bob</button>
        <button class="btn" @click="invia('Bob', 'Mallory')">Bob invia 100 a Mallory</button>
        <p class="etichetta">{{ emittente }} (emittente)</p>
        <button class="btn pieno" :disabled="bloccati.has('Mallory')" @click="congela">Blocca Mallory</button>
        <button v-if="modo === 'USDT'" class="btn pieno" :disabled="!bloccati.has('Mallory') || saldi.Mallory === 0" @click="azzera">Azzera il saldo bloccato</button>
        <p v-else class="grigio piccolo">Nel contratto di USDC non c'è una funzione per azzerare un saldo.</p>
      </div>
    </div>

    <ol class="registro">
      <li v-for="(r, i) in registro" :key="i" :class="r.ok ? 'esito-ok' : 'esito-ko'">{{ r.ok ? '✓' : '✗' }} {{ r.testo }}</li>
    </ol>
  </div>
</template>

<style scoped>
.congela {
  padding: 0.6rem 0.9rem;
}
.modi {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.8rem;
}
.griglia {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
}
.saldi {
  font-size: 0.95rem !important;
}
.saldi td {
  padding: 0.25rem 0.5rem;
}
.num {
  font-family: var(--mono);
  text-align: right;
}
.bloccato td {
  color: var(--ko);
}
.stato {
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid var(--ko);
  border-radius: 3px;
  padding: 0 0.3rem;
}
.totale td {
  font-weight: 700;
  border-top: 2px solid var(--linea);
}
.azioni {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.etichetta {
  margin: 0.2rem 0 0 !important;
  font-size: 0.8rem;
  color: var(--grigio);
}
.registro {
  list-style: none;
  margin: 0.5rem 0 0 !important;
  padding: 0;
  font-size: 0.9rem;
  min-height: 3.6rem;
}
.registro li {
  margin: 0.1rem 0 !important;
}
</style>
