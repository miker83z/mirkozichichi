<!--
  Closing slide, after the 2025 deck: a drift of blue dots on black, the thanks, the IOTA logo and
  a white pill with the contacts.

  ---
  layout: chiusura
  ---
  # Grazie!
  ::pillola::
  mirko.zichichi@iota.org · mirkozichichi.me
-->
<template>
  <div class="slidev-layout chiusura-layout">
    <Correnti tipo="punti" :seme="11" />
    <div class="centro">
      <slot />
      <img src="/img/iota-logo-bianco.svg" alt="IOTA" class="logo">
      <div class="pillola"><slot name="pillola" /></div>
    </div>
  </div>
</template>

<style>
.chiusura-layout {
  position: relative;
  background: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chiusura-layout .centro {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  width: min(40rem, 90%);
}
.chiusura-layout h1 {
  font-size: 2rem;
  margin: 0;
}
.chiusura-layout h1::before {
  content: none;
}
.chiusura-layout .logo {
  height: 2.2rem;
  margin: 0.3rem 0 0.8rem;
}
.chiusura-layout .pillola {
  width: 100%;
  background: #fff;
  color: var(--notte);
  border-radius: 0.9rem;
  padding: 0.7rem 1.4rem;
  text-align: center;
}
.chiusura-layout .pillola p {
  margin: 0.15rem 0;
  color: var(--notte);
}
.chiusura-layout .pillola a {
  color: var(--notte);
}
</style>
