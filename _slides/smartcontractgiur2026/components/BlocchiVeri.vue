<!--
  Real Bitcoin blocks, data copied on 10/11/2026 from mempool.space (API /api/block/<hash>), so the slide
  makes no request. Left: block 0, the genesis block (3 Jan 2009), with the newspaper headline Satoshi
  Nakamoto wrote into its first transaction. Right: blocks 840,000–840,001 (20 Apr 2024, the fourth halving):
  each one stores the hash of the previous block ("prec."), so they form a chain; their hashes start with
  19 zeros, the proof of work. 4 clicks, numbered explicitly (Vue mounts the arrow before its section, so plain v-click would show it first):
  the genesis block, the two chained blocks, the arrow, the note.

  <BlocchiVeri />
-->
<script setup lang="ts">
const blocchi = [
  { n: '840.000', hash: '0000000000000000000320283a032748cef8227873ff4872689bf23f1cda83a5', prec: '0000000000000000000172014ba58d66455762add0512355ad651207918494ab', ora: '20/4/2024 00:09 UTC', tx: '3.050' },
  { n: '840.001', hash: '00000000000000000001b48a75d5a3077913f3f441eb7e08c13c43f768db2463', prec: '0000000000000000000320283a032748cef8227873ff4872689bf23f1cda83a5', ora: '20/4/2024 00:10 UTC', tx: '2.823' },
]
const zeri = (h: string) => h.match(/^0*/)![0].length
const corto = (h: string) => `${h.slice(0, zeri(h))}|${h.slice(zeri(h), zeri(h) + 6)}…${h.slice(-4)}`
</script>

<template>
  <div class="veri">
    <section v-click="1" class="genesi">
      <p class="titolo">Blocco 0 · 3 gennaio 2009</p>
      <p class="mono hash"><span class="zeri">0000000000</span>19d6689c…e26f</p>
      <p class="messaggio">«The Times 03/Jan/2009 Chancellor on brink of second bailout for banks»</p>
      <p class="nota">Il titolo del giornale scritto da Satoshi Nakamoto dentro il primo blocco: la prova che non è stato creato prima di quel giorno, e un messaggio.</p>
    </section>
    <section v-click="2" class="catena">
      <template v-for="(b, i) in blocchi" :key="b.n">
        <div class="blocco">
          <p class="titolo">Blocco {{ b.n }}</p>
          <p class="riga"><span class="et">impronta</span> <span class="mono"><span class="zeri">{{ corto(b.hash).split('|')[0] }}</span>{{ corto(b.hash).split('|')[1] }}</span></p>
          <p class="riga"><span class="et">prec.</span> <span class="mono" :class="{ legame: i > 0 }">{{ b.prec.slice(19, 25) }}…{{ b.prec.slice(-4) }}</span></p>
          <p class="riga"><span class="et">ora</span> {{ b.ora }}</p>
          <p class="riga"><span class="et">transazioni</span> {{ b.tx }}</p>
        </div>
        <span v-if="i < blocchi.length - 1" v-click="3" class="freccia" aria-hidden="true">→</span>
      </template>
    </section>
    <p v-click="4" class="nota piena">Ogni blocco scrive l'impronta del precedente: cambiare il blocco 840.000 cambierebbe la sua impronta e romperebbe il legame con l'840.001. Le impronte iniziano con 19 zeri: è la prova del lavoro fatto per trovarle.</p>
  </div>
</template>

<style scoped>
.veri {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  gap: 0.8rem 1.2rem;
  align-items: start;
}
.genesi,
.blocco {
  border: 1.5px solid var(--linea);
  border-radius: 4px;
  padding: 0.45rem 0.6rem;
  background: var(--campo);
}
.genesi {
  border-color: var(--glossa);
}
.catena {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 0.4rem;
}
.blocco {
  flex: 1;
  min-width: 0;
}
.titolo {
  font-weight: 700;
  margin: 0 0 0.25rem !important;
  font-size: 0.95rem;
}
.riga {
  margin: 0.08rem 0 !important;
  font-size: 0.78rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.et {
  color: var(--grigio);
  display: inline-block;
  width: 4.6rem;
}
.mono {
  font-family: var(--mono);
  font-size: 0.75rem;
}
.hash {
  margin: 0 0 0.3rem !important;
}
.zeri {
  color: var(--rubrica);
  font-weight: 700;
}
.legame {
  color: var(--ok);
  font-weight: 700;
}
.messaggio {
  font-style: italic;
  font-size: 0.85rem;
  margin: 0.2rem 0 !important;
}
.nota {
  font-size: 0.85rem;
  color: var(--grigio);
  margin: 0.2rem 0 0 !important;
}
.nota.piena {
  grid-column: 1 / 3;
  color: var(--inchiostro);
  font-size: 0.95rem;
}
.freccia {
  color: var(--ok);
  font-weight: 700;
  font-size: 1.2rem;
}
</style>
