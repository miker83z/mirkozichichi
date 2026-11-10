---
layout: capo
capo: I
sezione: Sicurezza informatica
---

# Sicurezza informatica

Cosa vogliamo proteggere, da chi, e perché non basta mai

---

# La sicurezza informatica

<p class="lead">La protezione delle risorse informatiche dall'accesso, dall'uso, dall'alterazione o dalla distruzione non autorizzati.</p>

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="demo">

### Sicurezza fisica

protezione dei dispositivi: allarmi, porte blindate, casseforti, controllo degli accessi alla sala server

</div>
<div class="demo">

### Sicurezza logica

protezione delle informazioni con strumenti non fisici: crittografia, firma elettronica, autenticazione, backup

</div>
</div>

---
layout: glossa
---

# Sicurezza informatica: la terminologia

<div class="grid grid-cols-2 gap-x-8 piccolo">
<div>

**Riservatezza** (*confidentiality*)<br>impedire la divulgazione non autorizzata dei dati

**Integrità** (*integrity*)<br>impedire, o almeno rilevare, le modifiche non autorizzate ai dati

**Disponibilità** (*availability*)<br>garantire che dati e servizi siano accessibili quando servono. Minacce: attacchi *Denial of Service* (DoS), ransomware

</div>
<div>

**Autenticazione** (*authentication*)<br>verificare l'identità della controparte e l'origine dei dati: con chi sto comunicando?

**Non ripudio** (*non-repudiation*)<br>impedire che la controparte possa negare una sua azione

</div>
</div>

<p class="fonte mt-4">Correzione rispetto al 2024: "garantire l'autenticità della fonte" non è riservatezza ma autenticazione.</p>

::glossa::

Le stesse parole sono nel GDPR: il titolare deve assicurare "la riservatezza, l'integrità, la disponibilità e la resilienza dei sistemi e dei servizi di trattamento".

- art. 32, par. 1, lett. b), GDPR

---

# Tre aspetti fondamentali

<div class="tre">
  <div><span class="n">1</span><strong>Non esistono sistemi sicuri</strong></div>
  <div><span class="n">2</span><strong>Sicurezza = conoscenza</strong></div>
  <div><span class="n">3</span><strong>Le componenti di un sistema (in)sicuro</strong>: hardware, software, persone</div>
</div>

<style>
.tre { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-top: 2rem; }
.tre div { border-top: 3px solid var(--rubrica); padding-top: 0.6rem; font-size: 1.25rem; }
.tre .n { display: block; font-family: var(--serif); font-size: 2.4rem; color: var(--rubrica); }
</style>

---
layout: glossa
---

# 1. Non esistono sistemi sicuri

- Il software può non essere perfetto, e di solito non lo è
- Possono esserci errori di progettazione anche nei protocolli che usiamo tutti i giorni
- Il mito del sistema inviolabile vale quanto quello del caveau impenetrabile o della nave inaffondabile (il Titanic)

<v-click>

<p class="lead mt-4">Il grado di sicurezza si misura con il tempo necessario per violare il sistema, l'investimento richiesto e la probabilità di successo.</p>

</v-click>

::glossa::

Il diritto non chiede sicurezza assoluta ma misure **adeguate** al rischio, "tenendo conto dello stato dell'arte e dei costi di attuazione".

- art. 32, par. 1, GDPR

Lo stesso approccio basato sul rischio è nella disciplina NIS2 (d.lgs. 138/2024).

---

# 1. Sistemi sicuri: la complessità

<p class="lead">Più un sistema è complesso, più è insicuro.</p>

- Regola **KISS**: *Keep It Simple, Stupid*
- Eliminare la complessità non necessaria: "quello che non c'è non si rompe"
- Ogni funzione in più è una porta in più da sorvegliare

---

# 2. Sicurezza = conoscenza

- Nessun sistema sconosciuto può essere considerato sicuro
- Che cosa implica per il software **open source** e **closed source**, per i sistemi aperti e quelli chiusi?
  - un atto di fiducia verso una **comunità** che può ispezionare il codice, oppure verso un'**azienda**
- L'**educazione degli utenti** è una forma di conoscenza fondamentale: percezione del rischio, pratiche diffuse ma insicure, resistenze ideologiche o semplice abitudine

---

# 2. Il principio di Kerckhoffs

<div class="grid grid-cols-[1fr_11rem] gap-8">
<div>

> "Un sistema crittografico deve essere sicuro anche se ogni suo aspetto, tranne la chiave, è di pubblico dominio."

- È il contrario della "sicurezza tramite segretezza" (*security by obscurity*)
- Lo ribadisce il NIST: "System security should not depend on the secrecy of the implementation or its components"

<p class="lead mt-4">La serratura può essere pubblica; la chiave no.</p>

<p class="fonte">A. Kerckhoffs, <em>La cryptographie militaire</em>, 1883. NIST SP 800-123, <em>Guide to General Server Security</em>, 2008.</p>

