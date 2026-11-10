---
layout: capo
capo: I
sezione: Sicurezza informatica
---

# Sicurezza informatica

Cosa vogliamo proteggere, da chi, e perché non basta mai

---

# La sicurezza informatica

<p class="lead" v-click>Proteggere le risorse informatiche da accessi, usi, alterazioni o distruzioni non autorizzati.</p>

<SchemaFisicaLogica />

---

# Tre aspetti fondamentali

<div class="tre">
  <div v-click><span class="n">1</span><strong>Non esistono sistemi sicuri</strong></div>
  <div v-click><span class="n">2</span><strong>Sicurezza = conoscenza</strong></div>
  <div v-click><span class="n">3</span><strong>Hardware, software e persone</strong></div>
</div>

<style>
.tre { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-top: 2rem; }
.tre div { border-top: 3px solid var(--rubrica); padding-top: 0.6rem; font-size: 1.25rem; }
.tre .n { display: block; font-family: var(--serif); font-size: 2.4rem; color: var(--rubrica); }
</style>

---

# 1. Non esistono sistemi sicuri

<v-clicks>

- Il software non è mai perfetto; anche i protocolli possono avere errori di progetto
- Il sistema inviolabile è un mito, come il caveau impenetrabile o la nave inaffondabile (il Titanic)

</v-clicks>

<SchemaGradoSicurezza />

<!--
Il grado di sicurezza si misura con il tempo necessario per violare il sistema, l'investimento richiesto e la probabilità di successo.
Per il giurista: il diritto non chiede sicurezza assoluta ma misure adeguate al rischio, "tenendo conto dello stato dell'arte e dei costi di attuazione" (art. 32, par. 1, GDPR). Lo stesso approccio basato sul rischio è nella NIS2 (d.lgs. 138/2024).
-->

---

# 1. Più complesso, più insicuro

<SchemaComplessita />

<p v-click>Regola <strong>KISS</strong>: <em>Keep It Simple, Stupid</em>. Togliere tutto ciò che non serve.</p>

---

# 2. Sicurezza = conoscenza

<v-clicks>

- Nessun sistema sconosciuto può essere considerato sicuro
- Open source o closed source? Fiducia in una **comunità** che può leggere il codice, o in un'**azienda**
- Educare gli utenti è la prima forma di conoscenza

</v-clicks>

---

# 2. Il principio di Kerckhoffs

<div class="grid grid-cols-[1fr_9rem] gap-8">
<div>

<blockquote v-click>"Un sistema crittografico deve essere sicuro anche se tutto, tranne la chiave, è di pubblico dominio."</blockquote>

<SchemaKerckhoffs />

</div>
<figure class="ritratto" v-click>
  <img src="/img/kerckhoffs.jpg" alt="Ritratto di Auguste Kerckhoffs" />
  <figcaption>Auguste Kerckhoffs (1835–1903)</figcaption>
</figure>
</div>

<!--
È il contrario della "sicurezza tramite segretezza" (security by obscurity). Lo ribadisce il NIST: "System security should not depend on the secrecy of the implementation or its components" (SP 800-123, 2008). Fonte: A. Kerckhoffs, La cryptographie militaire, 1883.
-->

<style>
.ritratto { margin: 0; text-align: center; }
.ritratto img { width: 100%; border-radius: 4px; filter: grayscale(1); }
.ritratto figcaption { font-size: 0.75rem; color: var(--grigio); margin-top: 0.3rem; }
</style>

---

# 3. Le componenti di un sistema

<SchemaComponenti />

<p class="lead" v-click>Un sistema sicuro oggi può non esserlo domani.</p>

<!--
I sistemi che non vengono aggiornati diventano fragili: pensate ai frigoriferi dei supermercati di inizio novembre. La componente umana non va mai sottovalutata.
-->

---

# 3. Humanware: le password più usate

<div class="grid grid-cols-2 gap-10">
<div v-click>

### Nel mondo

