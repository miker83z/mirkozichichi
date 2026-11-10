---
layout: capo
capo: VII
sezione: Non ripudio e firma digitale
---

# Non ripudio e firma digitale

Dalla matematica delle chiavi al valore giuridico della firma

---

# Non ripudio nella sicurezza digitale

<p class="lead" v-click>La prova dell'integrità e dell'origine dei dati, verificabile anche da un terzo.</p>

<SchemaNonRipudio />

<!--
Due ingredienti: integrità (i dati sono esattamente quelli firmati) e autenticazione dell'origine (vengono davvero da chi dice di averli prodotti).
Nel mondo cartaceo: la sottoscrizione autografa, e il disconoscimento della scrittura privata quando qualcuno nega di averla firmata.
-->

---

# L'integrità

<v-clicks>

- L'impronta permette di **accorgersi** di qualunque alterazione
- La verifica la fa il **destinatario**, ricalcolando l'impronta

</v-clicks>

<p class="fonte mt-6" v-click>Correzione rispetto al 2024: l'hash non rende "improbabile" l'alterazione, la rende <strong>rilevabile</strong>.</p>

---

# La verifica dell'origine

<v-clicks>

- **Firma digitale**: prova che il documento è stato firmato con una certa chiave privata
- **Certificato digitale**: dice a chi appartiene quella chiave
- I certificati li emette un'autorità, dentro un'**infrastruttura a chiave pubblica** (PKI)

</v-clicks>

---

# Firma digitale

<v-clicks>

- Il firmatario usa la sua **chiave privata**; chiunque verifica con la **chiave pubblica**
- **Integrità**: il documento non è cambiato dopo la firma
- **Autenticazione**: la firma viene dal titolare della chiave

</v-clicks>

<p class="mt-5" v-click>Non è l'immagine di una firma scansionata: è un calcolo sull'impronta, diverso per ogni documento.</p>

<!--
Lessico: nel diritto italiano "firma digitale" ha un significato più stretto: è un tipo di firma elettronica qualificata (art. 1, lett. s, CAD).
-->

---

# Alice firma un documento per Bob

<SchemaFirma />

---

# Alice firma un documento (alterato) per Bob

<SchemaFirmaAlterata />

<p class="lead" v-click>La firma resta legata a <strong>quel</strong> documento: non si stacca, non sopravvive a una modifica.</p>

---

# Proviamo: firmare e verificare

<div v-click>

<SignatureDemo />

</div>

---

# Certificato digitale

<SchemaCertificato />

---

# Infrastruttura a chiave pubblica (PKI) e X.509

<v-clicks>

- **X.509**: il formato più comune dei certificati (RFC 5280)
- **PKI**: le autorità e le regole che garantiscono a chi appartiene una chiave
- Il lucchetto di **HTTPS**: il browser verifica un certificato X.509 a ogni sito

</v-clicks>

<div class="sigle">
  <p v-click="1"><strong>RFC</strong>: Request for Comments, la serie di documenti che fissa gli standard di Internet</p>
</div>

<!--
Oggi si usa TLS 1.3 (RFC 9846, 2026); il vecchio SSL è obsoleto.
-->

---

# Il certificato firmato dall'autorità di certificazione

<SchemaCertificatoCA />

---

# Dentro un certificato X.509

<SchemaCampiX509 />

<p class="grigio" v-click>Nel browser: clic sul lucchetto accanto all'indirizzo per vedere questi campi su un sito vero.</p>

<div class="sigle">
  <p v-click="1"><strong>CN</strong>, <strong>O</strong>, <strong>C</strong>: nome (Common Name), organizzazione (Organization), Paese (Country); <strong>EC</strong> P-256: chiave su curva ellittica (Elliptic Curve) di 256 bit</p>
</div>

---

# La catena di fiducia X.509

<SchemaGerarchiaCA />

---

# Proviamo: verificare una catena

<div v-click>

<CertChain />

