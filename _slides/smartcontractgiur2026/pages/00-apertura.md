---
layout: copertina
---

# Blockchain &<br>Smart Contracts

<p class="corso">Sem. Blockchain e Smart Contract: aspetti giuridici e tecnologici · Università di Bologna, novembre 2026</p>

::pillola::

Mirko Zichichi

[mirko.zichichi@iota.org](mailto:mirko.zichichi@iota.org)

---

# Chi sono

<p class="lead" v-click>Mirko Zichichi, <a href="https://mirkozichichi.me">mirkozichichi.me</a>: Engineering Team Lead alla IOTA Foundation, dottorato in Law, Science and Technology.</p>

<SchemaOpenSource />

<!--
Attivazione delle versioni (verifica/D, codice di iotaledger/iota): i validatori segnalano le versioni che supportano; al cambio di epoca la rete passa alla nuova se la supporta l'83,34% del potere di voto (quorum di 2/3 più metà del terzo restante). La versione 39 si è attivata il 5/11/2026 alle 07:42 UTC (epoca 549). Chi non aggiorna esce dal comitato e perde le ricompense. La IOTA Foundation (IOTA Stiftung) è una fondazione di diritto tedesco con sede a Berlino.
-->

---

# L'Italia nel mirino: i numeri

<SchemaCrescitaAttacchi />

<p v-click>E il 2026? Nei primi nove mesi il CSIRT Italia dell'ACN ha gestito più eventi che in tutto il 2025 (2.729, di cui 615 incidenti).</p>

<p class="fonte" v-click>Rapporto Clusit 2026 (17 marzo 2026); Relazione annuale ACN 2025; Operational Summary ACN 2026.</p>

<div class="sigle">
  <p v-click="1"><strong>Clusit</strong>: Associazione italiana per la sicurezza informatica</p>
  <p v-click="3"><strong>ACN</strong>: Agenzia per la cybersicurezza nazionale; <strong>CSIRT</strong> (Computer Security Incident Response Team): la sua squadra di risposta agli incidenti</p>
</div>

<!--
Come leggere i numeri: Clusit conta gli incidenti gravi resi noti da fonti aperte; l'ACN quelli segnalati al CSIRT. Misurano cose diverse.
Gran parte della crescita italiana del 2025 viene dall'hacktivism (196 incidenti): senza, l'aumento sarebbe del 12%, non del 42%. Nel mondo: 5.265 incidenti gravi (+48,7%), il massimo mai registrato; l'Italia ne conta il 9,6%.
Dal 2026 gli obblighi di notifica NIS2 fanno crescere anche le segnalazioni.
-->

---

# Le cinque proprietà, con i fatti di quest'anno

<div class="proprieta-esempi">
  <div v-click><span class="nome">Riservatezza</span><span class="cosa">solo chi è autorizzato legge</span><span class="es">uno spyware legge le chat di un giornalista</span></div>
  <div v-click><span class="nome">Integrità</span><span class="cosa">nessuno modifica senza permesso</span><span class="es">qualcuno cambia da remoto la temperatura dei frigoriferi</span></div>
  <div v-click><span class="nome">Disponibilità</span><span class="cosa">il servizio c'è quando serve</span><span class="es">il sito della Farnesina sommerso di richieste</span></div>
  <div v-click><span class="nome">Autenticità</span><span class="cosa">sai con chi stai parlando</span><span class="es">la voce clonata di un ministro chiede soldi</span></div>
  <div v-click><span class="nome">Non ripudio</span><span class="cosa">chi ha firmato non può negarlo</span><span class="es">un bonifico firmato con la tua chiave è tuo: non puoi dire «non sono stato io»</span></div>
</div>

<p class="lead mt-4" v-click>Le prime quattro le vediamo violate nelle notizie; la quinta è quella su cui si regge una blockchain.</p>

<style>
.proprieta-esempi { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.6rem; }
.proprieta-esempi div { display: flex; flex-direction: column; gap: 0.3rem; border-top: 3px solid var(--rubrica); background: var(--campo); padding: 0.5rem 0.6rem 0.7rem; }
.proprieta-esempi .nome { font-family: var(--titoli); font-weight: 700; font-size: 1rem; }
.proprieta-esempi .cosa { font-size: 0.85rem; color: var(--grigio); }
.proprieta-esempi .es { font-size: 0.95rem; }
</style>

<!--
Per il giurista: le stesse parole sono nel GDPR: il titolare deve assicurare "la riservatezza, l'integrità, la disponibilità e la resilienza dei sistemi e dei servizi di trattamento" (art. 32, par. 1, lett. b).
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

# Frigoriferi: perché ha funzionato

<v-clicks>

