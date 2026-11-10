<!-- Title slide: the title set large, with the course and the authors underneath. -->
<template>
  <div class="slidev-layout copertina-layout">
    <slot />
  </div>
</template>

<style>
.copertina-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 4rem;
  border-left: 14px solid var(--rubrica);
}
.copertina-layout h1 {
  font-size: 3.4rem;
  font-variation-settings: 'opsz' 72;
  line-height: 1.05;
  border: 0;
  padding: 0;
  margin: 0 0 0.4rem;
  color: var(--inchiostro);
}
.copertina-layout h2 {
  font-style: italic;
  font-weight: 400;
  font-size: 1.7rem;
  color: var(--rubrica);
  margin: 0 0 2.2rem;
}
.copertina-layout p {
  font-size: 1.15rem;
  margin: 0.2rem 0;
}
</style>
