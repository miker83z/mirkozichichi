---
layout: capo
capo: VII
sezione: Non ripudio e firma digitale
---

# Non ripudio e firma digitale

Dalla matematica delle chiavi al valore giuridico della firma

---

# Non ripudio nella sicurezza digitale

<p class="lead">Un servizio che fornisce la prova dell'integrità e dell'origine dei dati, verificabile anche da un terzo (per esempio un giudice): chi ha firmato non può negare di averlo fatto.</p>

Due ingredienti:

1. **Integrità**: i dati sono esattamente quelli firmati
2. **Autenticazione dell'origine**: i dati provengono davvero da chi dice di averli prodotti

<v-click>

<p class="mt-6">Nel mondo cartaceo: la sottoscrizione autografa, e il disconoscimento della scrittura privata quando qualcuno nega di averla firmata.</p>

</v-click>

---

# L'integrità

- L'**impronta** (hash) dei dati permette di **accorgersi**, con probabilità altissima, di qualunque alterazione
- L'integrità va **verificata dal destinatario**: è lui che ricalcola l'impronta e la confronta

<p class="fonte mt-6">Correzione rispetto al 2024: l'hash non rende "improbabile" l'alterazione, la rende <strong>rilevabile</strong>. Chiunque può modificare un file; l'impronta dice se è successo.</p>

---

# La verifica dell'origine

<p class="lead">Il metodo più comune per verificare l'origine dei dati è la firma digitale, accompagnata da un certificato digitale.</p>

- **Firma digitale**: prova che il documento è stato firmato con una certa chiave privata
- **Certificato digitale**: dice a chi appartiene quella chiave
- I certificati sono emessi da un'autorità di certificazione all'interno di un'**infrastruttura a chiave pubblica** (PKI), da cui dipende la firma digitale

---

# Firma digitale

<p class="lead">Uno schema per verificare l'autenticità dei documenti digitali, basato sulla crittografia asimmetrica.</p>