<ol class="classifica">
<li>123456</li><li>admin</li><li>12345678</li><li>123456789</li><li>12345</li><li>password</li><li>Aa123456</li><li>1234567890</li><li>Pass@123</li><li>admin123</li>
</ol>

</div>
<div v-click>

### In Italia

<ol class="classifica">
<li>admin</li><li>password</li><li>123456</li><li>Password</li><li>12345678</li><li>123456789</li><li>12345</li><li>Napoli1926</li><li>123stella</li><li>perlanera</li>
</ol>

</div>
</div>

<p class="fonte" v-click>NordPass, edizione 2025 (violazioni pubbliche tra settembre 2024 e settembre 2025, 44 Paesi).</p>

<style>
.classifica { columns: 2; font-family: var(--mono); font-size: 1.05rem; }
.classifica li { margin: 0.15rem 0; }
</style>

<!--
La slide del 2024 riportava la classifica SplashData 2018: già allora in testa c'erano 123456 e password.
Dalla posizione 11 in poi la lista italiana contiene termini volgari: non proiettarla per intero. NordPass potrebbe pubblicare l'edizione 2026 a metà novembre.
-->

---

# 3. Humanware: quanto pesano le password comuni

<p class="lead" v-click>Su 6,5 milioni di credenziali trapelate, quanti usano una password "in classifica"?</p>

<div class="barre">
  <div class="riga" v-click><span class="et">tra le 10 più comuni</span><span class="barra" style="width: 5.3%"></span><span class="val">1,6%</span></div>
  <div class="riga" v-click><span class="et">tra le 100 più comuni</span><span class="barra" style="width: 14.7%"></span><span class="val">4,4%</span></div>
  <div class="riga" v-click><span class="et">tra le 1.000 più comuni</span><span class="barra" style="width: 44%"></span><span class="val">13,2%</span></div>
  <div class="riga" v-click><span class="et">tra le 10.000 più comuni</span><span class="barra" style="width: 100%"></span><span class="val">30%</span></div>
</div>

<p class="fonte" v-click>M. Burnett, <em>10,000 Top Passwords</em>, 2011, valori ricalcolati dall'autore.</p>

<style>
.barre { margin-top: 1rem; }
.barre .riga { display: grid; grid-template-columns: 13rem 1fr 4rem; align-items: center; gap: 0.8rem; margin: 0.45rem 0; }
.barre .et { font-size: 1rem; }
.barre .barra { height: 1.3rem; background: var(--rubrica); border-radius: 2px; display: block; }
.barre .val { font-family: var(--serif); font-weight: 600; font-size: 1.15rem; }
</style>

<!--
Quasi un utente su tre usa una password che sta in una lista di 10.000 parole: un attaccante la prova in una frazione di secondo.
Correzione rispetto al 2024: la slide riportava i numeri della prima versione dell'articolo (91% tra le top 1.000), poi ritrattati dall'autore, attribuendoli al 2018.
-->

---

# Proviamo: che password usi?

<div v-click>

<PasswordCheck />

</div>

<p class="piccolo" v-click>Anche i dati personali aiutano: con nome, data di nascita e una password trapelata altrove si indovina in 100 tentativi la password di oltre il 73% degli utenti <span class="fonte">(Wang et al., ACM CCS 2016)</span>.</p>

<div class="sigle">
  <p v-click="2"><strong>ACM CCS</strong>: la conferenza sulla sicurezza informatica dell'Association for Computing Machinery</p>
</div>

<!--
Far provare una password inventata, mai una vera: il calcolo avviene solo nel browser.
Per il giurista: entrare in un account con la password altrui è accesso abusivo a un sistema informatico (art. 615-ter c.p.); procurarsi o diffondere le password altrui è reato a sé (art. 615-quater c.p.).
-->

---

# L'attacco a dizionario

<p class="lead" v-click>Invece di provare tutte le combinazioni, si provano prima le password più diffuse.</p>

<div v-click>

<DictionaryAttack :righe="6" />

</div>

<p v-click><strong>Difese</strong> (NIST, 2025): rifiutare le password comuni o già trapelate, limitare i tentativi, almeno 15 caratteri.</p>

