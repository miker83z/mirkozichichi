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

<div class="grid grid-cols-[1fr_16rem] gap-10">
<div>

<p class="lead">Mirko Zichichi, <a href="https://mirkozichichi.me">mirkozichichi.me</a></p>

- **Engineering Team Lead** presso la **IOTA Foundation**: protocolli per registri distribuiti e il linguaggio per smart contract Move
- **Dottorato in Law, Science and Technology** (Joint Doctorate, borsa Marie Skłodowska-Curie), Università di Bologna, Università di Torino e Universidad Politécnica de Madrid (Ontology Engineering Group)
- Tesi: *sistemi decentralizzati per la protezione e la portabilità dei dati personali*

</div>
<div class="piccolo grigio">

Un informatico tra i giuristi: oggi proviamo a tradurre la crittografia in concetti che usate già, come la firma, la data certa, il sigillo, la busta chiusa.

</div>
</div>

---
layout: glossa
titoloGlossa: Come leggere i numeri
---

# L'Italia nel mirino: i numeri

<div class="numeri">
  <div><p class="cifra">507</p><p>incidenti gravi in Italia nel 2025: <strong>+42%</strong> sul 2024, il <strong>9,6%</strong> di tutti quelli censiti nel mondo</p></div>
  <div><p class="cifra">5.265</p><p>incidenti gravi nel mondo nel 2025 (+48,7%): il massimo mai registrato</p></div>
  <div><p class="cifra">2.729</p><p>eventi gestiti dal CSIRT Italia dell'ACN nel 2025 (+38%), di cui <strong>615</strong> incidenti con impatto confermato</p></div>
</div>

Nel 2026 il ritmo non cala: nei primi nove mesi il CSIRT Italia ha gestito più eventi che in tutto il 2025.

<p class="fonte">Rapporto Clusit 2026 (17 marzo 2026); Relazione annuale ACN 2025; Operational Summary ACN 2026.</p>

::glossa::

Clusit conta gli incidenti gravi resi noti da fonti aperte; l'ACN quelli segnalati al CSIRT. Misurano cose diverse.

Gran parte della crescita italiana viene dall'hacktivism (196 incidenti nel 2025): senza, l'aumento sarebbe del 12%, non del 42%.

Dal 2026 gli obblighi di notifica NIS2 fanno crescere anche le segnalazioni.

<style>
.numeri { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin: 0.4rem 0 1rem; }
.numeri .cifra { font-family: var(--serif); font-variation-settings: 'opsz' 72; font-size: 3.1rem; line-height: 1; color: var(--rubrica); margin: 0 0 0.4rem; }
.numeri p { font-size: 1rem; margin: 0; }
</style>

---
layout: glossa
---

# 2 novembre 2026: i frigoriferi dei supermercati

<p class="lead">Alle 4 del mattino qualcuno alza da remoto la temperatura di frigoriferi e congelatori in oltre 20 supermercati tra Palermo, Catania, Ragusa e Trapani.</p>

- Colpiti anche punti vendita in Toscana ed Emilia-Romagna; in Europa oltre 100 supermercati in otto Paesi, dopo circa 700 in Francia a ottobre
- Vettore probabile: il software di telegestione degli impianti, esposto su Internet e **non aggiornato**
- Rivendicazione dei gruppi filorussi NoName057(16) e Z-Pentest, **contestata** da esperti e dall'ACN
- L'ACN ha diffuso un bollettino con misure urgenti per la distribuzione alimentare e la filiera del freddo

<p class="fonte">Il Post, 3 e 6 novembre 2026; Cybersecurity360 sul bollettino ACN.</p>

::glossa::

Cosa è stato violato? L'**integrità** (parametri modificati) e, di conseguenza, la **disponibilità** (merce da buttare).

Dall'11 settembre 2026 i produttori di dispositivi connessi devono segnalare le vulnerabilità sfruttate e gli incidenti gravi.

- art. 14, Reg. (UE) 2024/2847 (Cyber Resilience Act)

<!--
Nel 2024 la slide raccontava l'attacco al Comune di Palermo; due anni dopo l'obiettivo è la catena del freddo.
Collegamento con il Capo I: "i sistemi che non vengono aggiornati divengono fragili e insicuri".
-->

---

# Un anno di attacchi, in sei notizie

<p class="lead">Per ognuna: quale proprietà della sicurezza è stata violata? Cliccate per scoprirlo.</p>

<NewsWall />

<!--
Altri fatti della settimana 2-9 novembre 2026 (Il Post, 9/11): attacco alla società della galleria di base del Brennero (BBT SE, metà ottobre, reso noto il 7/11); dati personali del ministro Tajani pubblicati sul dark web (sua dichiarazione del 7/11); falsi allarmi bomba su oltre 30 voli, anche per Fiumicino; il ministro Piantedosi ha convocato il Comitato nazionale per l'ordine e la sicurezza pubblica per il 10/11.
Il caso DIA è utile per distinguere una rivendicazione da un fatto accertato.
-->

---

# Il percorso di oggi

<div class="indice">
  <div><span class="n">I</span>Sicurezza informatica</div>
  <div><span class="n">II</span>Crittografia</div>
  <div><span class="n">III</span>Crittografia simmetrica</div>
  <div><span class="n">IV</span>Crittografia asimmetrica</div>
  <div><span class="n">V</span>Funzioni hash</div>
  <div><span class="n">VI</span>Puntatori hash e strutture dati</div>
  <div><span class="n">VII</span>Non ripudio e firma digitale</div>
  <div><span class="n">VIII</span>Marcatura temporale</div>
  <div><span class="n">IX</span>Identità decentralizzate</div>
</div>

<p class="grigio mt-6">Ogni capo si chiude con una verifica rapida. Le note "Per il giurista", nel margine, collegano la tecnica alle norme.</p>

<style>
.indice { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem 1.5rem; margin-top: 1rem; }
.indice div { font-size: 1.15rem; border-bottom: 1px solid var(--linea); padding: 0.4rem 0; }
.indice .n { display: inline-block; width: 2.6rem; font-family: var(--serif); color: var(--rubrica); font-weight: 600; }
</style>
