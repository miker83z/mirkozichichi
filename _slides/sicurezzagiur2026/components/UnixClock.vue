<!--
  The same instant written three ways: ISO 8601 in UTC, Italian time (Europe/Rome) with its
  offset, and Unix time (seconds since 1 January 1970, 00:00 UTC), all ticking live.
  Below, two converters: Unix seconds → date, and an Italian date and time → Unix seconds.
  The example button fills in 1602086059 → 2020-10-07T15:54:19Z.
  In the PDF the clock is fixed at 2026-11-15T10:00:00Z and both converters show an example.

  <UnixClock />
-->
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useNav } from '@slidev/client'
import { daOraRoma, ISTANTE_STAMPA, isoRoma, isoUtc } from '../utils/tempo'

const { isPrintMode } = useNav()
const ESEMPIO = 1602086059
const MAX_MS = 8.64e15

const adesso = ref(isPrintMode.value ? ISTANTE_STAMPA : Date.now())
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (!isPrintMode.value) timer = setInterval(() => { adesso.value = Date.now() }, 250)
})
onUnmounted(() => clearInterval(timer))

const unixAdesso = computed(() => Math.floor(adesso.value / 1000))

const unixIn = ref<number | string>(isPrintMode.value ? ESEMPIO : '')
const daUnix = computed(() => {
  const v = unixIn.value
  if (v === '' || v === null) return null
  const ms = Number(v) * 1000
  if (!Number.isFinite(ms) || Math.abs(ms) > MAX_MS) return null
  return { utc: isoUtc(ms), roma: isoRoma(ms) }
})

const dataIn = ref(isPrintMode.value ? '2026-11-15T11:00:00' : '')
const daData = computed(() => {
  const ms = daOraRoma(dataIn.value)
  return ms === null ? null : { unix: Math.floor(ms / 1000), utc: isoUtc(ms) }
})
</script>

<template>
  <div class="demo orologio">
    <dl class="letture">
      <div class="lettura">
        <dt>Tempo coordinato universale (UTC), formato ISO 8601</dt>
        <dd class="valore">{{ isoUtc(adesso) }}</dd>
      </div>
      <div class="lettura">
        <dt>Ora italiana (Europe/Rome), con lo scarto da UTC</dt>
        <dd class="valore">{{ isoRoma(adesso) }}</dd>
      </div>
      <div class="lettura">
        <dt>Tempo Unix: secondi trascorsi dal 1° gennaio 1970, 00:00 UTC</dt>
        <dd class="valore unix">{{ unixAdesso }}</dd>
      </div>
    </dl>

    <div class="convertitori">
      <div class="conv">
        <label for="uc-unix">Da tempo Unix a data</label>
        <div class="linea">
          <input id="uc-unix" v-model="unixIn" type="number" step="1" placeholder="es. 1602086059">
          <button class="btn" @click="unixIn = ESEMPIO">Esempio: {{ ESEMPIO }}</button>
        </div>
        <p v-if="daUnix" class="risultato">
          <span class="grigio">UTC</span> <span class="hex">{{ daUnix.utc }}</span><br>
          <span class="grigio">in Italia</span> <span class="hex">{{ daUnix.roma }}</span>
        </p>
        <p v-else class="risultato grigio">Scrivi un numero di secondi</p>
      </div>
      <div class="conv">
        <label for="uc-data">Da data e ora italiane a tempo Unix</label>
        <div class="linea">
          <span v-if="isPrintMode" class="campo-stampa">{{ dataIn.slice(8, 10) }}/{{ dataIn.slice(5, 7) }}/{{ dataIn.slice(0, 4) }}, {{ dataIn.slice(11) }}</span>
          <input v-else id="uc-data" v-model="dataIn" type="datetime-local" step="1">
          <button class="btn" @click="dataIn = isoRoma(adesso).slice(0, 19)">Adesso</button>
        </div>
        <p v-if="daData" class="risultato">
          <span class="grigio">Unix</span> <span class="hex unix">{{ daData.unix }}</span><br>
          <span class="grigio">UTC</span> <span class="hex">{{ daData.utc }}</span>
        </p>
        <p v-else class="risultato grigio">Scegli una data e un'ora</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orologio {
  padding: 0.6rem 0.9rem;
  container-type: inline-size;
}
.letture {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.lettura {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: 1rem;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 5px;
  padding: 0.2rem 0.7rem;
}
dt {
  font-size: 0.9rem;
  color: var(--grigio);
}
dd {
  margin: 0;
}
.valore {
  font-family: var(--mono);
  font-size: 1.35rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.01em;
}
.unix {
  color: var(--rubrica);
}
.convertitori {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.2rem;
  margin-top: 0.6rem;
}
.conv {
  min-width: 0;
}
.linea {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.4rem;
}
.linea input {
  flex: 1;
  min-width: 8.5rem;
  font-family: var(--mono);
  font-size: 0.95rem;
}
.linea .btn {
  white-space: nowrap;
  font-size: 0.85rem;
}
.risultato {
  margin: 0.3rem 0 0;
  font-size: 0.9rem;
  line-height: 1.35;
}
.risultato .hex {
  font-size: 0.95rem;
  white-space: nowrap;
  word-break: normal;
}
.campo-stampa {
  flex: 1;
  min-width: 8.5rem;
  font-family: var(--mono);
  font-size: 0.95rem;
  background: var(--carta);
  border: 1px solid #b9b7c0;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
}
/* Next to the margin column of the glossa layout. */
@container (max-width: 680px) {
  .lettura {
    padding: 0.15rem 0.6rem;
  }
  dt {
    font-size: 0.85rem;
    line-height: 1.2;
  }
  .valore {
    font-size: 1.1rem;
  }
  .convertitori {
    gap: 0.8rem;
  }
  .risultato .hex {
    font-size: 0.85rem;
  }
}
</style>