<div class="sigle">
  <p v-click="3"><strong>NIST</strong>: National Institute of Standards and Technology, l'ente federale statunitense che scrive gli standard di sicurezza</p>
</div>

<!--
NIST SP 800-63B-4 (2025), § 3.1.1.2: niente obbligo di simboli né di cambio periodico.
Per il giurista: la NIS2 chiede ai soggetti essenziali e importanti l'autenticazione a più fattori (art. 21, par. 2, lett. j, dir. (UE) 2022/2555; art. 24 d.lgs. 138/2024).
-->

---

# Phishing: la password te la consegnano

<SchemaPhishing />

<p v-click>L'esca non è solo un'email: nel caso Crosetto era una voce al telefono.</p>

<p class="fonte" v-click>Video: una scena di phishing dalla serie <em>Mr. Robot</em>, <a href="https://www.youtube.com/watch?v=JMYEr4Bgey4">youtube.com/watch?v=JMYEr4Bgey4</a></p>

<!--
Una voce al telefono non prova l'identità di nessuno: serve un'autenticazione forte (Capo VII).
Per il giurista: nel caso Crosetto si indaga per associazione per delinquere finalizzata alla truffa aggravata e sostituzione di persona (artt. 416, 640, 494 c.p.). Fonti: Il Post, 11/2/2025; Corriere della Sera, 13/2/2025.
-->

---

# L'anello più debole

<blockquote v-click>"Security is a chain; it's only as secure as the weakest link." <span class="piccolo">B. Schneier, <em>Secrets and Lies</em>, 2000</span></blockquote>

<SchemaAnelloDebole />

<!--
Per Schneier le persone sono spesso quell'anello: bellissimi pezzi di matematica resi inutili da cattiva programmazione, da un sistema operativo scadente o dalla password scelta male da qualcuno (prefazione).
La citazione della slide del 2024 ("People often represent the weakest link…") compare attribuita a Schneier in un articolo di Mc Mahon (2020), ma non è stato possibile verificarla sul libro.
-->

---

# Le persone sono davvero l'anello debole?

<blockquote v-click>"La variabilità [dell'attività umana] è dunque una forza, anzi una necessità, più che un limite." <span class="piccolo">E. Hollnagel (trad.)</span></blockquote>

<SchemaETTO />

<p class="lead" v-click>Le regole di sicurezza vanno pensate per persone vere, sotto pressione.</p>

<!--
Testo originale: "All human activity, individually and/or collectively, is variable in the sense that it is adjusted to the conditions. The variability is therefore a strength, indeed a necessity, rather than a liability." (E. Hollnagel, The no view of human error; il sito originale non è più disponibile, copia archiviata).
Principio ETTO (Efficiency-Thoroughness Trade-Off): non si può essere insieme massimamente efficienti e massimamente scrupolosi.
-->

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<div v-click>
<Quiz
  domanda="Un ransomware cifra i server di un ospedale: le cartelle cliniche non si aprono più. Quale proprietà è violata per prima?"
  :opzioni="['Riservatezza', 'Integrità', 'Disponibilità']"
  :corretta="2"
  spiegazione="I dati ci sono ma non si possono usare: è la disponibilità. Se gli attaccanti li copiano e minacciano di pubblicarli (doppia estorsione) è violata anche la riservatezza."
/>
</div>
<div v-click>
<Quiz
  domanda="Secondo il NIST, cosa rende più sicura una password usata da sola?"
  :opzioni="['Cambiarla ogni 90 giorni', 'Che sia lunga (almeno 15 caratteri) e non compaia tra le password comuni', 'Che contenga per forza un simbolo e una maiuscola']"
  :corretta="1"
  spiegazione="Lunghezza e assenza dalle liste di password note contano più delle regole di composizione (NIST SP 800-63B-4)."
/>
</div>
</div>

<div class="sigle">
  <p v-click="2"><strong>SP</strong>: Special Publication, una delle linee guida tecniche del NIST</p>
</div>
