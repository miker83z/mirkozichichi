<!--
  The path of an encrypted message, with a real (toy) cipher: the Caesar cipher with key K.
  Mittente [M] → Cifra E(K, M) → canale non sicuro [M'] → Decifra D(K, M') → Destinatario [M].
  Eve, on the channel, sees only M'. The switch lets her try a wrong key: she gets gibberish.
  In the PDF Eve's failed attempt is shown too.

  <CipherPipeline />
  <CipherPipeline messaggio="Il testamento è nella cassaforte" :chiave="7" />

  Props: messaggio?: string, chiave?: number (1–25, default 3)
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNav } from '@slidev/client'
import { cesare } from '../utils/cifrari'

const props = withDefaults(defineProps<{ messaggio?: string, chiave?: number }>(), {
  messaggio: 'Ci vediamo in tribunale alle 9',
  chiave: 3,
})

const { isPrintMode } = useNav()
const m = ref(props.messaggio)
const k = ref(Math.min(25, Math.max(1, props.chiave)))
const eveProva = ref(false)

const cifrato = computed(() => cesare(m.value, k.value))
const decifrato = computed(() => cesare(cifrato.value, -k.value))
// Eve's guess: a fixed wrong key, always different from K.
const kEve = computed(() => ((k.value + 8) % 25) + 1)
const tentativoEve = computed(() => cesare(cifrato.value, -kEve.value))
const mostraEve = computed(() => isPrintMode.value || eveProva.value)
</script>

<template>
  <div class="demo cipher-pipeline">
    <div class="controlli">
      <div class="campo-m">
        <label for="cp-m">Messaggio in chiaro M</label>
        <input id="cp-m" v-model="m" type="text" maxlength="60" spellcheck="false" :readonly="isPrintMode">
      </div>
      <div class="campo-k">
        <label for="cp-k">Chiave segreta K = <strong class="chiave">{{ k }}</strong> (spostamento delle lettere)</label>
        <input id="cp-k" v-model.number="k" type="range" min="1" max="25" :disabled="isPrintMode">
      </div>
    </div>

    <div class="schema">
      <div class="nodo persona">
        <span class="ruolo">Mittente</span>
        <span class="testo">{{ m }}</span>
        <span class="sigla">M</span>
      </div>
      <span class="freccia" aria-hidden="true">→</span>
      <div class="nodo funzione">
        <span class="ruolo">Cifra</span>
        <span class="espressione">E(K, M)</span>
        <span class="badge-chiave">K = {{ k }}</span>
      </div>
      <span class="freccia" aria-hidden="true">→</span>
      <div class="nodo canale">
        <span class="ruolo">Canale non sicuro</span>
        <span class="testo mono">{{ cifrato }}</span>
        <span class="sigla">M'</span>
      </div>
      <span class="freccia" aria-hidden="true">→</span>
      <div class="nodo funzione">
        <span class="ruolo">Decifra</span>
        <span class="espressione">D(K, M')</span>
        <span class="badge-chiave">K = {{ k }}</span>
      </div>
      <span class="freccia" aria-hidden="true">→</span>
      <div class="nodo persona" :class="{ 'bordo-ok': decifrato === m }">
        <span class="ruolo">Destinatario</span>
        <span class="testo">{{ decifrato }}</span>
        <span class="sigla">M <span class="esito-ok">✓</span></span>
      </div>

      <p class="simmetrica">
        <span class="espressione">K<sub>enc</sub> = K<sub>dec</sub> = K</span><br>
        <span class="grigio">(cifratura simmetrica)</span>
      </p>
      <div class="eve">
        <span class="su" aria-hidden="true">↑</span>
        <p><strong>Eve intercetta:</strong> vede solo M'</p>
        <p v-if="mostraEve" class="tentativo">
          Prova K = {{ kEve }}: <span class="mono">{{ tentativoEve }}</span>&nbsp;<span class="esito-ko">✗ senza senso</span>
        </p>
      </div>
      <div class="azione-eve">
        <button v-if="!isPrintMode" class="btn" :aria-pressed="eveProva" @click="eveProva = !eveProva">
          {{ eveProva ? 'Nascondi il tentativo di Eve' : 'Eve prova a indovinare la chiave' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cipher-pipeline {
  max-width: 880px;
}
.controlli {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 1.2rem;
  margin-bottom: 0.6rem;
}
.chiave {
  color: var(--rubrica);
  font-size: 1rem;
}
.schema {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 0.8fr) auto minmax(0, 1.15fr) auto minmax(0, 0.8fr) auto minmax(0, 1fr);
  align-items: stretch;
  gap: 0 0.3rem;
}
.nodo {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 6px;
  padding: 0.35rem 0.5rem;
  min-width: 0;
}
.ruolo {
  font-size: 0.8rem;
  color: var(--grigio);
}
.testo {
  font-size: 0.9rem;
  line-height: 1.3;
  overflow-wrap: anywhere;
  flex: 1;
}
.mono {
  font-family: var(--mono);
  font-size: 0.85rem;
}
.sigla {
  font-family: var(--serif);
  font-weight: 700;
  font-style: italic;
  color: var(--rubrica);
  font-size: 1rem;
}
.funzione {
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--campo);
  border-color: var(--rubrica);
}
.espressione {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.05rem;
}
.badge-chiave {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--rubrica);
}
.canale {
  border: 1.5px dashed var(--ko);
}
.freccia {
  align-self: center;
  font-size: 1.3rem;
  color: var(--grigio);
}
.simmetrica {
  grid-column: 1 / 3;
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  line-height: 1.35;
}
.simmetrica .espressione {
  font-style: normal;
  font-size: 1.05rem;
}
.eve {
  grid-column: 3 / 8;
  position: relative;
  margin-top: 0.55rem;
  border: 1px solid var(--ko);
  border-radius: 6px;
  background: var(--carta);
  padding: 0.3rem 0.55rem;
  font-size: 0.85rem;
  line-height: 1.3;
}
.eve p {
  margin: 0;
}
.su {
  position: absolute;
  top: -0.85rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--ko);
  font-size: 0.95rem;
  line-height: 1;
}
.tentativo {
  margin-top: 0.15rem !important;
}
.tentativo .mono {
  overflow-wrap: anywhere;
}
.tentativo .esito-ko {
  white-space: nowrap;
}
.azione-eve {
  grid-column: 8 / 10;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: 0.55rem;
}
.azione-eve .btn {
  font-size: 0.85rem;
  text-align: center;
}
</style>
