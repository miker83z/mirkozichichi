<!-- Footer on every slide: the current section and the slide number. Hidden on title and divider slides. -->
<script setup lang="ts">
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const { slides } = useNav()
const { $page } = useSlideContext()

const sezione = computed(() => {
  for (let i = $page.value - 1; i >= 0; i--) {
    const fm = slides.value[i]?.meta?.slide?.frontmatter
    if (fm?.layout === 'capo')
      return fm.sezione ?? ''
    if (fm?.layout === 'appendice-inizio')
      return 'Appendice'
  }
  return ''
})
const nascosto = computed(() => ['capo', 'copertina'].includes(slides.value[$page.value - 1]?.meta?.layout ?? ''))
</script>

<template>
  <footer v-if="!nascosto" class="piede">
    <span>{{ sezione }}</span>
    <span>{{ $page }}</span>
  </footer>
</template>

<style>
.piede {
  position: absolute;
  left: 3rem;
  right: 3rem;
  bottom: 0.9rem;
  display: flex;
  justify-content: space-between;
  font-family: var(--serif);
  font-size: 0.72rem;
  color: var(--grigio);
}
</style>