- Colpiti almeno 4 Coop del Gruppo Radenza e alcuni Decò; casi anche in Toscana e in provincia di Trento
- In Francia, a ottobre, circa 700 supermercati: impianti vecchi, console raggiungibili da Internet, password deboli

</v-clicks>

<SchemaAttacco chi="ignoti\n(rivendicazione\ncontestata)" come="console online,\nvecchia e mal\nprotetta (ipotesi)" cosa="le impostazioni:\ntemperature,\nsbrinamenti" proprieta="integrità,\npoi disponibilità" difesa="console offline,\npassword nuove,\naggiornamenti" />

<p class="lead" v-click>Un dato alterato diventa un danno fisico. Ogni apparecchio connesso fa parte del sistema: se nessuno lo aggiorna, diventa la porta d'ingresso.</p>

<p class="fonte" v-click>Il Post, 3 e 6 novembre 2026; Cybersecurity360 sul bollettino ACN.</p>

<!--
Lo schema è la stessa griglia per tutti i casi di oggi: chi attacca, come (il vettore), che cosa colpisce, quale proprietà viola, come ci si difende. Per un giurista: autore, condotta, oggetto, evento; e in più il rimedio tecnico.
Il vettore dei casi italiani non è confermato. In Francia il meccanismo era: impianti obsoleti, interfacce esposte su Internet, autenticazione debole. Si è parlato di una vulnerabilità dei controllori Danfoss, ma le grandi catene italiane dicono di non usarli.
Le sei verifiche urgenti chieste dall'ACN (bollettino del 13/10, v1.1 del 3/11): censire gli apparati; togliere da Internet le funzioni di amministrazione e separare le reti; teleassistenza solo con accessi controllati e autenticazione a più fattori; eliminare gli account inutili e le password predefinite; confrontare temperature e allarmi con le configurazioni approvate; aggiornare il firmware e sostituire gli apparati fuori supporto.
-->

---

# Un anno di attacchi: proviamo a classificarli

<p class="lead" v-click>Per ogni notizia: quale proprietà della sicurezza è stata violata? Cliccate su una scheda.</p>

<div v-click>

<NewsWall />

</div>

<!--
Altri fatti della settimana 2-9 novembre 2026 (Il Post, 9/11): attacco alla società della galleria di base del Brennero (BBT SE, metà ottobre, reso noto il 7/11); dati personali del ministro Tajani pubblicati sul dark web (sua dichiarazione del 7/11); falsi allarmi bomba su oltre 30 voli, anche per Fiumicino; il ministro Piantedosi ha convocato il Comitato nazionale per l'ordine e la sicurezza pubblica per il 10/11.
Una rivendicazione non è un fatto accertato: quella dei frigoriferi è contestata. Nel 2026 anche il caso dei presunti file della DIA in vendita sul dark web (9/11) si è rivelato, per gli inquirenti, solo dati già pubblici.
Nelle prossime slide: un caso per scheda, con la stessa griglia dei frigoriferi.
Per il giurista: art. 615-ter c.p. (accesso abusivo); L. 90/2024; d.lgs. 138/2024 (NIS2), notifica al CSIRT entro 24 ore; art. 33 GDPR, notifica al Garante entro 72 ore.
-->

---

# 8 ottobre 2026: il sito della Farnesina

<v-clicks>

- Il sito del ministero degli Esteri riceve un'ondata di richieste: le difese la respingono «senza provocare disservizi»
- Arriva dopo dure parole di Mosca contro il ministro Tajani; la stampa lo attribuisce a NoName057(16)

</v-clicks>

<SchemaAttacco chi="attribuito dalla\nstampa a\nNoName057(16)" come="DDoS: un'ondata\ndi richieste da\nmolti computer" cosa="il sito web\ndel ministero" proprieta="disponibilità" difesa="filtri del traffico\ne capacità\ndi riserva" />

<p class="lead" v-click>Un <strong>DDoS</strong> (<em>Distributed Denial of Service</em>) non entra nei sistemi e non ruba dati: li rende irraggiungibili. Non lo ferma la crittografia, ma la capacità di assorbirlo.</p>

<p class="fonte" v-click>Open, 8 ottobre 2026.</p>

<!--
La nota della Farnesina: «Da questa mattina il sito del ministero degli Affari Esteri è oggetto di un attacco informatico, che finora è stato efficacemente mitigato dai sistemi di protezione, senza provocare disservizi». Gestito con il Polo Strategico Nazionale, con verifiche anche sui siti delle sedi all'estero.
L'attribuzione a NoName057(16) è della stampa, non ufficiale. Il gruppo recluta volontari che prestano il proprio computer agli attacchi.
Per il giurista: per il d.lgs. 138/2024 (NIS2) gli incidenti significativi vanno pre-notificati al CSIRT Italia entro 24 ore (art. 25). La Procura di Roma attendeva un'informativa della Polizia Postale.
-->