</div>

---

# Un'alternativa: la rete di fiducia (PGP)

<SchemaReteFiducia />

<div class="sigle">
  <p><strong>PGP</strong>: Pretty Good Privacy, il programma di cifratura e firma creato da Phil Zimmermann nel 1991</p>
</div>

<!--
Usata soprattutto per la posta elettronica cifrata (standard OpenPGP, RFC 9580; programmi come GnuPG).
-->

---

# Provate voi: firmare e verificare

<p class="lead" v-click>Lo strumento ufficiale della Commissione europea per le firme eIDAS (DSS).</p>

<v-clicks>

- "Validate a signature": carica un .p7m o un PDF firmato e leggi il rapporto
- "Sign a document": firma in XAdES, CAdES, PAdES o JAdES (serve l'app NexU)

</v-clicks>

<p v-click><a href="https://ec.europa.eu/digital-building-blocks/DSS/webapp-demo/sign-a-document">ec.europa.eu/digital-building-blocks/DSS/webapp-demo</a></p>

<div class="sigle">
  <p v-click="1"><strong>DSS</strong>: Digital Signature Service, il software libero della Commissione europea per creare e verificare firme</p>
  <p v-click="3"><strong>JAdES</strong>: JSON Advanced Electronic Signature, firma avanzata nel formato di dati JSON (JavaScript Object Notation), usato dalle applicazioni web</p>
</div>

<!--
I file caricati vengono trasmessi ai server della Commissione: usate documenti di esempio, mai atti riservati.
-->

---

# eIDAS: il regolamento europeo

<v-clicks>

- **Reg. (UE) 910/2014**: identificazione elettronica e servizi fiduciari
- Regole comuni per firme, sigilli e validazioni temporali in tutta l'UE

</v-clicks>

<blockquote v-click>"Le firme elettroniche qualificate basate su un certificato qualificato rilasciato in uno Stato membro […] sono riconosciute […] in tutti gli altri Stati membri." <span class="piccolo">art. 24 bis, par. 1</span></blockquote>

<!--
L'art. 24 bis sostituisce l'art. 25, par. 3, citato nel 2024 e soppresso da eIDAS 2.
Per il giurista: il regolamento è stato profondamente modificato dal Reg. (UE) 2024/1183 ("eIDAS 2"), in vigore dal 20 maggio 2024, che introduce il portafoglio europeo di identità digitale.
-->

---

# eIDAS 2 e il portafoglio digitale

<v-clicks>

- Ogni Stato deve offrire un **portafoglio digitale** (EUDI Wallet) entro il **24 dicembre 2026**
- Dovrà permettere di **firmare con firma qualificata, gratis**
- In Italia: **IT-Wallet**, nell'app IO

</v-clicks>

<div class="sigle">
  <p v-click="1"><strong>EUDI</strong>: European Digital Identity, l'identità digitale europea</p>
</div>

<!--
Termine: 24 mesi dopo l'entrata in vigore degli atti di esecuzione (art. 5 bis, par. 1). Gli Stati possono limitare la gratuità agli usi non professionali (art. 5 bis, par. 5, lett. g). Sistema IT-Wallet: art. 64-quater CAD.
Oggi "Firma con IO" offre già una firma qualificata gratuita, ma solo per i documenti che un ente chiede di firmare.
-->

---

# eIDAS riconosce tre tipi di firma elettronica

<SchemaLivelliFirma />

---

# 1. Firma elettronica (semplice)

<blockquote v-click>"A una firma elettronica non possono essere negati gli effetti giuridici […] per il solo motivo della sua forma elettronica." <span class="piccolo">art. 25, par. 1, eIDAS</span></blockquote>

<p v-click><strong>Esempi</strong>: il nome in fondo a una email; il clic su "Accetto"; un PIN.</p>

<!--
Per il giurista: in Italia il suo valore come forma scritta e come prova è liberamente valutabile dal giudice, secondo sicurezza, integrità e immodificabilità (art. 20, c. 1-bis, CAD).
-->

---

# 2. Firma elettronica avanzata (FEA)

<SchemaFEA />

<p v-click><strong>Esempi</strong>: XAdES, CAdES, PAdES senza certificato qualificato; la firma grafometrica su tablet in banca.</p>

<!--
Correzione rispetto al 2024: il requisito 4 (art. 26, lett. d) non chiede un documento "a prova di manomissione" ma che ogni modifica successiva sia rilevabile.
Per il giurista: la FEA "italiana" del d.P.C.M. 22 febbraio 2013 (firma grafometrica) vale solo se il sistema rispetta l'art. 56 e solo nei rapporti tra firmatario e chi la offre (art. 60).
-->

---

# FEA: i formati

<p class="lead" v-click>Un servizio pubblico online deve accettare le firme avanzate almeno in questi formati.</p>

<div class="formati">
  <div v-click><strong>XAdES</strong><br><span class="grigio">XML</span></div>
  <div v-click><strong>CAdES</strong><br><span class="grigio">il file .p7m</span></div>
  <div v-click><strong>PAdES</strong><br><span class="grigio">PDF</span></div>
</div>

<p class="fonte mt-4" v-click>Reg. es. (UE) 2026/248, dal 23 febbraio 2027 (aggiunge JAdES e ASiC); abroga la Decisione 2015/1506 citata nel 2024.</p>

<style>
.formati { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; text-align: center; }
.formati div { border: 1.5px solid var(--inchiostro); border-radius: 6px; padding: 0.8rem; font-size: 1.3rem; }
</style>

<div class="sigle">
  <p v-click="2"><strong>XML</strong>: eXtensible Markup Language, un formato di testo strutturato, leggibile da persone e programmi</p>
  <p v-click="5"><strong>ASiC</strong>: Associated Signature Containers, un contenitore (come un file .zip) che tiene insieme documenti e firme</p>
</div>

<!--
Correzione rispetto al 2024: questi atti non dicono quali formati una FEA "deve avere" (una FEA è tale per i requisiti dell'art. 26), ma quali formati la PA deve accettare.
-->

---

# ETSI

<p class="lead" v-click>European Telecommunications Standards Institute: l'ente europeo di normazione che scrive gli standard tecnici di eIDAS.</p>

<v-clicks>

- Il regolamento dice **cosa** deve garantire una firma
- Le norme ETSI dicono **come**: formati, certificati, prestatori

</v-clicks>

---

# XAdES: XML Advanced Electronic Signature

<SchemaXades />

<p v-click>Firma in XML, leggibile da persone e programmi: comoda per l'elaborazione automatica e per più firmatari.</p>

<!--
Correzione rispetto al 2024: le modalità sono tre (interna, avvolgente, distaccata), non due.
-->

---

# CAdES: CMS Advanced Electronic Signature

<SchemaCades />

<div class="sigle">
  <p><strong>CMS</strong>: Cryptographic Message Syntax, il formato della «busta» che contiene documento e firma</p>
</div>

<!--
Correzione rispetto al 2024: CAdES non è limitato ai "dati binari" e consente la firma di più soggetti (firme parallele e controfirme); per più documenti insieme si usa ASiC-E. .p7m = dati dentro la busta; .p7s = firma separata.
Per il giurista: nel processo civile telematico gli atti possono essere in CAdES o in PAdES: le Sezioni Unite li hanno ritenuti equivalenti (Cass., S.U., 27 aprile 2018, n. 10266). Nel processo amministrativo telematico è ammesso solo PAdES.
-->

---

# PAdES: PDF Advanced Electronic Signature

<SchemaPades />

<!--
Correzione rispetto al 2024: la verifica di una firma PAdES è automatica come per gli altri formati; le firme multiple sono in sequenza, non in parallelo.
-->

---

# 3. Firma elettronica qualificata (FEQ)

<SchemaQES />

<div class="sigle">
  <p v-click="2"><strong>QSCD</strong>: Qualified Signature Creation Device, il dispositivo per la creazione di una firma qualificata</p>
  <p v-click="2"><strong>HSM</strong>: Hardware Security Module, l'apparato protetto in cui il prestatore custodisce le chiavi</p>
</div>

<!--
Una firma avanzata con certificato qualificato (rilasciato da un prestatore qualificato, QTSP) e dispositivo qualificato (QSCD). Ha gli stessi effetti giuridici della firma autografa (art. 25, par. 2, eIDAS).
Firma remota: il dispositivo qualificato è un HSM presso il prestatore; la password monouso sullo smartphone serve solo ad autorizzare la firma (art. 29 bis eIDAS).
Per il giurista: in Italia la firma digitale è un tipo particolare di firma qualificata, basata su chiavi pubblica e privata (art. 1, lett. s, CAD). I prestatori qualificati sono nell'elenco di fiducia europeo (EU Trusted List).
-->

---

# Le firme nel diritto italiano

<table>
<thead><tr><th>Firma</th><th>Forma scritta ed efficacia probatoria</th></tr></thead>
<tbody>
<tr v-click><td><strong>Semplice</strong></td><td>valutate liberamente dal giudice</td></tr>
<tr v-click><td><strong>Avanzata</strong></td><td>efficacia della scrittura privata (art. 2702 c.c.)</td></tr>
<tr v-click><td><strong>Qualificata / digitale</strong></td><td>come sopra, e l'uso del dispositivo <strong>si presume</strong> del titolare</td></tr>
</tbody>
</table>

<p class="mt-5" v-click>Per i trasferimenti di immobili e gli altri atti dell'art. 1350, nn. 1–12, c.c.: solo firma <strong>qualificata o digitale</strong>, a pena di nullità.</p>

<!--
Riferimenti: art. 20, c. 1-bis e 1-ter, CAD; art. 21, c. 2-bis, CAD; art. 24, c. 4-bis, CAD (certificato scaduto, revocato o sospeso = mancata sottoscrizione); artt. 1350 e 2702 c.c.
-->

---

# Che firma è?

<div v-click>

<Classifica
  :categorie="['Semplice', 'Avanzata', 'Qualificata']"
  :casi="[
    { testo: 'Scrivo «Avv. Mario Rossi» in fondo a una email', giusta: 'Semplice', spiegazione: 'Dati elettronici usati per firmare, ma senza i requisiti dell’art. 26 eIDAS.' },
    { testo: 'Clicco «Accetto» sulle condizioni di un sito', giusta: 'Semplice', spiegazione: 'Manifesta una volontà, ma non identifica in modo affidabile chi ha cliccato.' },
    { testo: 'Firmo su un tablet in banca, con la penna elettronica', giusta: 'Avanzata', spiegazione: 'La firma grafometrica è una FEA se il sistema rispetta le regole tecniche (art. 56 d.P.C.M. 22/2/2013); vale nei rapporti con la banca.' },
    { testo: 'Firmo un atto con la smart card e ottengo un file .p7m', giusta: 'Qualificata', spiegazione: 'Firma digitale: certificato qualificato e dispositivo sicuro (la smart card).' },
    { testo: 'Firmo da remoto con un codice OTP inviato sul telefono dal prestatore qualificato', giusta: 'Qualificata', spiegazione: 'Firma remota: la chiave è custodita in un dispositivo qualificato del prestatore.' },
    { testo: 'Incollo nel PDF l’immagine scansionata della mia firma', giusta: 'Semplice', spiegazione: 'Un’immagine si copia e si incolla: nessun legame con il contenuto del documento.' }
  ]"
/>

</div>

<div class="sigle">
  <p v-click="1"><strong>OTP</strong>: One-Time Password, password monouso (tra poche slide)</p>
</div>

---

# Password monouso e verifica in due passaggi

<SchemaDuePassaggi />

<p v-click>Due fattori di categorie diverse: <strong>qualcosa che sai</strong>, <strong>che hai</strong>, <strong>che sei</strong>.</p>

<!--
Per il giurista: è l'"autenticazione forte del cliente" della PSD2: due o più elementi di conoscenza, possesso e inerenza, indipendenti tra loro, obbligatoria per accedere al conto online e per i pagamenti elettronici (artt. 4, n. 30, e 97, dir. (UE) 2015/2366). Anche lo SPID di livello 2 chiede password più un secondo fattore.
-->

---

# Il codice che cambia ogni 30 secondi

<SchemaTotp />

<div class="sigle">
  <p v-click="3"><strong>HMAC</strong>: Hash-based Message Authentication Code, un codice di autenticazione (MAC) calcolato con una funzione hash e una chiave segreta</p>
</div>

<!--
Standard TOTP (RFC 6238), basato su HOTP (RFC 4226): non è una sfida-risposta, la "sfida" è l'ora corrente. È lo standard delle app di autenticazione e di molti token bancari.
-->

---

# Proviamo: il codice sul telefono

<div v-click>

<Totp />

</div>

---

# Password monouso: sfida e risposta

<SchemaSfidaRisposta />

<p class="lead" v-click>La risposta vale solo per quella sfida, e la sfida cambia ogni volta: registrarla non serve.</p>

---

# Sfida e risposta con crittografia simmetrica

<SchemaSfidaRisposta modo="simmetrica" />

<!--
Alice e il Servizio condividono una chiave segreta K. Alice risponde cifrando la sfida con K; il Servizio decifra e confronta. Il limite: anche il Servizio custodisce K, e se gliela rubano l'attaccante può fingersi Alice.
-->

---

# Sfida e risposta con crittografia asimmetrica

<SchemaSfidaRisposta modo="asimmetrica" />

<p v-click>È il meccanismo delle <strong>passkey</strong>, che stanno sostituendo le password.</p>

<!--
Il server conserva solo chiavi pubbliche, inutili a chi le ruba, e la firma è legata al sito vero: il phishing non funziona. Standard W3C Web Authentication Level 3, Raccomandazione del 25 agosto 2026.
-->

---

# Proviamo: accedere con una passkey

<div v-click>

<ChallengeResponse modo="asimmetrica" />

</div>

<div class="sigle">
  <p v-click="1"><strong>FIDO2</strong>: lo standard delle passkey dell'alleanza FIDO (Fast IDentity Online); <strong>WebAuthn</strong> (Web Authentication) ne è la parte per i browser</p>
</div>

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<div v-click>
<Quiz
  domanda="Un contratto di compravendita di un immobile, stipulato come documento informatico, quale firma richiede a pena di nullità?"
  :opzioni="['Basta una firma semplice', 'Una firma avanzata', 'Una firma qualificata o digitale']"
  :corretta="2"
  spiegazione="Per le scritture dell’art. 1350, nn. 1–12, c.c. l’art. 21, c. 2-bis, CAD richiede la firma qualificata o digitale (salvo sottoscrizione autenticata)."
/>
</div>
<div v-click>
<Quiz
  domanda="Perché un codice OTP rubato ieri non permette di entrare oggi?"
  :opzioni="['Perché è cifrato', 'Perché dipende dall’ora o da una sfida che nel frattempo è cambiata', 'Perché la banca lo cancella']"
  :corretta="1"
  spiegazione="Il codice è calcolato dall’ora corrente (TOTP) o da una sfida nuova: vale una sola volta e per poco tempo."
/>
</div>
</div>

<div class="sigle">
  <p v-click="1"><strong>CAD</strong>: Codice dell'amministrazione digitale, d.lgs. 82/2005</p>
  <p v-click="2"><strong>TOTP</strong>: Time-based One-Time Password, il codice monouso calcolato dall'ora</p>
</div>
