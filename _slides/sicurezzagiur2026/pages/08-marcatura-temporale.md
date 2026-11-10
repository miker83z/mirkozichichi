---
layout: capo
capo: VIII
sezione: Marcatura temporale
---

# Marcatura temporale fidata

Dimostrare che un documento esisteva a una certa data

---

# Marca temporale (*timestamp*)

<p class="lead" v-click>Data e ora scritte in caratteri: un <strong>riferimento temporale</strong>, che diventa <strong>validazione temporale</strong> quando un terzo lo lega a certi dati.</p>

<SchemaTempoUnix />

<!--
Formato standard ISO 8601 (su Internet il profilo RFC 3339); nei computer spesso Unix time, i secondi trascorsi dal 1° gennaio 1970, ore 00:00 UTC (senza secondi intercalari).
"Z" significa UTC; in Italia d'inverno siamo a +01:00, d'estate a +02:00.
Esempio della slide del 2024: 1602086059 = 2020-10-07T15:54:19Z (verificato).
-->

---

# Proviamo: che ore sono per un computer?

<div v-click>

<UnixClock />

</div>

---

# Marcatura temporale con infrastruttura a chiave pubblica

<p class="lead" v-click>Un'autorità di marcatura temporale (TSA) attesta con la sua firma che un'impronta esisteva in un certo istante.</p>

<v-clicks>

- Prova che i dati **esistevano** e **non sono cambiati** dopo; non prova chi ne è l'autore
- Protocollo standard: **RFC 3161**, su una PKI X.509
- La TSA riceve **solo l'impronta**: non vede mai il documento

</v-clicks>

<!--
Correzione rispetto al 2024: la TSA non appone la firma "sul documento" ma sull'impronta più la data e l'ora (RFC 3161, § 2.1). Nel diritto UE la TSA è un prestatore di servizi fiduciari qualificato (non più "certificatore accreditato", termine precedente a eIDAS). Le marche temporali sono conservate per almeno 20 anni (art. 53 d.P.C.M. 22/2/2013).
Per il giurista: una validazione temporale elettronica qualificata gode della presunzione di accuratezza della data e dell'ora e di integrità dei dati cui si riferisce (art. 41, par. 2, eIDAS). Per il documento informatico, "la data e l'ora di formazione […] sono opponibili ai terzi se apposte in conformità alle Linee guida" (art. 20, c. 1-bis, CAD; art. 2704 c.c., data certa).
-->

---

# La marcatura temporale, passo per passo

<SchemaMarcaturaTSA />

---

# Proviamo: chiedere una marca temporale

<div v-click>

<TsaFlow />

</div>

---

# Il pacchetto finale

<SchemaPacchetto />

---

# Lo standard ANSI ASC X9.95 e gli altri schemi

<p class="lead" v-click>Oltre all'RFC 3161 esistono altri standard (ANSI X9.95 per la finanza, ISO/IEC 18014) e altre famiglie di schemi.</p>

<SchemaX995 />

<!--
Correzione rispetto al 2024: l'elenco non è "il contenuto di X9.95" (norma a pagamento, non verificabile) ma una classificazione generale degli schemi. Schemi collegati: Haber e Stornetta, 1991.
-->

---

# Marcatura temporale distribuita

<SchemaMarcaturaBlockchain />

<p class="grigio" v-click>Strumento gratuito: <strong>OpenTimestamps</strong> calcola l'impronta nel browser e la ancora nella blockchain di Bitcoin.</p>

<!--
Invece di un'unica TSA ci si affida a molti nodi che si accordano tra loro (consenso). L'immutabilità è probabilistica: cresce con le conferme.
Per il giurista: la memorizzazione su registri distribuiti "produce gli effetti giuridici della validazione temporale elettronica di cui all'articolo 41" eIDAS: quella semplice, non la qualificata (art. 8-ter, c. 3, d.l. 135/2018; gli standard AgID del c. 4 non risultano pubblicati). eIDAS 2 introduce i registri elettronici qualificati: presunzione di ordine cronologico e di integrità delle registrazioni (artt. 45 duodecies e 45 terdecies eIDAS; Reg. es. (UE) 2025/2531).
-->

---

# Marcatura temporale distribuita: i problemi

<v-clicks>

- Riscrivere la storia richiede la maggioranza della potenza di calcolo della rete (*proof of work*)
- Ma l'orario del blocco lo sceglie chi lo crea: è **approssimativo**

</v-clicks>

<SchemaOrarioBlocco />

<!--
Regola di Bitcoin: l'orario deve essere successivo alla mediana degli ultimi 11 blocchi e non oltre 2 ore avanti rispetto all'orologio del nodo (da Bitcoin Core 27.0; prima "network-adjusted time"). Vale per Bitcoin e catene simili; in Ethereum l'ora è fissata dallo slot (12 secondi).
-->

---

# Proviamo: quale orario accetta la rete?

<div v-click>

<BlockTimestamp />

</div>

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<div v-click>
<Quiz
  domanda="Per ottenere una marca temporale su un parere riservato, cosa invia lo studio alla TSA?"
  :opzioni="['Il parere in PDF', 'Solo l’impronta del parere', 'Il parere cifrato con la chiave pubblica della TSA']"
  :corretta="1"
  spiegazione="La TSA riceve e firma solo l’impronta con la data e l’ora: il contenuto del parere resta nello studio."
/>
</div>
<div v-click>
<Quiz
  domanda="L’orario scritto in un blocco Bitcoin è preciso al secondo?"
  :opzioni="['Sì, è garantito dal consenso', 'No: può scostarsi anche di un paio d’ore', 'Dipende dal fuso orario del notaio']"
  :corretta="1"
  spiegazione="Il protocollo accetta un blocco se il suo orario è successivo alla mediana degli 11 blocchi precedenti e non oltre 2 ore nel futuro."
/>
</div>
</div>