---

# Milano-Cortina, febbraio 2026: gli attacchi ai Giochi

<v-clicks>

- Alla vigilia dei Giochi il governo dichiara sventati attacchi di «origine russa» a sedi diplomatiche all'estero e a siti delle Olimpiadi, tra cui hotel di Cortina
- NoName057(16) rivendica: «support for Ukrainian terrorists is punished with our DDoS attacks»

</v-clicks>

<SchemaAttacco chi="hacktivisti\nfilorussi:\nNoName057(16)" come="DDoS contro\ncirca 120 siti" cosa="consolati, hotel,\nsiti dei Giochi" proprieta="disponibilità" difesa="piani preparati\nprima dei Giochi,\nfiltri sul traffico" />

<p v-click><strong>Hacktivism</strong>: attacchi per una causa politica, che cercano visibilità più che denaro. In Italia, nel 2025, 196 incidenti gravi su 507 (Clusit).</p>

<p class="lead" v-click>Attribuire un attacco è difficile: né la dichiarazione di un governo né una rivendicazione sono prove tecniche.</p>

<!--
Il 4 febbraio 2026 Tajani ha parlato di attacchi «a partire da Washington» contro le sedi della Farnesina all'estero e contro siti legati ai Giochi. France 24: circa 120 obiettivi, tra cui consolati a Sydney, Toronto e Parigi, senza disservizi significativi.
Cautela su "sventati": NoName di solito pubblica la lista dei bersagli prima degli attacchi (Cybersecurity360).
Il dato sull'hacktivism è del Rapporto Clusit 2026 (slide dei numeri): i 196 casi italiani sono il 64% di quelli censiti nel mondo.
Fonti: The Record, 5/2/2026; Cybersecurity360.
-->

---

# Paragon: lo spyware nel telefono

<v-clicks>

- Marzo 2026: le procure di Roma e Napoli trovano tracce di malware su tre telefoni: gli attivisti Luca Casarini e Giuseppe Caccia e il giornalista Francesco Cancellato (Fanpage)
- Per Casarini e Caccia le operazioni risultano dell'intelligence italiana; per Cancellato no: chi lo ha spiato resta ignoto

</v-clicks>

<SchemaAttacco chi="ignoto, nel caso\ndel giornalista" come="spyware Graphite\ndi Paragon:\nentra di nascosto" cosa="il telefono\ne tutto ciò\nche contiene" proprieta="riservatezza\ne integrità" difesa="aggiornare il\ntelefono; analisi\nforense" />

<p class="lead" v-click>La cifratura <em>end-to-end</em> protegge il messaggio in viaggio, non il telefono: chi controlla il dispositivo legge prima che il messaggio sia cifrato.</p>

<p class="fonte" v-click>Nota congiunta delle procure, 5 marzo 2026; Internazionale, 12 marzo 2026.</p>

<!--
Le procure procedono contro ignoti per accesso abusivo a sistema informatico (art. 615-ter c.p.) e intercettazione illecita, con il coordinamento della Direzione nazionale antimafia e antiterrorismo. Dalla nota: tracce di malware «esclusivamente su tre dispositivi Android». La compromissione risale alla notte del 14 dicembre 2024.
Un accesso presso l'AISI (art. 256-bis c.p.p.) ha trovato sul server Graphite le operazioni su Casarini e Caccia, autorizzate secondo il Copasir (relazione del 4/6/2025); nessuna traccia su Cancellato.
Il canale può essere cifrato benissimo: se è compromesso uno dei due estremi, la crittografia non aiuta. Lo stesso vale per un wallet di criptovalute su un telefono infetto.
-->

---

# La voce clonata del ministro Crosetto

<v-clicks>

- Febbraio 2025: truffatori si fingono lo staff del ministro della Difesa e, almeno una volta, Crosetto stesso, con la voce riprodotta da un software
- Chiedono a imprenditori soldi per un falso riscatto di giornalisti rapiti: Massimo Moratti versa circa 980.000 € su un conto olandese, poi bloccati dalla Procura di Milano

</v-clicks>

<SchemaAttacco chi="truffatori\n(indagine della\nProcura di Milano)" come="ingegneria sociale\ne voce clonata\ncon un software" cosa="la fiducia di\nimprenditori noti" proprieta="autenticità" difesa="verificare su un\naltro canale: un\nnumero già noto" />

<p v-click>Autorità e urgenza (un ministro, un rapimento) sono le leve classiche dell'ingegneria sociale: spingono a saltare i controlli.</p>

