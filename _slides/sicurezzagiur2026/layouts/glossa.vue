<!--
  Text on the left, the legal remark ("glossa") in the margin on the right.

  ---
  layout: glossa
  ---
  # Title
  Main content
  ::glossa::
  Remark for jurists
-->
<script setup lang="ts">
defineProps<{ titoloGlossa?: string }>()
</script>

<template>
  <div class="slidev-layout glossa-layout">
    <div class="testo">
      <slot />
    </div>
    <aside class="glossa">
      <p class="glossa-titolo">{{ titoloGlossa ?? 'Per il giurista' }}</p>
      <slot name="glossa" />
    </aside>
  </div>
</template>

<style>
.glossa-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 15.5rem;
  column-gap: 1.6rem;
}
.glossa-layout .testo {
  min-width: 0;
}
.glossa-layout .glossa {
  border-left: 1px solid var(--glossa);
  padding: 0.3rem 0 0 1rem;
  margin-top: 3.6rem;
  font-family: var(--serif);
  font-size: 0.92rem;
  line-height: 1.42;
  color: var(--glossa);
  align-self: start;
}
.glossa-layout .glossa p {
  margin: 0 0 0.55rem;
}
.glossa-layout .glossa ul {
  margin-left: 1rem;
  list-style: none;
}
.glossa-layout .glossa li {
  margin: 0.2rem 0;
}
.glossa-layout .glossa li::before {
  content: '¶ ';
  margin-left: -1rem;
}
.glossa-layout .glossa a {
  color: var(--glossa);
}
.glossa-layout .glossa .glossa-titolo {
  font-style: italic;
  font-weight: 600;
  font-size: 1rem;
}
</style>