</div>
<figure class="ritratto">
  <img src="/img/kerckhoffs.jpg" alt="Ritratto di Auguste Kerckhoffs" />
  <figcaption>Auguste Kerckhoffs (1835–1903)</figcaption>
</figure>
</div>

<style>
.ritratto { margin: 0; text-align: center; }
.ritratto img { width: 100%; border-radius: 4px; filter: grayscale(1); }
.ritratto figcaption { font-size: 0.8rem; color: var(--grigio); margin-top: 0.3rem; }
</style>

---

# 3. Le componenti di un sistema

<div class="grid grid-cols-3 gap-4 mt-2 text-center">
  <div class="demo"><strong>Hardware</strong></div>
  <div class="demo"><strong>Software</strong></div>
  <div class="demo"><strong>Humanware</strong><br><span class="grigio piccolo">le persone</span></div>
</div>

**La sicurezza è un processo**, non un prodotto:

- serve un apporto continuo di lavoro e di formazione
- un sistema considerato sicuro oggi può non esserlo domani
- i sistemi che non vengono aggiornati diventano fragili e insicuri (pensate ai frigoriferi dei supermercati di inizio novembre)

<p class="lead">La componente umana non va mai sottovalutata.</p>

---

# 3. Humanware: le password più usate

<div class="grid grid-cols-2 gap-10">
<div>

### Nel mondo

<ol class="classifica">
<li>123456</li><li>admin</li><li>12345678</li><li>123456789</li><li>12345</li><li>password</li><li>Aa123456</li><li>1234567890</li><li>Pass@123</li><li>admin123</li>
</ol>

</div>
<div>

### In Italia

<ol class="classifica">
<li>admin</li><li>password</li><li>123456</li><li>Password</li><li>12345678</li><li>123456789</li><li>12345</li><li>Napoli1926</li><li>123stella</li><li>perlanera</li>
</ol>

</div>
</div>

<p class="fonte">NordPass, <em>Top 200 most common passwords</em>, edizione 2025 (violazioni pubbliche analizzate tra settembre 2024 e settembre 2025, 44 Paesi). La slide del 2024 riportava la classifica SplashData 2018: allora in testa c'erano già 123456 e password.</p>

<style>
.classifica { columns: 2; font-family: var(--mono); font-size: 1.05rem; }
.classifica li { margin: 0.15rem 0; }
</style>

<!--
Spunto: il calcio entra anche nelle password (Napoli1926). Dalla posizione 11 in poi la lista italiana contiene termini volgari: non proiettarla per intero.
NordPass potrebbe pubblicare l'edizione 2026 a metà novembre: controllare prima della lezione.
-->

---

# 3. Humanware: quanto pesano le password comuni

<p class="lead">Su circa 6,5 milioni di credenziali trapelate, quanti utenti usano una password che sta in cima alla classifica?</p>

<div class="barre">
  <div class="riga"><span class="et">tra le 10 più comuni</span><span class="barra" style="width: 5.3%"></span><span class="val">1,6%</span></div>
  <div class="riga"><span class="et">tra le 100 più comuni</span><span class="barra" style="width: 14.7%"></span><span class="val">4,4%</span></div>
  <div class="riga"><span class="et">tra le 1.000 più comuni</span><span class="barra" style="width: 44%"></span><span class="val">13,2%</span></div>
  <div class="riga"><span class="et">tra le 10.000 più comuni</span><span class="barra" style="width: 100%"></span><span class="val">30%</span></div>
</div>

<p class="mt-4">Quasi un utente su tre si difende con una password che sta in una lista di 10.000 parole: un attaccante la prova in una frazione di secondo.</p>

<p class="fonte">M. Burnett, <em>10,000 Top Passwords</em>, 2011, valori ricalcolati dall'autore. Correzione rispetto al 2024: la slide riportava i numeri della prima versione dell'articolo (91% tra le top 1.000), poi ritrattati, attribuendoli al 2018.</p>

<style>
.barre { margin-top: 1rem; }
.barre .riga { display: grid; grid-template-columns: 13rem 1fr 4rem; align-items: center; gap: 0.8rem; margin: 0.45rem 0; }
.barre .et { font-size: 1rem; }
.barre .barra { height: 1.3rem; background: var(--rubrica); border-radius: 2px; display: block; }
.barre .val { font-family: var(--serif); font-weight: 600; font-size: 1.15rem; }
</style>

---
layout: glossa
---

# Tu che password usi?

<PasswordCheck />

<p class="piccolo mt-2">Anche i dati personali aiutano l'attaccante: con nome, data di nascita e una password trapelata da un altro sito, uno studio ha indovinato in 100 tentativi la password di oltre il 73% degli utenti <span class="fonte">(Wang et al., ACM CCS 2016)</span>.</p>

<!--
Far provare una password inventata, mai una vera: il calcolo avviene solo nel browser.
-->

::glossa::

Entrare in un account con la password altrui è accesso abusivo a un sistema informatico; procurarsi o diffondere le password altrui è reato a sé.

