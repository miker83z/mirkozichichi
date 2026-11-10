<!--
  The recurring checklist of the 2025 deck (pp. 39, 42, 44, 51, 58, 60): what a smart contract platform is
  made of. The items already covered carry a green tick; the ticks earned on this slide appear with clicks;
  the next topic is in red, as in the original.

  <Piattaforma />                      first time: the items appear one per click
  <Piattaforma :fatti="3" :nuovi="1" /> items 1–3 already ticked, the 4th gets its tick with a click,
                                        the 5th is the next topic (red)
  Props: fatti (ticked before this slide, default 0), nuovi (ticked on this slide, with clicks, default 0)
-->
<script setup lang="ts">
const props = withDefaults(defineProps<{ fatti?: number, nuovi?: number }>(), { fatti: 0, nuovi: 0 })

const voci = [
  { prima: 'un network di ', chiave: 'validatori', dopo: ' (i nodi della blockchain)' },
  { prima: 'un algoritmo di ', chiave: 'consenso', dopo: ' (Proof of Work, Proof of Stake)' },
  { prima: 'un ', chiave: 'registro condiviso', dopo: ' (la blockchain)' },
  { prima: 'un sistema di ', chiave: 'indirizzi', dopo: ' (account e wallet)' },
  { prima: 'un ', chiave: 'computer decentralizzato', dopo: ' (la macchina virtuale)' },
  { prima: 'un ', chiave: 'linguaggio', dopo: ' per scrivere i contratti (Move)' },
  { prima: 'una ', chiave: 'struttura economica', dopo: ' (criptovalute e token)' },
]
const primaVolta = props.fatti === 0 && props.nuovi === 0
const prossima = props.fatti + props.nuovi
</script>

<template>
  <div class="piattaforma">
    <p class="intestazione">Una piattaforma per smart contract è fatta di:</p>
    <ul>
      <template v-for="(v, i) in voci" :key="v.chiave">
        <li v-if="primaVolta" v-click :class="{ attuale: false }">
          {{ v.prima }}<strong>{{ v.chiave }}</strong>{{ v.dopo }}
        </li>
        <li v-else :class="{ attuale: i === prossima }">
          {{ v.prima }}<strong>{{ v.chiave }}</strong>{{ v.dopo }}
          <span v-if="i < fatti" class="spunta">✓</span>
          <span v-else-if="i < fatti + nuovi" v-click class="spunta">✓</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.piattaforma {
  border: 1.5px solid var(--rubrica);
  border-radius: 4px;
  padding: 0.7rem 1.2rem 0.8rem;
  max-width: 40rem;
}
.intestazione {
  margin: 0 0 0.3rem !important;
  font-weight: 600;
}
ul {
  margin: 0 0 0 1.3rem !important;
}
li {
  margin: 0.22rem 0 !important;
}
li.attuale strong {
  color: var(--rubrica);
}
.spunta {
  margin-left: 0.4rem;
}
</style>
