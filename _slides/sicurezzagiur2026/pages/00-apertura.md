---
layout: copertina
---

# Introduzione alla Crittografia

## sulla sicurezza ed altre amenità informatiche

**Mirko Zichichi** · [mirko.zichichi@iota.org](mailto:mirko.zichichi@iota.org)

slide in collaborazione con prof. Stefano Ferretti

<p class="grigio mt-8">Seminario "Blockchain e Smart Contract: aspetti giuridici e tecnologici"<br>Università di Bologna, novembre 2026</p>

---

# Chi sono

<p class="lead" v-click>Mirko Zichichi, <a href="https://mirkozichichi.me">mirkozichichi.me</a></p>

<v-clicks>

- **Engineering Team Lead** alla **IOTA Foundation**: registri distribuiti e smart contract (linguaggio Move)
- **Dottorato in Law, Science and Technology** (Bologna, Torino, Madrid)
- Tesi: *sistemi decentralizzati per proteggere i dati personali*

</v-clicks>

<p class="grigio mt-6" v-click>Un informatico tra i giuristi: oggi traduciamo la crittografia in concetti che già usate: firma, data certa, sigillo, busta chiusa.</p>

---

# L'Italia nel mirino: i numeri

<SchemaCrescitaAttacchi />

<p v-click>E il 2026? Nei primi nove mesi il CSIRT Italia dell'ACN ha gestito più eventi che in tutto il 2025 (2.729, di cui 615 incidenti).</p>

<p class="fonte" v-click>Rapporto Clusit 2026 (17 marzo 2026); Relazione annuale ACN 2025; Operational Summary ACN 2026.</p>

<!--
Come leggere i numeri: Clusit conta gli incidenti gravi resi noti da fonti aperte; l'ACN quelli segnalati al CSIRT. Misurano cose diverse.
Gran parte della crescita italiana del 2025 viene dall'hacktivism (196 incidenti): senza, l'aumento sarebbe del 12%, non del 42%. Nel mondo: 5.265 incidenti gravi (+48,7%), il massimo mai registrato; l'Italia ne conta il 9,6%.
Dal 2026 gli obblighi di notifica NIS2 fanno crescere anche le segnalazioni.
-->

---

# 2 novembre 2026: i frigoriferi dei supermercati

<p class="lead" v-click>Alle 4 del mattino qualcuno alza da remoto la temperatura dei frigoriferi in oltre 20 supermercati, da Palermo a Trapani.</p>

<SchemaFrigoriferi />

<p v-click>In Europa oltre 100 supermercati colpiti; la rivendicazione filorussa è <strong>contestata</strong> da esperti e ACN.</p>

<p class="fonte" v-click>Il Post, 3 e 6 novembre 2026; bollettino ACN per la filiera del freddo.</p>

<!--
Per il giurista: dall'11 settembre 2026 i produttori di dispositivi connessi devono segnalare le vulnerabilità sfruttate e gli incidenti gravi (art. 14, Reg. (UE) 2024/2847, Cyber Resilience Act).
Nel 2024 la slide raccontava l'attacco al Comune di Palermo; due anni dopo l'obiettivo è la catena del freddo.
Collegamento con il Capo I: "i sistemi che non vengono aggiornati divengono fragili e insicuri".
-->

---

# Un anno di attacchi: proviamo a classificarli

<p class="lead" v-click>Per ogni notizia: quale proprietà della sicurezza è stata violata? Cliccate su una scheda.</p>

<div v-click>

<NewsWall />

</div>

<!--
Altri fatti della settimana 2-9 novembre 2026 (Il Post, 9/11): attacco alla società della galleria di base del Brennero (BBT SE, metà ottobre, reso noto il 7/11); dati personali del ministro Tajani pubblicati sul dark web (sua dichiarazione del 7/11); falsi allarmi bomba su oltre 30 voli, anche per Fiumicino; il ministro Piantedosi ha convocato il Comitato nazionale per l'ordine e la sicurezza pubblica per il 10/11.
Il caso DIA serve a distinguere una rivendicazione da un fatto accertato.
Per il giurista: art. 615-ter c.p. (accesso abusivo); L. 90/2024; d.lgs. 138/2024 (NIS2), notifica al CSIRT entro 24 ore; art. 33 GDPR, notifica al Garante entro 72 ore.
-->

---

# Sei notizie, cinque proprietà

<SchemaNotizie />

---

# Il percorso di oggi

<div class="indice">
  <div v-click><span class="n">I</span>Sicurezza informatica</div>
  <div v-click><span class="n">II</span>Crittografia</div>
  <div v-click><span class="n">III</span>Crittografia simmetrica</div>
  <div v-click><span class="n">IV</span>Crittografia asimmetrica</div>
  <div v-click><span class="n">V</span>Funzioni hash</div>
  <div v-click><span class="n">VI</span>Puntatori hash e strutture dati</div>
  <div v-click><span class="n">VII</span>Non ripudio e firma digitale</div>
  <div v-click><span class="n">VIII</span>Marcatura temporale</div>
  <div v-click><span class="n">IX</span>Identità decentralizzate</div>
</div>

<style>
.indice { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem 1.5rem; margin-top: 1rem; }
.indice div { font-size: 1.15rem; border-bottom: 1px solid var(--linea); padding: 0.4rem 0; }
.indice .n { display: inline-block; width: 2.6rem; font-family: var(--serif); color: var(--rubrica); font-weight: 600; }
</style>
