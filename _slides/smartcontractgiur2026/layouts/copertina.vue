<!--
  Title slide, after the 2025 deck: flowing lines on black, the title in white, the course in teal,
  and a white pill with the speaker and the IOTA logo.

  ---
  layout: copertina
  ---
  # Blockchain & Smart Contracts
  <p class="corso">…</p>
  ::pillola::
  **Mirko Zichichi**
  mirko.zichichi@iota.org
-->
<template>
  <div class="slidev-layout copertina-layout">
    <Correnti />
    <div class="titolo">
      <slot />
    </div>
    <div class="pillola">
      <div class="chi"><slot name="pillola" /></div>
      <img src="/img/iota-logo-blu.svg" alt="IOTA" class="logo">
    </div>
  </div>
</template>

<style>
.copertina-layout {
  position: relative;
  background: #000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
}
.copertina-layout .titolo {
  position: relative;
  text-align: center;
  margin-top: -2.5rem;
}
.copertina-layout h1 {
  font-size: 3.1rem;
  line-height: 1.08;
  margin: 0;
}
.copertina-layout h1::before {
  content: none;
}
.copertina-layout .corso {
  color: var(--acqua);
  font-family: var(--titoli);
  font-weight: 600;
  font-size: 0.95rem;
  margin: 0.5rem 0 0;
}
.copertina-layout .pillola {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: min(36rem, 90%);
  margin-top: 1.8rem;
  padding: 0.7rem 1.6rem;
  background: #fff;
  color: var(--notte);
  border-radius: 0.9rem;
}
.copertina-layout .pillola p {
  margin: 0;
  line-height: 1.3;
  color: var(--notte);
}
.copertina-layout .pillola .chi {
  flex: 1;
  text-align: center;
  font-family: var(--titoli);
  font-size: 1.3rem;
}
.copertina-layout .pillola .chi p + p {
  font-size: 0.8rem;
}
.copertina-layout .pillola a {
  color: var(--notte);
  text-decoration: none;
}
.copertina-layout .logo {
  height: 1.4rem;
  flex: none;
}
</style>
