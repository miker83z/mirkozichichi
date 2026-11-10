<!--
  Live SHA-256 of one or two texts. With two texts it shows how many of the 256 bits differ
  (about half, even for a one-letter change: the "avalanche effect").

  <HashPlayground a="moat" b="maot" />      two texts, compared
  <HashPlayground a="ciao" />               one text
  <HashPlayground a="ciao" eco />           also offers the "add a final newline" switch, as `echo` does
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { bitDiff, sha256 } from '../utils/crypto'

const props = defineProps<{ a: string, b?: string, eco?: boolean, righe?: number }>()

const testoA = ref(props.a)
const testoB = ref(props.b ?? '')
const aCapo = ref(false)
const due = props.b !== undefined

const fine = computed(() => (aCapo.value ? '\n' : ''))
const hashA = computed(() => sha256(testoA.value + fine.value))
const hashB = computed(() => sha256(testoB.value + fine.value))
const diversi = computed(() => (due ? bitDiff(hashA.value, hashB.value) : 0))
</script>

<template>
  <div class="demo hash-playground">
    <div class="riga">
      <label for="hp-a">{{ due ? 'Testo A' : 'Testo' }}</label>
      <textarea id="hp-a" v-model="testoA" :rows="righe ?? 1" spellcheck="false" />
      <p class="hex digest">{{ hashA }}</p>
    </div>
    <div v-if="due" class="riga">
      <label for="hp-b">Testo B</label>
      <textarea id="hp-b" v-model="testoB" :rows="righe ?? 1" spellcheck="false" />
      <p class="hex digest">
        <span v-for="(c, i) in hashB" :key="i" :class="{ cambiato: c !== hashA[i] }">{{ c }}</span>
      </p>
    </div>
    <div class="piede-demo">
      <span v-if="due">
        Bit diversi: <strong>{{ diversi }}</strong> su 256 ({{ Math.round((diversi / 256) * 100) }}%)
        <span v-if="testoA === testoB" class="esito-ok">: testi identici, hash identici</span>
      </span>
      <span v-else>SHA-256: sempre 256 bit (64 cifre esadecimali), qualunque sia la lunghezza del testo</span>
      <label v-if="eco" class="interruttore"><input v-model="aCapo" type="checkbox"> aggiungi "a capo" finale (come fa <code>echo</code>)</label>
    </div>
  </div>
</template>

<style scoped>
.riga {
  margin-bottom: 0.6rem;
}
.digest {
  margin: 0.3rem 0 0;
  color: var(--inchiostro);
}
.cambiato {
  color: var(--ko);
  font-weight: 700;
}
.piede-demo {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: var(--grigio);
}
.interruttore {
  display: inline;
  font-size: 0.9rem;
}
</style>
