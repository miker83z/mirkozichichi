<!--
  A real BIP-39 seed phrase, made in the browser. "Genera" draws 128 random bits (crypto.getRandomValues),
  appends the checksum (the first 4 bits of SHA-256 of those bits), cuts the 132 bits into 12 groups of
  11 bits and reads each group as a position in the official Italian list of 2048 words (2^11 = 2048).
  The bits of each word are shown under it, so the class sees that the words are just a way to write a
  number. Nothing leaves the browser; it is a demo: never use a phrase shown on a projector.
  In the PDF, 128 zero bits are shown → "abaco … abaco abete": the input of the first official test vector,
  which is in English ("abandon … about"); the Italian phrase is computed, not an official vector.
  Source: BIP-39, github.com/bitcoin/bips/blob/master/bip-0039.mediawiki

  <SeedPhrase />
-->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useNav } from '@slidev/client'
import { sha256Bytes } from '../utils/crypto'
import { paroleBip39 } from '../data/bip39-italiano'

const { isPrintMode } = useNav()

const entropia = ref<Uint8Array>(new Uint8Array(16))
const generata = ref(false)

const bitEntropia = computed(() => Array.from(entropia.value, b => b.toString(2).padStart(8, '0')).join(''))
const bitControllo = computed(() => (sha256Bytes(entropia.value)[0] >> 4).toString(2).padStart(4, '0'))
const parole = computed(() => {
  const bit = bitEntropia.value + bitControllo.value
  return Array.from({ length: 12 }, (_, i) => {
    const gruppo = bit.slice(i * 11, i * 11 + 11)
    const indice = Number.parseInt(gruppo, 2)
    return { gruppo, indice, parola: paroleBip39[indice], controllo: i === 11 }
  })
})

function genera() {
  const b = new Uint8Array(16)
  crypto.getRandomValues(b)
  entropia.value = b
  generata.value = true
}

onMounted(() => {
  if (isPrintMode.value) {
    entropia.value = new Uint8Array(16)
    generata.value = true
  }
})
</script>

<template>
  <div class="demo seme">
    <div class="comandi">
      <button class="btn pieno" @click="genera">Genera 128 bit a caso</button>
      <span class="nota">Solo una dimostrazione: una frase mostrata in aula non va mai usata.</span>
    </div>

    <template v-if="generata">
      <ol class="parole">
        <li v-for="(p, i) in parole" :key="i" :class="{ ultima: p.controllo }">
          <span class="n">{{ i + 1 }}</span>
          <span class="parola">{{ p.parola }}</span>
          <span class="bit"><template v-if="p.controllo">{{ p.gruppo.slice(0, 7) }}<span class="cs">{{ p.gruppo.slice(7) }}</span></template><template v-else>{{ p.gruppo }}</template></span>
        </li>
      </ol>
      <p class="spiega">
        12 × 11 = 132 bit: <strong>128 casuali</strong> + <span class="cs">4 di controllo</span> (dall'impronta SHA-256).
        Una parola sbagliata quasi sempre rompe il controllo. Combinazioni possibili: 2<sup>128</sup> ≈ 3,4 × 10<sup>38</sup>.
      </p>
      <p v-if="isPrintMode" class="grigio piccolo">Nella stampa: 128 bit a zero, lo stesso ingresso del primo vettore di prova ufficiale (in inglese «abandon … about»).</p>
    </template>
    <p v-else class="grigio vuoto">Premi «Genera»: il browser estrae 128 bit casuali.</p>
  </div>
</template>

<style scoped>
.seme {
  padding: 0.6rem 0.9rem;
}
.comandi {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem 0.9rem;
}
.nota {
  font-size: 0.85rem;
  color: var(--glossa);
  font-style: italic;
}
.parole {
  list-style: none;
  margin: 0.6rem 0 0 !important;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem 0.6rem;
}
.parole li {
  margin: 0 !important;
  display: grid;
  grid-template-columns: 1.4rem 1fr;
  grid-template-rows: auto auto;
  align-items: baseline;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 4px;
  padding: 0.2rem 0.45rem;
}
.parole li.ultima {
  border-color: var(--glossa);
}
.n {
  font-size: 0.75rem;
  color: var(--grigio);
}
.parola {
  font-weight: 700;
  font-size: 1.05rem;
}
.bit {
  grid-column: 1 / 3;
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--grigio);
  letter-spacing: 0.02em;
}
.cs {
  color: var(--glossa);
  font-weight: 700;
}
.spiega {
  font-size: 0.9rem;
  margin: 0.5rem 0 0 !important;
}
.vuoto {
  margin: 0.6rem 0 0;
}
</style>