- Il firmatario usa la sua **chiave privata**; chiunque verifica con la sua **chiave pubblica**
- **Integrità**: garantisce che il documento non sia stato alterato dopo la firma (grazie all'impronta)
- **Autenticazione**: una firma valida dà al destinatario un motivo molto forte per credere che il documento sia stato creato dal titolare della chiave

<v-click>

<p class="mt-5">Attenzione al lessico: la firma digitale non è l'immagine di una firma scansionata, ma un calcolo sull'impronta del documento, diverso per ogni documento. E nel diritto italiano "firma digitale" ha un significato più stretto: è un tipo di firma elettronica qualificata (art. 1, lett. s, CAD).</p>

</v-click>

---

# Alice firma un documento per Bob

<SignatureDemo />

<!--
Passi: Alice calcola l'impronta, la firma con la sua chiave privata, invia documento + firma. Bob ricalcola l'impronta e verifica la firma con la chiave pubblica di Alice.
Poi far modificare una parola nel documento ricevuto: la verifica fallisce.
-->

---

# Se il documento viene alterato

<div class="due-casi">
<div class="caso">

### Documento originale

impronta calcolata da Bob<br><code>c7a1…09e4</code><br>
impronta firmata da Alice<br><code>c7a1…09e4</code>

<p class="esito-ok">✓ coincidono: firma valida</p>

</div>
<div class="caso ko">

### Documento modificato

impronta calcolata da Bob<br><code>5f3d…a812</code><br>
impronta firmata da Alice<br><code>c7a1…09e4</code>

<p class="esito-ko">✗ diverse: firma non valida</p>

</div>
</div>

<p class="mt-5">La firma resta legata a <strong>quel</strong> documento: non si può "staccare" e incollare su un altro, né sopravvive a una modifica.</p>

<style>
.due-casi { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem; }
.caso { border: 1.5px solid var(--ok); border-radius: 6px; padding: 0.8rem 1.2rem; line-height: 1.7; }
.caso.ko { border-color: var(--ko); }
.caso code { font-size: 1rem; }
</style>

---

# Certificato digitale

<p class="lead">Un documento elettronico che attesta l'associazione univoca tra una chiave pubblica e l'identità di una persona.</p>

<div class="certificato">
  <p class="titolo-cert">Certificato digitale</p>
  <dl>
    <dt>Nome</dt><dd>Alice Rossi</dd>
    <dt>Indirizzo</dt><dd>via Galliera 3, Bologna</dd>
    <dt>Email</dt><dd>alice@studio-legale-esempio.it</dd>
    <dt>Chiave pubblica</dt><dd><code>04a9f2…7c1e</code></dd>
  </dl>
</div>

<p class="mt-4">Ma chi garantisce che il certificato dica il vero? Qualcuno di fidato deve firmarlo.</p>

<style>
.certificato { border: 1.5px solid var(--inchiostro); border-radius: 6px; padding: 0.8rem 1.4rem; max-width: 30rem; margin-top: 1rem; }
.titolo-cert { font-family: var(--serif); font-weight: 600; margin: 0 0 0.4rem; color: var(--rubrica); }
dl { display: grid; grid-template-columns: 9rem 1fr; gap: 0.2rem 1rem; margin: 0; }
dt { color: var(--grigio); }
dd { margin: 0; }
</style>

---

# Infrastruttura a chiave pubblica (PKI) e X.509

- **X.509**: il formato più comune per i certificati digitali
- **PKI X.509** (RFC 5280): l'insieme di processi e mezzi con cui terze parti fidate verificano e garantiscono l'identità di un utente e le associano una chiave pubblica
- I certificati X.509 sono usati in molti protocolli Internet, tra cui **TLS**, alla base di **HTTPS**: il lucchetto nella barra del browser. Oggi si usa TLS 1.3 (RFC 9846, 2026); il vecchio SSL è obsoleto

<v-click>

<p class="lead mt-6">Ogni volta che aprite il sito della vostra banca, il browser verifica un certificato X.509 senza che ve ne accorgiate.</p>

</v-click>

---

# Il certificato firmato dall'autorità di certificazione

<div class="grid grid-cols-[1fr_auto_1fr] gap-6 items-center mt-4">
<div class="certificato2">
  <p class="titolo-cert">Certificato di Alice</p>
  <p>Nome: Alice Rossi<br>Email: alice@studio-legale-esempio.it<br>Chiave pubblica: <code>04a9f2…7c1e</code><br>Valido dal 01/03/2026 al 01/03/2029</p>
  <p class="firma-ca">Firma della CA: <code>3045…b2</code></p>
</div>
<div class="rosso text-3xl">←</div>
<div>

**Autorità di certificazione (CA)**

Verifica l'identità di Alice (di persona, con lo SPID, con la CIE…), poi firma il certificato con la **propria** chiave privata.

Chi si fida della CA può fidarsi del certificato.

</div>
</div>

<style>
.certificato2 { border: 1.5px solid var(--inchiostro); border-radius: 6px; padding: 0.6rem 1rem; font-size: 0.95rem; }
.titolo-cert { font-family: var(--serif); font-weight: 600; margin: 0 0 0.3rem; color: var(--rubrica); }
.firma-ca { border-top: 1px solid var(--linea); padding-top: 0.4rem; color: var(--rubrica); }
</style>

---

# Dentro un certificato X.509

| Campo | Cosa contiene | Esempio |
|---|---|---|
| **Soggetto** (*Subject*) | a chi appartiene la chiave | CN=Alice Rossi, O=Studio Legale Esempio |
| **Emittente** (*Issuer*) | la CA che lo ha firmato | CN=Esempio Qualified CA |
| **Validità** | dal… al… | 01/03/2026 – 01/03/2029 |
| **Chiave pubblica** | algoritmo e valore | EC P-256, `04a9f2…7c1e` |
| **Usi consentiti** | firma, cifratura, autenticazione | non ripudio |
| **Firma** | la firma della CA su tutti i campi | ECDSA con SHA-256 |

<p class="mt-4 grigio">Nel browser: clic sul lucchetto accanto all'indirizzo, poi "Il certificato è valido" per vedere questi campi su un sito vero.</p>

---

# La catena di fiducia X.509

<p class="lead">Le CA sono organizzate ad albero: la fiducia parte da poche autorità radice, già presenti nel browser o nel sistema operativo.</p>

<CertChain />

---

# Un'alternativa: la rete di fiducia (PGP)

<div class="grid grid-cols-[1fr_20rem] gap-8">
<div>

<p class="lead">Nessuna autorità centrale: sono gli utenti a firmare i certificati gli uni degli altri.</p>

- Alice si fida di Bob perché lo conosce di persona e ha firmato il suo certificato
- Se Bob ha firmato quello di Charlie, Alice può decidere di fidarsi di Charlie "per transitività"
- Usata soprattutto per la posta elettronica cifrata (standard OpenPGP, RFC 9580; programmi come GnuPG)

</div>
<img src="/img/rete-fiducia.svg" alt="Rete di fiducia: Alice, Bob, Charlie, Dana, Elena e Franco si firmano a vicenda i certificati" class="rete" />
</div>

<style>
.rete { width: 100%; }
</style>

---

# Provate voi: firmare e verificare

<p class="lead">Lo strumento ufficiale della Commissione europea per firmare e verificare documenti secondo eIDAS (Digital Signature Service, DSS).</p>

<div class="demo mt-4">

**DSS demo**: [ec.europa.eu/digital-building-blocks/DSS/webapp-demo](https://ec.europa.eu/digital-building-blocks/DSS/webapp-demo/sign-a-document)

- "Validate a signature": carica un file firmato (anche un .p7m o un PDF firmato) e leggi il rapporto di validazione. Funziona subito
- "Sign a document": firma un file in XAdES, CAdES, PAdES o JAdES; serve l'applicazione locale NexU con un lettore di smart card

</div>

<p class="mt-4 grigio">I file caricati vengono trasmessi ai server della Commissione: per le prove usate documenti di esempio, mai atti riservati.</p>

---
layout: glossa
---

# eIDAS: il regolamento europeo

<p class="lead"><em>electronic IDentification, Authentication and trust Services</em>: Regolamento (UE) n. 910/2014.</p>

- Base normativa comune per interazioni elettroniche sicure fra cittadini, imprese e pubbliche amministrazioni
- Interoperabilità in tutta l'Unione delle firme elettroniche, dei sigilli, delle validazioni temporali

> "Le firme elettroniche qualificate basate su un certificato qualificato rilasciato in uno Stato membro […] sono riconosciute […] quali firme elettroniche qualificate […] in tutti gli altri Stati membri."

<p class="fonte">art. 24 bis, par. 1 (prima era l'art. 25, par. 3, soppresso da eIDAS 2)</p>

::glossa::

Il regolamento è stato profondamente modificato dal **Reg. (UE) 2024/1183** ("eIDAS 2"), in vigore dal 20 maggio 2024, che introduce il **portafoglio europeo di identità digitale** (EUDI Wallet).

---
layout: glossa
---

# eIDAS 2 e il portafoglio digitale

<p class="lead">Ogni Stato membro deve offrire ai cittadini un portafoglio digitale (EUDI Wallet) per identificarsi, conservare documenti e firmare.</p>

- Termine: **24 dicembre 2026**, 24 mesi dopo l'entrata in vigore degli atti di esecuzione (art. 5 bis, par. 1)
- Il portafoglio deve permettere a tutte le persone fisiche di **firmare con firma qualificata, gratuitamente** (gli Stati possono limitare la gratuità agli usi non professionali)
- In Italia: **Sistema IT-Wallet** (art. 64-quater CAD), con un portafoglio pubblico nell'app IO e portafogli privati accreditati da AgID

::glossa::

Oggi "Firma con IO" offre già una firma qualificata gratuita, ma solo per i documenti che un ente chiede di firmare: non è ancora la firma gratuita generalizzata voluta dal regolamento.

- art. 5 bis, par. 5, lett. g), eIDAS

---

# eIDAS riconosce tre tipi di firma elettronica

<div class="livelli">
  <div class="livello"><p class="n">1</p><p><strong>Firma elettronica</strong><br><span class="grigio">semplice</span></p></div>
  <div class="livello"><p class="n">2</p><p><strong>Firma elettronica avanzata</strong><br><span class="grigio">FEA, AdES</span></p></div>
  <div class="livello"><p class="n">3</p><p><strong>Firma elettronica qualificata</strong><br><span class="grigio">FEQ, QES; in Italia la firma digitale ne è un tipo</span></p></div>
</div>

<p class="lead mt-6">Ogni livello aggiunge requisiti, e con essi valore probatorio.</p>

<style>
.livelli { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem; align-items: end; }
.livello { border: 1.5px solid var(--rubrica); border-radius: 6px; padding: 0.8rem 1rem; }
.livello:nth-child(1) { min-height: 7rem; }
.livello:nth-child(2) { min-height: 9rem; }
.livello:nth-child(3) { min-height: 11rem; background: #fbeeee; }
.livello .n { font-family: var(--serif); font-size: 2rem; color: var(--rubrica); margin: 0; }
</style>

---
layout: glossa
---

# 1. Firma elettronica (semplice)

<p class="lead">Il livello base: dati in forma elettronica, allegati o connessi ad altri dati, usati dal firmatario per firmare.</p>

Il regolamento stabilisce un principio di non discriminazione:

> "A una firma elettronica non possono essere negati gli effetti giuridici e l'ammissibilità come prova in procedimenti giudiziari per il solo motivo della sua forma elettronica o perché non soddisfa i requisiti per firme elettroniche qualificate."

<p class="fonte">art. 25, par. 1, eIDAS</p>

**Esempi**: il nome scritto in fondo a una email; il clic su "Accetto"; un codice PIN.

::glossa::

In Italia il suo valore come forma scritta e come prova è **liberamente valutabile** dal giudice, secondo sicurezza, integrità e immodificabilità.

- art. 20, c. 1-bis, CAD

---
layout: glossa
---

# 2. Firma elettronica avanzata (FEA)

<p class="lead">Deve soddisfare quattro requisiti (art. 26 eIDAS):</p>

1. è connessa **unicamente** al firmatario
2. è idonea a **identificare** il firmatario
3. è creata con dati che il firmatario può utilizzare, con un elevato livello di sicurezza, sotto il proprio **esclusivo controllo**
4. è collegata ai dati sottoscritti in modo da consentire l'**identificazione di ogni successiva modifica**

**Esempi**: firme in formato XAdES, CAdES, PAdES senza certificato qualificato o senza dispositivo qualificato; in Italia la **firma grafometrica** su tablet, se il sistema rispetta le regole tecniche.

::glossa::

Il requisito 4 non chiede un documento "a prova di manomissione" (così la slide del 2024) ma una modifica **rilevabile**: è esattamente ciò che fa l'impronta.

La FEA "italiana" del d.P.C.M. 22 febbraio 2013 vale solo nei rapporti tra firmatario e chi la offre, per esempio la banca.

- artt. 56 e 60 d.P.C.M. 22/2/2013

---

# I requisiti della FEA, uno per uno

<div class="req">
  <div class="voce"><span class="n">1</span>connessa <strong>unicamente</strong> al firmatario</div>
  <div class="voce"><span class="n">2</span>idonea a <strong>identificarlo</strong></div>
  <div class="voce"><span class="n">3</span>creata con dati sotto il suo <strong>esclusivo controllo</strong></div>
  <div class="voce"><span class="n">4</span>ogni successiva modifica è <strong>rilevabile</strong></div>
</div>

<div class="mappa mt-6">

| Requisito | Come lo realizza la crittografia |
|---|---|
| 1 e 2 | il certificato lega la chiave pubblica all'identità del firmatario |
| 3 | la chiave privata resta nel dispositivo del firmatario (o in un sistema protetto) |
| 4 | si firma l'impronta del documento: cambiare un bit invalida la firma |

</div>

<style>
.req { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.8rem; margin-top: 0.5rem; }
.req .voce { border: 1.5px solid var(--rubrica); border-radius: 6px; padding: 0.6rem 0.8rem; font-size: 0.98rem; }
.req .n { display: block; font-family: var(--serif); font-size: 1.6rem; color: var(--rubrica); }
</style>

---

# FEA: i formati

<p class="lead">Quando un servizio pubblico online richiede una firma avanzata, deve accettarla almeno in questi formati.</p>

- Per anni: Decisione di esecuzione (UE) **2015/1506** (formati XML, CMS, PDF)
- Ora: **Regolamento di esecuzione (UE) 2026/248**, che l'ha abrogata; il nuovo elenco si applica dal 23 febbraio 2027 e aggiunge **JAdES** (JSON) e i contenitori **ASiC**
- I formati sono specifiche tecniche **ETSI**:

<div class="formati">
  <div><strong>XAdES</strong><br><span class="grigio">XML</span></div>
  <div><strong>CAdES</strong><br><span class="grigio">CMS, il file .p7m</span></div>
  <div><strong>PAdES</strong><br><span class="grigio">PDF</span></div>
</div>

<p class="fonte mt-4">Correzione rispetto al 2024: questi atti non dicono quali formati una FEA "deve avere" (una FEA è tale per i requisiti dell'art. 26), ma quali formati la PA deve accettare.</p>

<style>
.formati { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; text-align: center; }
.formati div { border: 1.5px solid var(--inchiostro); border-radius: 6px; padding: 0.6rem; font-size: 1.15rem; }
</style>

---

# ETSI

<p class="lead">European Telecommunications Standards Institute: organizzazione europea di normazione riconosciuta dall'UE. Il suo comitato tecnico ESI scrive le norme per firme e servizi fiduciari a sostegno di eIDAS.</p>

- Il regolamento dice **cosa** deve garantire una firma
- Le norme ETSI dicono **come**: formati dei file, profili dei certificati, requisiti per i prestatori di servizi fiduciari

<p class="mt-6 grigio">È la stessa divisione del lavoro che c'è tra il codice civile e le regole tecniche: la norma fissa l'effetto, lo standard tecnico il modo.</p>

---

# XAdES: XML Advanced Electronic Signature

- Firma codificata in **XML**, un formato testuale leggibile sia dalle persone sia dai programmi
- Si può usare per qualsiasi tipo di dato: immagini, audio, PDF, file binari
- Tre modi di collegare firma e dati:
  - **interna** (*enveloped*): la firma è dentro il documento XML firmato
  - **avvolgente** (*enveloping*): i dati sono dentro la struttura XML della firma
  - **distaccata** (*detached*): firma e dati restano in file distinti
- **Vantaggio**: facilita l'elaborazione automatica e supporta la firma multipla, anche in parallelo o in sequenza

<p class="fonte">Correzione rispetto al 2024: le modalità sono tre, non due.</p>

---
layout: glossa
---

# CAdES: CMS Advanced Electronic Signature

- **CMS** (*Cryptographic Message Syntax*): standard IETF per messaggi protetti da crittografia
- Si applica a **qualsiasi file**: il risultato è una "busta" che contiene documento e firma
- In Italia è il famoso file **.p7m** (dati dentro la busta) o **.p7s** (firma separata): per leggerlo serve un software che apre la busta e verifica la firma
- Supporta più firmatari: **firme parallele** e **controfirme**; per firmare più documenti insieme si usa un contenitore **ASiC-E**

<p class="fonte">Correzione rispetto al 2024: CAdES non è limitato ai "dati binari" e consente la firma di più soggetti.</p>

::glossa::

Nel processo civile telematico gli atti firmati digitalmente possono essere in CAdES o in PAdES: le Sezioni Unite li hanno ritenuti equivalenti.

- Cass., S.U., 27 aprile 2018, n. 10266

Nel processo amministrativo telematico è ammesso solo PAdES.

---

# PAdES: PDF Advanced Electronic Signature

- Riservato ai file **PDF**: la firma è incorporata nel PDF stesso
- Il documento resta un normale PDF: si legge con qualsiasi lettore, e i lettori PDF (es. Adobe Acrobat Reader) mostrano e verificano la firma
- Supporta più firme **in sequenza**: ogni nuova firma copre il documento e le firme precedenti; non le firme in parallelo
- Ideale per documenti destinati a essere letti da persone; per dati da elaborare automaticamente si preferisce XAdES

<p class="fonte">Correzione rispetto al 2024: la verifica di una firma PAdES è automatica come per gli altri formati.</p>

---
layout: glossa
---

# 3. Firma elettronica qualificata (FEQ)

<p class="lead">Una firma avanzata con due requisiti in più. Ha gli stessi effetti giuridici della firma autografa (art. 25, par. 2, eIDAS).</p>

Il firmatario deve:

1. usare un **certificato qualificato**, rilasciato da un **prestatore di servizi fiduciari qualificato** (QTSP) dell'UE
2. usare un **dispositivo per la creazione di una firma qualificata** (QSCD)

**Esempi**: XAdES, PAdES, CAdES con certificato qualificato e dispositivo sicuro: smart card, token USB, oppure **firma remota**: il dispositivo qualificato è un sistema protetto (HSM) presso il prestatore, e la password monouso sullo smartphone serve solo ad autorizzare la firma (art. 29 bis eIDAS).

::glossa::

In Italia la **firma digitale** è un tipo particolare di firma qualificata, basata su chiavi pubblica e privata (art. 1, lett. s, CAD).

I prestatori qualificati sono nell'elenco di fiducia europeo (EU Trusted List).

---

# La firma qualificata, in figura

<div class="qes">
  <div class="attore">
    <p class="nome">Alice</p>
    <p>documento → impronta SHA-256</p>
    <p class="chiave">firma con la chiave privata<br>custodita nel <strong>QSCD</strong></p>
  </div>
  <div class="freccia">→</div>
  <div class="attore">
    <p class="nome">Documento firmato</p>
    <p>documento + firma<br>+ certificato qualificato di Alice</p>
  </div>
  <div class="freccia">→</div>
  <div class="attore">
    <p class="nome">Chiunque verifichi</p>
    <p>verifica la firma con la chiave pubblica nel certificato</p>
  </div>
</div>

<div class="qtsp">
  <p><strong>Prestatore di servizi fiduciari qualificato (QTSP)</strong>: ha identificato Alice e firmato il suo certificato qualificato; è vigilato (in Italia dall'AgID) e iscritto nell'elenco di fiducia.</p>
</div>

<style>
.qes { display: flex; align-items: stretch; gap: 0.8rem; margin-top: 1rem; }
.qes .attore { flex: 1; border: 1.5px solid var(--inchiostro); border-radius: 6px; padding: 0.6rem 0.9rem; font-size: 0.95rem; }
.qes .attore p { margin: 0.2rem 0; }
.qes .nome { font-family: var(--serif); font-weight: 600; color: var(--rubrica); }
.qes .chiave { border-top: 1px solid var(--linea); padding-top: 0.3rem; }
.qes .freccia { align-self: center; color: var(--rubrica); font-size: 1.5rem; }
.qtsp { margin-top: 1.2rem; border-left: 3px solid var(--rubrica); padding-left: 0.9rem; font-size: 1rem; }
</style>

---
layout: glossa
---

# Le firme nel diritto italiano

| Firma | Forma scritta ed efficacia probatoria |
|---|---|
| **Semplice** | liberamente valutabili dal giudice (sicurezza, integrità, immodificabilità) |
| **Avanzata** | forma scritta ed efficacia dell'**art. 2702 c.c.** (scrittura privata) |
| **Qualificata / digitale** | come sopra; l'uso del dispositivo **si presume** riconducibile al titolare, salvo prova contraria; con certificato scaduto, revocato o sospeso equivale a **mancata sottoscrizione** |

Per alcuni atti la legge pretende di più: le scritture dell'art. 1350, nn. 1–12, c.c. (es. trasferimento di immobili), se informatiche, richiedono a pena di nullità la **firma qualificata o digitale**.

::glossa::

- art. 20, c. 1-bis e 1-ter, CAD
- art. 21, c. 2-bis, CAD
- art. 24, c. 4-bis, CAD
- artt. 1350, 2702 c.c.

---

# Che firma è?

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

---
layout: glossa
---

# Password monouso e verifica in due passaggi

<p class="lead">Un'autenticazione forte combina almeno due fattori di categorie diverse.</p>

- **Qualcosa che conosci**: una password, un PIN
- **Qualcosa che hai**: lo smartphone, un token della banca
- **Qualcosa che sei**: l'impronta digitale, il volto

La combinazione più comune è la **verifica in due passaggi**: una password personale più un codice monouso generato o ricevuto sullo smartphone.

::glossa::

È l'"autenticazione forte del cliente": due o più elementi di conoscenza, possesso e inerenza, **indipendenti** tra loro. Obbligatoria per accedere al conto online e per i pagamenti elettronici.

- artt. 4, n. 30, e 97, dir. (UE) 2015/2366 (PSD2)

Anche lo SPID di livello 2 chiede password più un secondo fattore.

---

# Verifica in due passaggi: il codice che cambia

<p class="lead">Telefono e server condividono un segreto; da quel segreto e dall'ora corrente calcolano lo stesso codice di 6 cifre, che cambia ogni 30 secondi.</p>

<Totp />

<p class="fonte">Standard TOTP (RFC 6238), basato su HOTP (RFC 4226): non è una sfida-risposta, la "sfida" è l'ora corrente.</p>

<!--
È lo standard usato dalle app di autenticazione (Google Authenticator, Microsoft Authenticator) e da molti token bancari.
Il codice di un minuto fa non vale più: chi lo ruba arriva tardi.
La variante standard a sfida e risposta si chiama OCRA (RFC 6287).
-->

---

# Password monouso: sfida e risposta (*challenge-response*)

<div class="passi">

1. Alice dichiara di voler accedere al Servizio
2. Il Servizio sceglie una **sfida** e la invia ad Alice
3. Alice calcola una **risposta** alla sfida e la rimanda indietro
4. Il Servizio confronta la risposta ricevuta con quella attesa: se corrispondono, accesso consentito

</div>

<p class="lead mt-6">"Monouso" perché la risposta vale solo per quella sfida, e la sfida cambia ogni volta: registrare una risposta non serve a nulla.</p>

<style>
.passi ol { font-size: 1.15rem; }
</style>

---

# Sfida e risposta con crittografia simmetrica

<p class="lead">Alice e il Servizio condividono una chiave segreta K. Alice risponde cifrando la sfida con K; il Servizio decifra e confronta.</p>

<ChallengeResponse modo="simmetrica" />

---

# Sfida e risposta con crittografia asimmetrica

<p class="lead">Alice ha registrato la sua chiave pubblica presso il Servizio; risponde firmando la sfida con la chiave privata, che non lascia mai il suo dispositivo.</p>

<ChallengeResponse modo="asimmetrica" />

<p class="fonte">È il meccanismo delle passkey: standard W3C Web Authentication Level 3, Raccomandazione del 25 agosto 2026.</p>

<!--
È il meccanismo delle passkey (FIDO2/WebAuthn) che stanno sostituendo le password: il server conserva solo chiavi pubbliche, che non servono a nulla a chi le ruba, e la firma è legata al sito vero, quindi il phishing non funziona.
-->

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<Quiz
  domanda="Un contratto di compravendita di un immobile, stipulato come documento informatico, quale firma richiede a pena di nullità?"
  :opzioni="['Basta una firma semplice', 'Una firma avanzata', 'Una firma qualificata o digitale']"
  :corretta="2"
  spiegazione="Per le scritture dell’art. 1350, nn. 1–12, c.c. l’art. 21, c. 2-bis, CAD richiede la firma qualificata o digitale (salvo sottoscrizione autenticata)."
/>
<Quiz
  domanda="Perché un codice OTP rubato ieri non permette di entrare oggi?"
  :opzioni="['Perché è cifrato', 'Perché dipende dall’ora o da una sfida che nel frattempo è cambiata', 'Perché la banca lo cancella']"
  :corretta="1"
  spiegazione="Il codice è calcolato dall’ora corrente (TOTP) o da una sfida nuova: vale una sola volta e per poco tempo."
/>
</div>