- art. 615-ter c.p.
- art. 615-quater c.p.

---
layout: glossa
---

# L'attacco a dizionario

<p class="lead">Invece di provare tutte le combinazioni, l'attaccante prova prima le password più diffuse.</p>

<DictionaryAttack />

**Le contromisure** raccomandate oggi dal NIST: rifiutare le password presenti nelle liste di quelle comuni o già trapelate; limitare i tentativi falliti; almeno 15 caratteri se la password è l'unico fattore; niente obbligo di simboli né di cambio periodico.

<p class="fonte">NIST SP 800-63B-4 (2025), § 3.1.1.2.</p>

::glossa::

La NIS2 chiede ai soggetti essenziali e importanti, tra le misure minime, l'uso di soluzioni di **autenticazione a più fattori**.

- art. 21, par. 2, lett. j), dir. (UE) 2022/2555; art. 24 d.lgs. 138/2024

---
layout: glossa
---

# Phishing e furto di identità

<p class="lead">Spesso la password non serve indovinarla: basta convincere la vittima a consegnarla, con un messaggio che sembra arrivare da qualcuno di fidato.</p>

- Video: una scena di phishing con attacco a dizionario dalla serie *Mr. Robot*: [youtube.com/watch?v=JMYEr4Bgey4](https://www.youtube.com/watch?v=JMYEr4Bgey4)
- **Febbraio 2025**: truffatori clonano con un software la voce del ministro della Difesa Guido Crosetto e chiamano noti imprenditori chiedendo denaro per un falso riscatto. Uno di loro versa circa **980.000 €** su un conto in Olanda, poi bloccato dalla Procura di Milano

<p class="lead mt-4">Una voce al telefono non prova l'identità di nessuno: serve un'autenticazione forte (Capo VII).</p>

::glossa::

Ipotesi di reato indagate nel caso Crosetto: associazione per delinquere finalizzata alla truffa aggravata e sostituzione di persona.

- artt. 416, 640, 494 c.p.

<p class="fonte">Il Post, 11/2/2025; Corriere della Sera, 13/2/2025.</p>

---

# "L'anello più debole"

<blockquote>
"Security is a chain; it's only as secure as the weakest link."<br>
<span class="piccolo">"La sicurezza è una catena: è sicura solo quanto il suo anello più debole."</span>
</blockquote>

<p class="fonte">B. Schneier, <em>Secrets and Lies: Digital Security in a Networked World</em>, 2000, prefazione.</p>

Per Schneier, le persone sono spesso quell'anello: bellissimi pezzi di matematica resi inutili, scrive, da cattiva programmazione, da un sistema operativo scadente o dalla password scelta male da qualcuno.

<!--
La citazione della slide del 2024 ("People often represent the weakest link in the security chain and are chronically responsible for the failure of security systems") compare attribuita a Schneier (p. 149) in un articolo di Mc Mahon (2020), ma non è stato possibile verificarla sul libro: qui si usa una frase verificata della prefazione.
-->

---

# Gli esseri umani sono davvero l'anello debole?

<blockquote>
"All human activity, individually and/or collectively, is variable in the sense that it is adjusted to the conditions. The variability is therefore a strength, indeed a necessity, rather than a liability."
</blockquote>

<p class="fonte">E. Hollnagel, <em>The no view of human error</em> (copia archiviata: il sito originale non è più disponibile).</p>

**Il principio ETTO** (*Efficiency-Thoroughness Trade-Off*): non si può essere allo stesso tempo massimamente efficienti e massimamente scrupolosi.

- se cresce la pressione sulla **produttività**, cala la scrupolosità
- se cresce la pressione sulla **sicurezza**, cala l'efficienza

<p class="lead mt-3">Le regole di sicurezza vanno progettate per persone vere, sotto pressione.</p>

<!--
Fonte di sintesi: C. Mc Mahon, "In Defence of the Human Factor", Frontiers in Psychology 11:1390 (2020), ripresa da TechRepublic (21/12/2020).
-->

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<Quiz
  domanda="Un ransomware cifra i server di un ospedale, che non riesce più ad accedere alle cartelle cliniche. Quale proprietà è violata per prima?"
  :opzioni="['Riservatezza', 'Integrità', 'Disponibilità']"
  :corretta="2"
  spiegazione="I dati ci sono ma non si possono usare: è la disponibilità. Se gli attaccanti li copiano e minacciano di pubblicarli (doppia estorsione) è violata anche la riservatezza."
/>
<Quiz
  domanda="Secondo il NIST, cosa rende più sicura una password usata come unico fattore?"
  :opzioni="['Cambiarla ogni 90 giorni', 'Che sia lunga (almeno 15 caratteri) e non compaia nelle liste di password comuni', 'Che contenga per forza un simbolo e una maiuscola']"
  :corretta="1"
  spiegazione="La lunghezza e l’assenza dalle liste di password note contano più delle regole di composizione; il cambio periodico obbligatorio è sconsigliato (NIST SP 800-63B-4)."
/>
</div>
