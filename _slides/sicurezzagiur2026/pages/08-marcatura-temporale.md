---
layout: capo
capo: VIII
sezione: Marcatura temporale
---

# Marcatura temporale fidata

Dimostrare che un documento esisteva a una certa data

---

# Marca temporale (*timestamp*)

<p class="lead">Data e ora in forma di caratteri: per il giurista un <strong>riferimento temporale</strong>, che diventa <strong>validazione temporale</strong> quando un terzo lo lega in modo verificabile a certi dati.</p>

<UnixClock class="mt-2" />

<!--
Formato standard ISO 8601 (su Internet il profilo RFC 3339); nei computer spesso Unix time, i secondi trascorsi dal 1° gennaio 1970, ore 00:00 UTC.
"Z" significa UTC; in Italia d'inverno siamo a +01:00, d'estate a +02:00.
Esempio della slide del 2024: 1602086059 = 2020-10-07T15:54:19Z (verificato).
-->

---
layout: glossa
---

# Marcatura temporale con infrastruttura a chiave pubblica

<p class="lead">Un'autorità di marcatura temporale (TSA, <em>Time Stamping Authority</em>) attesta, con la propria firma, che un'impronta esisteva in un certo istante.</p>

- Prova che quei dati **esistevano** in quel momento e che **non sono cambiati** dopo; non prova chi ne è l'autore
- Lo standard **RFC 3161** definisce il protocollo, basato su una PKI X.509
- La TSA riceve **solo l'impronta** del documento, vi associa data, ora e numero di serie e firma il tutto: **non vede mai il documento**
- Nel diritto UE la TSA è un **prestatore di servizi fiduciari qualificato** (non più "certificatore accreditato", termine precedente a eIDAS)

<!--
Correzione rispetto al 2024: la TSA non appone la firma "sul documento" ma sull'impronta più la data e l'ora (RFC 3161, § 2.1).
Le marche temporali sono conservate dal prestatore per almeno 20 anni (art. 53 d.P.C.M. 22/2/2013).
-->

::glossa::

Una validazione temporale elettronica **qualificata** gode della presunzione di accuratezza della data e dell'ora e di integrità dei dati cui si riferisce.

- art. 41, par. 2, Reg. (UE) 910/2014 (eIDAS)

Per il documento informatico: "la data e l'ora di formazione […] sono opponibili ai terzi se apposte in conformità alle Linee guida".

- art. 20, c. 1-bis, CAD; art. 2704 c.c. (data certa)

---

# La marcatura temporale, passo per passo

<TsaFlow />

<!--
Sottolineare il passo 2: il documento non lascia lo studio. Alla TSA arriva solo l'impronta, che non rivela il contenuto.
-->

---

# Il pacchetto finale

<p class="lead">Chi riceve il documento può verificare, anche dopo anni, chi l'ha firmato e da quando esisteva.</p>

<div class="pacchetto">
  <div class="voce"><strong>Documento</strong><span>il file originale</span></div>
  <div class="voce"><strong>Firma di Alice</strong><span>sull'impronta del documento</span></div>
  <div class="voce"><strong>Certificato di Alice</strong><span>firmato da una CA</span></div>
  <div class="voce rosso-bordo"><strong>Marca temporale</strong><span>impronta + data e ora</span></div>
  <div class="voce rosso-bordo"><strong>Firma della TSA</strong><span>sulla marca temporale</span></div>
  <div class="voce rosso-bordo"><strong>Certificato della TSA</strong><span>firmato da un'altra CA</span></div>
</div>

<style>
.pacchetto { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.8rem; margin-top: 1.2rem; }
.voce { border: 1.5px solid var(--inchiostro); border-radius: 5px; padding: 0.6rem 0.8rem; display: flex; flex-direction: column; gap: 0.2rem; }
.voce span { font-size: 0.9rem; color: var(--grigio); }
.voce.rosso-bordo { border-color: var(--rubrica); }
</style>

---

# Lo standard ANSI ASC X9.95

<p class="lead">Oltre all'RFC 3161 esistono altri standard (ANSI X9.95 per il settore finanziario, ISO/IEC 18014) e altre famiglie di schemi.</p>

- **Basati su firma** (PKI): quello visto finora
- **Collegati** (*linked*): ogni marca è collegata alle precedenti, per esempio con un albero di Merkle (Haber e Stornetta, 1991)
- **Chiave transitoria** (*transient-key*): variante PKI con chiavi di firma di breve durata
- **MAC**: schema semplice basato su una chiave segreta condivisa
- **Database**: le impronte dei documenti sono conservate in un archivio fidato
- **Distribuiti**: le impronte sono registrate su una blockchain (prossima slide)

<p class="fonte">Correzione rispetto al 2024: l'elenco non è "il contenuto di X9.95" (norma a pagamento, non verificabile) ma una classificazione generale degli schemi.</p>

---
layout: glossa
---

# Marcatura temporale distribuita

<p class="lead">Invece di un'unica TSA, ci si affida a molti nodi che si accordano tra loro (consenso). L'impronta del documento viene inserita in una transazione registrata sulla blockchain.</p>

- Si registra **solo l'impronta**: l'inclusione in un blocco prova che il dato esisteva **non più tardi** di quel blocco
- L'immutabilità è probabilistica: cresce con il numero di blocchi successivi (le "conferme")
- Strumento gratuito: **OpenTimestamps** calcola l'impronta nel browser e la ancora nella blockchain di Bitcoin

::glossa::

La memorizzazione su registri distribuiti "produce gli effetti giuridici della validazione temporale elettronica di cui all'articolo 41" eIDAS: quella semplice, non la qualificata.

- art. 8-ter, c. 3, d.l. 135/2018 (gli standard AgID del c. 4 non risultano pubblicati)

eIDAS 2 introduce i **registri elettronici qualificati**: presunzione di ordine cronologico e di integrità delle registrazioni.

- artt. 45 duodecies e 45 terdecies eIDAS; Reg. es. (UE) 2025/2531

---

# Marcatura temporale distribuita: i problemi

<div class="grid grid-cols-[19rem_1fr] gap-6">
<div class="piccolo">

- La sicurezza dipende dal **consenso**: in Bitcoin è il **proof of work**, un enorme lavoro di calcolo per ogni nuovo blocco (il puzzle del Capo V)
- Riscrivere blocchi già confermati richiede la maggioranza della potenza di calcolo della rete
- Ma l'orario scritto nel blocco lo sceglie chi lo crea, entro certi limiti: è **approssimativo**, fino a 2 ore nel futuro, e può essere anteriore a blocchi già accettati
- Vale per Bitcoin e catene simili; in Ethereum l'ora è fissata dallo slot (12 secondi)

</div>
<BlockTimestamp />
</div>

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<Quiz
  domanda="Per ottenere una marca temporale su un parere riservato, cosa invia lo studio alla TSA?"
  :opzioni="['Il parere in PDF', 'Solo l’impronta del parere', 'Il parere cifrato con la chiave pubblica della TSA']"
  :corretta="1"
  spiegazione="La TSA riceve e firma solo l’impronta con la data e l’ora: il contenuto del parere resta nello studio."
/>
<Quiz
  domanda="L’orario scritto in un blocco Bitcoin è preciso al secondo?"
  :opzioni="['Sì, è garantito dal consenso', 'No: può scostarsi anche di un paio d’ore', 'Dipende dal fuso orario del notaio']"
  :corretta="1"
  spiegazione="Le regole del protocollo accettano un blocco se il suo orario è successivo alla mediana degli 11 blocchi precedenti e non oltre 2 ore nel futuro."
/>
</div>
