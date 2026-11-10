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

# Non esistono sistemi sicuri

<SchemaGradoSicurezza />

<v-clicks>

- Più un sistema è complesso, più punti deboli ha: togliere tutto ciò che non serve (*Keep It Simple, Stupid*)
- Un sistema sicuro oggi può non esserlo domani: va aggiornato

</v-clicks>

<!--
Il grado di sicurezza si misura con il tempo necessario per violare il sistema, l'investimento richiesto e la probabilità di successo.
Per il giurista: il diritto non chiede sicurezza assoluta ma misure adeguate al rischio, "tenendo conto dello stato dell'arte e dei costi di attuazione" (art. 32, par. 1, GDPR). Lo stesso approccio è nella NIS2 (d.lgs. 138/2024).
Dal lato di chi sviluppa un protocollo: ogni funzione in più è codice che tutti i nodi devono eseguire per sempre; per questo le proposte di modifica vengono discusse a lungo e molte vengono scartate.
-->

---

# Kerckhoffs: tutto pubblico, tranne la chiave

<div class="grid grid-cols-[1fr_9rem] gap-8">
<div>

<blockquote v-click>"Un sistema crittografico deve essere sicuro anche se tutto, tranne la chiave, è di pubblico dominio." <span class="piccolo">principio di Kerckhoffs (1883), formulazione moderna</span></blockquote>

<SchemaKerckhoffs />

</div>
<figure class="ritratto" v-click>
  <img src="/img/kerckhoffs.jpg" alt="Ritratto di Auguste Kerckhoffs" />
  <figcaption>Auguste Kerckhoffs (1835–1903)</figcaption>
</figure>
</div>

<p class="lead" v-click>È la regola delle blockchain: il codice di Bitcoin, Ethereum e IOTA è pubblico; i fondi li protegge solo la chiave privata.</p>

<!--
È il contrario della "sicurezza tramite segretezza" (security by obscurity). Lo ribadisce il NIST: "System security should not depend on the secrecy of the implementation or its components" (SP 800-123, 2008). Fonte: A. Kerckhoffs, La cryptographie militaire, 1883. La frase sulla slide è la formulazione moderna; l'originale (secondo principio) dice: «Il faut qu'il n'exige pas le secret, et qu'il puisse sans inconvénient tomber entre les mains de l'ennemi».
-->

<style>
.ritratto { margin: 0; text-align: center; }
.ritratto img { width: 100%; border-radius: 4px; filter: grayscale(1); }
.ritratto figcaption { font-size: 0.75rem; color: var(--grigio); margin-top: 0.3rem; }
</style>

---

# L'anello umano: le password

<div class="grid grid-cols-[1fr_1.2fr] gap-10">
<div v-click>

### Le più usate in Italia

<ol class="classifica">
<li>admin</li><li>password</li><li>123456</li><li>Password</li><li>12345678</li><li>123456789</li><li>12345</li><li>Napoli1926</li><li>123stella</li><li>perlanera</li>
</ol>

<p class="fonte">NordPass, edizione 2025 (violazioni pubbliche tra settembre 2024 e settembre 2025).</p>

</div>
<div>

<p class="lead" v-click>Quasi <span class="chiave">un utente su tre</span> usa una delle 10.000 password più comuni.</p>

<p v-click>Un attaccante le prova tutte in una frazione di secondo.</p>

<p class="fonte" v-click>M. Burnett, <em>10,000 Top Passwords</em>, 2011, su 6,5 milioni di credenziali trapelate.</p>

</div>
</div>

<style>
.classifica { columns: 2; font-family: var(--mono); font-size: 1.05rem; }
.classifica li { margin: 0.15rem 0; }
</style>

<!--
Nel mondo la classifica NordPass 2025 è guidata da 123456, admin, 12345678. Burnett: 1,6% tra le 10 più comuni, 4,4% tra le 100, 13,2% tra le 1.000, 30% tra le 10.000.
Componenti di un sistema: hardware, software e persone (humanware); le persone non vanno mai sottovalutate.
Dalla posizione 11 in poi la lista italiana contiene termini volgari: non proiettarla per intero.
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
Per il giurista: la NIS2 chiede ai soggetti essenziali e importanti l'autenticazione a più fattori, se del caso (art. 21, par. 2, lett. j, dir. (UE) 2022/2555; art. 24 d.lgs. 138/2024).
-->

---

# Phishing: la password te la consegnano

<SchemaPhishing />

<p v-click>L'esca non è solo un'email: nel caso Crosetto era una voce al telefono.</p>

<p class="fonte" v-click>Video: una scena di phishing dalla serie <em>Mr. Robot</em>, <a href="https://www.youtube.com/watch?v=JMYEr4Bgey4">youtube.com/watch?v=JMYEr4Bgey4</a></p>

<!--
Una voce al telefono non prova l'identità di nessuno: serve un'autenticazione forte, per esempio con una chiave che solo il titolare possiede (Capo II).
Per il giurista: nel caso Crosetto si indaga per associazione per delinquere finalizzata alla truffa aggravata e sostituzione di persona (artt. 416, 640, 494 c.p.). Fonti: Il Post, 11/2/2025; Corriere della Sera, 13/2/2025.
-->

---

# L'anello più debole

<blockquote v-click>"Security is a chain; it's only as secure as the weakest link." <span class="piccolo">B. Schneier, <em>Secrets and Lies</em>, 2000</span></blockquote>

<SchemaAnelloDebole />

<p class="lead" v-click>Spesso l'anello debole è una persona: le regole vanno pensate per persone vere, sotto pressione.</p>

<!--
Per Schneier le persone sono spesso quell'anello: bellissimi pezzi di matematica resi inutili da cattiva programmazione o dalla password scelta male da qualcuno (prefazione).
Hollnagel: "La variabilità [dell'attività umana] è dunque una forza, anzi una necessità, più che un limite" (The no view of human error). Principio ETTO (Efficiency-Thoroughness Trade-Off): non si può essere insieme massimamente efficienti e massimamente scrupolosi.
Nel mondo cripto: i furti a Binance e a Bybit sono partiti da una persona (un colloquio falso, il computer di uno sviluppatore), non da un difetto della crittografia.
-->