<p class="lead" v-click>Una voce o un numero di telefono non provano l'identità: si imitano. Serve qualcosa che l'impostore non può copiare, come una chiave (Capo II).</p>

<!--
Il denaro è stato bloccato il 12/2/2025 sul conto olandese, più una piccola parte trasferita su un altro conto, grazie al congelamento rapido tra banche centrali. Una restituzione effettiva a Moratti non è verificata: le fonti parlano di blocco.
Per il giurista: si indaga per associazione per delinquere finalizzata alla truffa aggravata e per sostituzione di persona (artt. 416, 640, 494 c.p.).
Fonti: Il Post, 11/2/2025; Corriere della Sera, 13/2/2025.
-->

---

# Binance, 29 ottobre 2026: il furto più grande

<v-clicks>

- In circa quattro ore escono dagli *hot wallet* del più grande exchange di criptovalute circa 6,3 miliardi di dollari
- Era cominciato a settembre: un ingegnere, contattato su un sito di annunci, scarica il «compito» di un falso colloquio, con un malware che l'antivirus non riconosce
- Per l'FBI è stata la Corea del Nord, che smentisce; 2,85 miliardi sono stati congelati, il resto Binance lo copre con fondi propri

</v-clicks>

<SchemaAttacco chi="Corea del Nord\nsecondo l'FBI\n(Pyongyang nega)" come="falso colloquio\ndi lavoro, malware,\ncredenziali rubate" cosa="gli hot wallet,\nsempre online" proprieta="riservatezza,\npoi integrità" difesa="meno privilegi,\npiù controlli,\nfondi offline" />

<p class="lead" v-click>Anche qui l'anello debole è una persona (Capo I). E chi controlla chiavi e permessi di un wallet ne controlla i fondi: lo riprendiamo nel Capo V.</p>

<p class="fonte" v-click>Il Post, 3 novembre 2026; CoinDesk, 3 novembre 2026; FBI, 31 ottobre 2026.</p>

<div class="sigle">
  <p v-click="3"><strong>FBI</strong>: Federal Bureau of Investigation, la polizia federale statunitense</p>
</div>

<!--
Il racconto di Binance (conferenza stampa del 3/11): a giugno un ingegnere installa un pacchetto software manomesso; il computer viene sostituito, ma gli aggressori sanno già chi lavora ai wallet. A settembre un altro ingegnere viene contattato su una piattaforma di annunci da un falso responsabile di progetto; due colloqui in video con falsi addetti del personale e un falso amministratore delegato; il «compito» da svolgere contiene un malware mai visto prima (zero-day) che elude i controlli. Il 20 ottobre, attraverso uno strumento interno di intelligenza artificiale, raggiungono i computer di due ingegneri dei wallet. Il 29 ottobre, con le credenziali rubate, eseguono un programma che ottiene i permessi su un hot wallet: i fondi escono dalle 20:05 UTC, il contenimento arriva alle 00:10 del 30 ottobre.
Hot wallet: sempre connesso, per pagare i prelievi in tempo reale; il cold wallet è offline. È il compromesso tra disponibilità e sicurezza.
Il furto supera di quattro volte il record precedente (Bybit, 1,5 miliardi, 2025). L'FBI (31/10) attribuisce l'attacco alla Corea del Nord; secondo TRM Labs è il gruppo TraderTraitor. Kim Yo Jong ha smentito il 3/11. Binance dice di aver bloccato nel 2026 altri 57 tentativi simili.
Per il giurista: nel diritto UE chi custodisce cripto-attività per conto dei clienti risponde della loro perdita per un incidente a lui imputabile, nel limite del valore di mercato (Reg. (UE) 2023/1114, MiCA, art. 75, par. 8).
-->

---

# Sei notizie, cinque proprietà

<SchemaNotizie />

---

# Il percorso di oggi

<div class="indice">
  <div v-click><span class="n">I</span>Sicurezza informatica</div>
  <div v-click><span class="n">II</span>Concetti di base: hash e firma</div>
  <div v-click><span class="n">III</span>Sistemi distribuiti e blockchain</div>
  <div v-click><span class="n">IV</span>Creare una transazione</div>
  <div v-click><span class="n">V</span>Smart contract</div>
  <div v-click><span class="n">VI</span>Tokenomics e monete digitali</div>
</div>

<style>
.indice { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.9rem 1.5rem; margin-top: 1.2rem; }
.indice div { font-size: 1.15rem; border-bottom: 1px solid var(--linea); padding: 0.5rem 0; }
.indice .n { display: inline-block; width: 2.6rem; font-family: var(--titoli); color: var(--acqua); font-weight: 700; }
</style>
